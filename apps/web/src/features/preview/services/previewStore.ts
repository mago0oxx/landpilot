import { createHash } from "crypto";
import { Prisma } from "@prisma/client";
import {
  hasPartialFailures,
  isEmptyLookup,
  LOOKUP_VERSION,
  lookupProperty,
  PropertyLookupResult,
} from "@/lib/propertyLookup";
import { prisma } from "@/lib/prisma";

/** Free checks allowed per IP per hour. Generous for a real buyer comparing lots, tight
 * enough that nobody scrapes six government APIs through us for free. */
const RATE_LIMIT_PER_HOUR = 12;

/** How long a cached lookup for the same address stays fresh. Flood maps and ACS figures
 * move on a scale of years, so this is about API politeness, not data staleness. */
const CACHE_TTL_DAYS = 30;

/** A lookup where some source came back empty is probably a transient upstream failure, so it
 * gets a short window rather than the full one — the next visitor retries instead of inheriting
 * a month-old "couldn't check". */
const PARTIAL_CACHE_TTL_HOURS = 6;

export class PreviewRateLimitError extends Error {
  constructor() {
    super("You've run a lot of checks in the last hour. Try again shortly.");
    this.name = "PreviewRateLimitError";
  }
}

export class AddressNotFoundError extends Error {
  constructor() {
    super("We couldn't find that address in the Census address database. Try including the city and state.");
    this.name = "AddressNotFoundError";
  }
}

/** Collapses formatting differences so "123 Main St,  Tampa FL" and "123 main st, tampa fl"
 * share a cache entry. */
export function normalizeAddress(address: string): string {
  return address.trim().toLowerCase().replace(/[.,]/g, " ").replace(/\s+/g, " ");
}

/** Stores a salted hash rather than the IP itself — enough to rate-limit, not enough to
 * identify anyone or to be worth stealing. */
export function hashIp(ip: string | null): string | null {
  if (!ip) return null;
  const salt = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? "landpilot";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

async function assertUnderRateLimit(ipHash: string | null): Promise<void> {
  if (!ipHash) return;

  const since = new Date(Date.now() - 60 * 60 * 1000);
  const recent = await prisma.landPreview.count({ where: { ipHash, createdAt: { gte: since } } });

  if (recent >= RATE_LIMIT_PER_HOUR) throw new PreviewRateLimitError();
}

/** The stored blob is a PropertyLookupResult plus the version it was captured under. */
type CachedLookup = PropertyLookupResult & { __lookupVersion?: number };

/**
 * Reuses a recent lookup for the same address instead of re-querying six external APIs.
 * Two things disqualify a hit: a version older than the current set of data sources, and a
 * partial result that has aged past the short window. Both exist because a cache keyed only on
 * the address will happily serve a result captured before a source existed, or one captured
 * during an upstream outage — and the visitor has no way to tell.
 */
async function findCachedLookup(addressKey: string): Promise<PropertyLookupResult | null> {
  const since = new Date(Date.now() - CACHE_TTL_DAYS * 24 * 60 * 60 * 1000);
  const cached = await prisma.landPreview.findFirst({
    where: { addressKey, createdAt: { gte: since } },
    orderBy: { createdAt: "desc" },
    select: { lookup: true, createdAt: true },
  });
  if (!cached) return null;

  const lookup = cached.lookup as unknown as CachedLookup;
  if (lookup.__lookupVersion !== LOOKUP_VERSION) return null;

  if (hasPartialFailures(lookup)) {
    const partialCutoff = Date.now() - PARTIAL_CACHE_TTL_HOURS * 60 * 60 * 1000;
    if (cached.createdAt.getTime() < partialCutoff) return null;
  }

  return lookup;
}

export async function createPreview(address: string, ip: string | null) {
  const ipHash = hashIp(ip);
  await assertUnderRateLimit(ipHash);

  const addressKey = normalizeAddress(address);
  const lookup = (await findCachedLookup(addressKey)) ?? (await lookupProperty(address));

  // A lookup with nothing in it means the address never geocoded. Persisting that would
  // poison the cache and hand the visitor an empty result page, so fail loudly instead.
  if (isEmptyLookup(lookup)) throw new AddressNotFoundError();

  return prisma.landPreview.create({
    data: {
      address: address.trim(),
      addressKey,
      county: lookup.county,
      state: lookup.state,
      // Version travels with the blob so a future data source invalidates old entries without
      // needing a schema migration.
      lookup: JSON.parse(
        JSON.stringify({ ...lookup, __lookupVersion: LOOKUP_VERSION })
      ) as Prisma.InputJsonValue,
      ipHash,
    },
    select: { id: true },
  });
}

export async function getPreview(id: string) {
  const preview = await prisma.landPreview.findUnique({ where: { id } });
  if (!preview) return null;

  return { ...preview, lookup: preview.lookup as unknown as PropertyLookupResult };
}

/**
 * Links a preview to the account created from it. Best-effort: a failure here must never
 * block a signup, and an already-claimed preview is left alone so the first claim wins.
 */
export async function claimPreview(id: string, userId: string): Promise<void> {
  try {
    await prisma.landPreview.updateMany({
      where: { id, claimedByUserId: null },
      data: { claimedByUserId: userId, claimedAt: new Date() },
    });
  } catch {
    // Intentionally swallowed — see above.
  }
}

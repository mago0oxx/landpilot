import { createHash } from "crypto";
import { Prisma } from "@prisma/client";
import { isEmptyLookup, lookupProperty, PropertyLookupResult } from "@/lib/propertyLookup";
import { prisma } from "@/lib/prisma";

/** Free checks allowed per IP per hour. Generous for a real buyer comparing lots, tight
 * enough that nobody scrapes six government APIs through us for free. */
const RATE_LIMIT_PER_HOUR = 12;

/** How long a cached lookup for the same address stays fresh. Flood maps and ACS figures
 * move on a scale of years, so this is about API politeness, not data staleness. */
const CACHE_TTL_DAYS = 30;

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

/** Reuses a recent lookup for the same address instead of re-querying six external APIs. */
async function findCachedLookup(addressKey: string): Promise<PropertyLookupResult | null> {
  const since = new Date(Date.now() - CACHE_TTL_DAYS * 24 * 60 * 60 * 1000);
  const cached = await prisma.landPreview.findFirst({
    where: { addressKey, createdAt: { gte: since } },
    orderBy: { createdAt: "desc" },
    select: { lookup: true },
  });

  return cached ? (cached.lookup as unknown as PropertyLookupResult) : null;
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
      lookup: JSON.parse(JSON.stringify(lookup)) as Prisma.InputJsonValue,
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

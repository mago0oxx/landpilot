/**
 * Soil suitability for a septic drain field, from the USDA NRCS SSURGO database via the
 * public, keyless Soil Data Access REST endpoint.
 *
 * Why this matters more than most of what we pull: on a parcel with no sewer, a failed
 * percolation test means no septic permit, which means no building permit. It's the single
 * most common reason a cheap rural lot turns out to be unbuildable, and until now the product
 * could only tell people it was unknowable. SSURGO can't replace a perc test — it's a survey
 * mapped at map-unit scale, not a site measurement — but "the soil here is rated very limited
 * for drain fields" is a real, actionable signal a buyer can act on before spending money.
 *
 * Deliberately conservative in how it's reported (see septicRatingFor): a favourable rating is
 * never presented as a pass, because the buyer's decision would be expensive to get wrong.
 */

const SDA_ENDPOINT = "https://sdmdataaccess.sc.egov.usda.gov/Tabular/post.rest";

/** SSURGO's own interpretation classes for this rule, ordered worst to best. */
export type SepticSoilRating = "very limited" | "somewhat limited" | "not limited";

export interface SoilSepticResult {
  /** Weighted-dominant rating across the rated components of the map unit. */
  rating: SepticSoilRating;
  /** Share of the map unit (0-100) covered by components carrying that rating. */
  ratedPercent: number;
  /** Dominant soil series name, for buyers who want to look it up themselves. */
  dominantSoil: string | null;
  /** e.g. "Poorly drained" — plain-language and often the reason behind the rating. */
  drainageClass: string | null;
}

interface SdaResponse {
  Table?: (string | null)[][];
}

function normalizeRating(raw: string | null): SepticSoilRating | null {
  if (!raw) return null;
  const value = raw.trim().toLowerCase();
  if (value === "very limited") return "very limited";
  if (value === "somewhat limited") return "somewhat limited";
  if (value === "not limited") return "not limited";
  // "Not rated" (urban land, water, pits) and anything unexpected are excluded rather than
  // guessed at — a wrong rating here is worse than no rating.
  return null;
}

/**
 * A map unit is a mix of soil components with percentage shares, and some are unrated (urban
 * land, open water). Summing the rated components by share and taking the largest bucket
 * describes the parcel better than simply reading the first row, and `ratedPercent` keeps the
 * confidence visible instead of hiding it.
 */
export async function lookupSepticSoilSuitability(
  lat: number,
  lng: number
): Promise<SoilSepticResult | null> {
  const query = `SELECT co.compname, co.comppct_r, co.drainagecl, ci.interphrc
FROM component co
INNER JOIN cointerp ci ON ci.cokey = co.cokey
WHERE co.mukey IN (SELECT mukey FROM SDA_Get_Mukey_from_intersection_with_WktWgs84('point(${lng} ${lat})'))
AND ci.mrulename = 'ENG - Septic Tank Absorption Fields'
AND ci.ruledepth = 0
ORDER BY co.comppct_r DESC`;

  let rows: (string | null)[][];

  try {
    const response = await fetch(SDA_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, format: "JSON" }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return null;

    const data = (await response.json()) as SdaResponse;
    rows = data.Table ?? [];
  } catch {
    return null;
  }

  if (rows.length === 0) return null;

  const shareByRating: Record<SepticSoilRating, number> = {
    "very limited": 0,
    "somewhat limited": 0,
    "not limited": 0,
  };
  let dominant: { pct: number; name: string | null; drainage: string | null } | null = null;

  for (const [compname, comppct, drainagecl, interphrc] of rows) {
    const rating = normalizeRating(interphrc);
    if (!rating) continue;

    const pct = Number(comppct);
    if (!Number.isFinite(pct)) continue;

    shareByRating[rating] += pct;
    if (!dominant || pct > dominant.pct) {
      dominant = { pct, name: compname, drainage: drainagecl };
    }
  }

  const ranked = (Object.entries(shareByRating) as [SepticSoilRating, number][])
    .filter(([, pct]) => pct > 0)
    .sort((a, b) => b[1] - a[1]);

  if (ranked.length === 0 || !dominant) return null;

  const [rating, ratedPercent] = ranked[0]!;

  return {
    rating,
    ratedPercent: Math.round(ratedPercent),
    dominantSoil: dominant.name,
    drainageClass: dominant.drainage,
  };
}

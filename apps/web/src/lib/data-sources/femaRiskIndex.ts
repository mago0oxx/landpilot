import { HazardExposure } from "@/features/analyze/types/property";

const NRI_COUNTIES_LAYER =
  "https://services.arcgis.com/XG15cJAlne2vxtgt/arcgis/rest/services/National_Risk_Index_Counties/FeatureServer/0/query";

/** FEMA's five-tier composite rating collapsed onto our simplified low/medium/high enum. */
function normalizeRating(rating: string | null | undefined): HazardExposure | null {
  if (!rating) return null;
  const value = rating.trim().toLowerCase();
  if (value === "very low" || value === "relatively low") return "low";
  if (value === "relatively moderate") return "medium";
  if (value === "relatively high" || value === "very high") return "high";
  return null;
}

/**
 * Looks up FEMA's National Risk Index (public, keyless ArcGIS REST feature service) for a
 * county's composite natural hazard rating. Feeds EI-03 Natural Hazard Exposure
 * (docs/engines/environmental-intelligence.md). County-level, not parcel-level — coarser
 * than the FEMA flood zone lookup, but still real data rather than a generic default.
 */
export async function lookupNaturalHazardExposure(stateFips: string, countyFips: string): Promise<HazardExposure | null> {
  const stcofips = `${stateFips}${countyFips}`;
  const url = new URL(NRI_COUNTIES_LAYER);
  url.searchParams.set("where", `STCOFIPS='${stcofips}'`);
  url.searchParams.set("outFields", "RISK_RATNG");
  url.searchParams.set("returnGeometry", "false");
  url.searchParams.set("f", "json");

  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) return null;

    const data = (await response.json()) as { features?: { attributes?: { RISK_RATNG?: string } }[] };
    return normalizeRating(data.features?.[0]?.attributes?.RISK_RATNG);
  } catch {
    return null;
  }
}

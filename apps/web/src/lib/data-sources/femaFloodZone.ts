import { FemaFloodZone } from "@/features/analyze/types/property";

const NFHL_FLOOD_ZONES_LAYER =
  "https://hazards.fema.gov/arcgis/rest/services/public/NFHL/MapServer/28/query";

/** Maps FEMA's raw FLD_ZONE codes onto our simplified enum. "D" (undetermined) and
 * unrecognized codes return null rather than guessing "OTHER" for a zone we can't confirm. */
function normalizeZone(rawZone: string | null | undefined): FemaFloodZone | null {
  if (!rawZone) return null;
  const zone = rawZone.trim().toUpperCase();
  if (zone === "X") return "X";
  if (zone === "AE") return "AE";
  if (zone === "AO") return "AO";
  if (zone === "V" || zone === "VE") return "VE";
  if (zone === "A" || zone === "AH" || zone === "AR" || zone === "A99") return "A";
  return null;
}

/**
 * Looks up the FEMA National Flood Hazard Layer (public, keyless ArcGIS REST service)
 * for the flood zone at a given point. Feeds EI-01, the highest-weighted Environmental
 * Intelligence factor (docs/engines/environmental-intelligence.md).
 */
export async function lookupFloodZone(lat: number, lng: number): Promise<FemaFloodZone | null> {
  const url = new URL(NFHL_FLOOD_ZONES_LAYER);
  url.searchParams.set("geometry", `${lng},${lat}`);
  url.searchParams.set("geometryType", "esriGeometryPoint");
  url.searchParams.set("inSR", "4326");
  url.searchParams.set("spatialRel", "esriSpatialRelIntersects");
  url.searchParams.set("outFields", "FLD_ZONE");
  url.searchParams.set("returnGeometry", "false");
  url.searchParams.set("f", "json");

  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) return null;

    const data = (await response.json()) as { features?: { attributes?: { FLD_ZONE?: string } }[] };
    return normalizeZone(data.features?.[0]?.attributes?.FLD_ZONE);
  } catch {
    return null;
  }
}

const NWI_WETLANDS_LAYER = "https://fwspublicservices.wim.usgs.gov/wetlandsmapservice/rest/services/Wetlands/MapServer/0/query";

/**
 * Looks up the US Fish & Wildlife Service's National Wetlands Inventory (public, keyless
 * ArcGIS REST service) for wetlands intersecting a point. Feeds EI-02 Wetlands Presence
 * (docs/engines/environmental-intelligence.md).
 */
export async function lookupWetlandsPresent(lat: number, lng: number): Promise<boolean | null> {
  const url = new URL(NWI_WETLANDS_LAYER);
  url.searchParams.set("geometry", `${lng},${lat}`);
  url.searchParams.set("geometryType", "esriGeometryPoint");
  url.searchParams.set("inSR", "4326");
  url.searchParams.set("spatialRel", "esriSpatialRelIntersects");
  url.searchParams.set("outFields", "Wetlands.WETLAND_TYPE");
  url.searchParams.set("returnGeometry", "false");
  url.searchParams.set("f", "json");

  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) return null;

    const data = (await response.json()) as { features?: unknown[]; error?: unknown };
    if (data.error) return null;
    return (data.features?.length ?? 0) > 0;
  } catch {
    return null;
  }
}

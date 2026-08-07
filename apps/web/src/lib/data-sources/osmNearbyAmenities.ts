const OVERPASS_ENDPOINT = "https://overpass-api.de/api/interpreter";
const SEARCH_RADIUS_METERS = 1000;

/**
 * Counts nearby amenities/shops via OpenStreetMap's Overpass API (public, keyless). Feeds
 * LI-06 Nearby Services (docs/engines/location-intelligence.md). Community-run
 * infrastructure — no SLA, so this degrades to null (default) on any failure rather than
 * retrying, same as the other optional data sources.
 */
export async function lookupNearbyAmenitiesCount(lat: number, lng: number): Promise<number | null> {
  const query = `[out:json][timeout:15];(node(around:${SEARCH_RADIUS_METERS},${lat},${lng})[amenity];node(around:${SEARCH_RADIUS_METERS},${lat},${lng})[shop];);out count;`;

  try {
    const response = await fetch(OVERPASS_ENDPOINT, {
      method: "POST",
      body: `data=${encodeURIComponent(query)}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        // Overpass's server 406s requests with no identifiable client — Node's default
        // fetch User-Agent triggers this, so it needs an explicit one (Overpass usage
        // policy also asks callers to self-identify: https://wiki.openstreetmap.org/wiki/Overpass_API).
        "User-Agent": "LandPilot/1.0 (land investment analysis tool)",
      },
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) return null;

    const data = (await response.json()) as { elements?: { type: string; tags?: { total?: string } }[] };
    const countElement = data.elements?.find((el) => el.type === "count");
    const total = countElement?.tags?.total;
    return total ? Number(total) : null;
  } catch {
    return null;
  }
}

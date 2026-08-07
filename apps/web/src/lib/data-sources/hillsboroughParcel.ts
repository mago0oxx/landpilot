const SQ_METERS_TO_SQFT = 10.76391041671;

const PARCELS_LAYER =
  "https://gis.hcpafl.org/arcgis/rest/services/Webmaps/HillsboroughFL_WebParcels/MapServer/0/query";

export interface HillsboroughParcelResult {
  parcelId: string;
  lotSizeSqft: number;
}

/**
 * Looks up real parcel data (folio, lot area) from Hillsborough County's public,
 * keyless ArcGIS parcel service — no county-wide FL parcel API exists, so this is a
 * pilot integration for the one county used as the app's worked example (Tampa).
 * Other counties fall back to the documented defaults (defaults.ts) until added.
 */
export async function lookupHillsboroughParcel(address: string): Promise<HillsboroughParcelResult | null> {
  const streetPortion = address.split(",")[0]?.trim().toUpperCase();
  if (!streetPortion || streetPortion.length < 5) return null;

  const url = new URL(PARCELS_LAYER);
  url.searchParams.set("where", `FullAddress LIKE '%${streetPortion.replace(/'/g, "''")}%'`);
  url.searchParams.set("outFields", "folio,ShapeArea");
  url.searchParams.set("returnGeometry", "false");
  url.searchParams.set("resultRecordCount", "1");
  url.searchParams.set("f", "json");

  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) return null;

    const data = (await response.json()) as {
      features?: { attributes?: { folio?: string; ShapeArea?: number } }[];
    };
    const attributes = data.features?.[0]?.attributes;
    if (!attributes?.folio || !attributes.ShapeArea) return null;

    return {
      parcelId: attributes.folio,
      lotSizeSqft: Math.round(attributes.ShapeArea * SQ_METERS_TO_SQFT),
    };
  } catch {
    return null;
  }
}

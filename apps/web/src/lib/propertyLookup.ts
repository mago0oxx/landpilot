import { FemaFloodZone, HazardExposure } from "@/features/analyze/types/property";
import { lookupEmploymentGrowthPercent, lookupPopulationGrowthPercent } from "@/lib/data-sources/censusAcsGrowth";
import { lookupFloodZone } from "@/lib/data-sources/femaFloodZone";
import { lookupNaturalHazardExposure } from "@/lib/data-sources/femaRiskIndex";
import { lookupHillsboroughParcel } from "@/lib/data-sources/hillsboroughParcel";
import { lookupNearbyAmenitiesCount } from "@/lib/data-sources/osmNearbyAmenities";
import { lookupSepticSoilSuitability, SoilSepticResult } from "@/lib/data-sources/nrcsSoilSeptic";
import { lookupWetlandsPresent } from "@/lib/data-sources/usfwsWetlands";

interface CensusGeography {
  NAME?: string;
  STUSAB?: string;
  STATE?: string;
  COUNTY?: string;
}

interface CensusAddressMatch {
  coordinates?: { x?: number; y?: number };
  geographies?: {
    Counties?: CensusGeography[];
    States?: CensusGeography[];
  };
}

interface CensusResponse {
  result?: {
    addressMatches?: CensusAddressMatch[];
  };
}

export interface PropertyLookupResult {
  county: string | null;
  state: string | null;
  femaFloodZone: FemaFloodZone | null;
  parcelId: string | null;
  lotSizeSqft: number | null;
  populationGrowthRatePercent: number | null;
  employmentGrowthRatePercent: number | null;
  wetlandsPresent: boolean | null;
  naturalHazardExposure: HazardExposure | null;
  nearbyAmenitiesCount: number | null;
  /** USDA soil rating for a septic drain field — the best available signal on whether a perc
   * test is likely to pass. Null outside surveyed areas or when the map unit isn't rated. */
  septicSoil: SoilSepticResult | null;
  /** Geocoded centroid of the address. Not the parcel boundary — it's where the address
   * resolves to, which is what lets us render imagery centred on the lot. */
  latitude: number | null;
  longitude: number | null;
}

/**
 * Bump whenever a data source is added, removed, or changed shape. Cached lookups carry the
 * version they were captured under, and a mismatch forces a fresh fetch — otherwise every
 * address checked before a new source shipped would keep returning the old, incomplete result
 * until the cache aged out.
 */
export const LOOKUP_VERSION = 3;

export const EMPTY_LOOKUP_RESULT: PropertyLookupResult = {
  county: null,
  state: null,
  femaFloodZone: null,
  parcelId: null,
  lotSizeSqft: null,
  populationGrowthRatePercent: null,
  employmentGrowthRatePercent: null,
  wetlandsPresent: null,
  naturalHazardExposure: null,
  nearbyAmenitiesCount: null,
  septicSoil: null,
  latitude: null,
  longitude: null,
};

/** True when the address didn't geocode at all — every field is null and there's nothing to show. */
export function isEmptyLookup(result: PropertyLookupResult): boolean {
  return result.county === null && result.state === null && result.femaFloodZone === null;
}

/**
 * True when the address resolved but at least one coordinate-based source came back empty.
 * Those are usually transient (an upstream timeout), and caching them for the full window
 * means one bad moment makes a parcel look unknowable for a month.
 */
export function hasPartialFailures(result: PropertyLookupResult): boolean {
  return (
    result.femaFloodZone === null ||
    result.wetlandsPresent === null ||
    result.septicSoil === null ||
    result.nearbyAmenitiesCount === null
  );
}

/**
 * Free real-data lookup from just an address, so the buyer doesn't have to manually
 * research every field (docs/business/vision.md: "Simplicity"):
 * - County/state + coordinates via the US Census Bureau's public, keyless Geocoding API.
 * - FEMA flood zone (EI-01) via the public, keyless National Flood Hazard Layer.
 * - Real parcel folio + lot size for Hillsborough County (pilot — see hillsboroughParcel.ts).
 * - Population/employment growth (LI-01/LI-02) via Census ACS — needs a free CENSUS_API_KEY.
 * - Wetlands presence (EI-02) via the public, keyless USFWS National Wetlands Inventory.
 * - Natural hazard exposure (EI-03) via the public, keyless FEMA National Risk Index (county-level).
 * - Nearby amenities count (LI-06) via the public, keyless OpenStreetMap Overpass API.
 *
 * Shared by the authenticated analyze form (/api/geocode) and the public, no-account
 * address check (/api/preview) so both surface identical data for the same address.
 */
export async function lookupProperty(address: string): Promise<PropertyLookupResult> {
  const trimmed = address.trim();
  if (trimmed.length < 6) return EMPTY_LOOKUP_RESULT;

  const url = new URL("https://geocoding.geo.census.gov/geocoder/geographies/onelineaddress");
  url.searchParams.set("address", trimmed);
  url.searchParams.set("benchmark", "Public_AR_Current");
  url.searchParams.set("vintage", "Current_Current");
  url.searchParams.set("layers", "Counties,States");
  url.searchParams.set("format", "json");

  let match: CensusAddressMatch | undefined;

  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) return EMPTY_LOOKUP_RESULT;

    const data = (await response.json()) as CensusResponse;
    match = data.result?.addressMatches?.[0];
  } catch {
    return EMPTY_LOOKUP_RESULT;
  }

  if (!match) return EMPTY_LOOKUP_RESULT;

  const countyGeography = match.geographies?.Counties?.[0];
  const countyName = countyGeography?.NAME;
  const county = countyName ? countyName.replace(/ County$/i, "") : null;
  const state = match.geographies?.States?.[0]?.STUSAB ?? null;
  const lat = match.coordinates?.y;
  const lng = match.coordinates?.x;
  const stateFips = countyGeography?.STATE;
  const countyFips = countyGeography?.COUNTY;
  const hasCoordinates = lat !== undefined && lng !== undefined;

  const [
    femaFloodZone,
    parcel,
    populationGrowthRatePercent,
    employmentGrowthRatePercent,
    wetlandsPresent,
    naturalHazardExposure,
    nearbyAmenitiesCount,
    septicSoil,
  ] = await Promise.all([
    hasCoordinates ? lookupFloodZone(lat, lng) : Promise.resolve(null),
    county?.toLowerCase() === "hillsborough" ? lookupHillsboroughParcel(trimmed) : Promise.resolve(null),
    stateFips && countyFips ? lookupPopulationGrowthPercent(stateFips, countyFips) : Promise.resolve(null),
    stateFips && countyFips ? lookupEmploymentGrowthPercent(stateFips, countyFips) : Promise.resolve(null),
    hasCoordinates ? lookupWetlandsPresent(lat, lng) : Promise.resolve(null),
    stateFips && countyFips ? lookupNaturalHazardExposure(stateFips, countyFips) : Promise.resolve(null),
    hasCoordinates ? lookupNearbyAmenitiesCount(lat, lng) : Promise.resolve(null),
    hasCoordinates ? lookupSepticSoilSuitability(lat, lng) : Promise.resolve(null),
  ]);

  return {
    county,
    state,
    femaFloodZone,
    parcelId: parcel?.parcelId ?? null,
    lotSizeSqft: parcel?.lotSizeSqft ?? null,
    populationGrowthRatePercent,
    employmentGrowthRatePercent,
    wetlandsPresent,
    naturalHazardExposure,
    nearbyAmenitiesCount,
    septicSoil,
    latitude: lat ?? null,
    longitude: lng ?? null,
  };
}

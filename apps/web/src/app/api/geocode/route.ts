import { NextRequest, NextResponse } from "next/server";
import { FemaFloodZone, HazardExposure } from "@/features/analyze/types/property";
import { lookupEmploymentGrowthPercent, lookupPopulationGrowthPercent } from "@/lib/data-sources/censusAcsGrowth";
import { lookupFloodZone } from "@/lib/data-sources/femaFloodZone";
import { lookupNaturalHazardExposure } from "@/lib/data-sources/femaRiskIndex";
import { lookupHillsboroughParcel } from "@/lib/data-sources/hillsboroughParcel";
import { lookupNearbyAmenitiesCount } from "@/lib/data-sources/osmNearbyAmenities";
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
}

const EMPTY_RESULT: PropertyLookupResult = {
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
};

/**
 * Free real-data lookup from just an address, so the investor doesn't have to manually
 * research every field (docs/business/vision.md: "Simplicity"):
 * - County/state + coordinates via the US Census Bureau's public, keyless Geocoding API.
 * - FEMA flood zone (EI-01) via the public, keyless National Flood Hazard Layer.
 * - Real parcel folio + lot size for Hillsborough County (pilot — see hillsboroughParcel.ts).
 * - Population/employment growth (LI-01/LI-02) via Census ACS — needs a free CENSUS_API_KEY.
 * - Wetlands presence (EI-02) via the public, keyless USFWS National Wetlands Inventory.
 * - Natural hazard exposure (EI-03) via the public, keyless FEMA National Risk Index (county-level).
 * - Nearby amenities count (LI-06) via the public, keyless OpenStreetMap Overpass API.
 */
export async function GET(request: NextRequest) {
  const address = request.nextUrl.searchParams.get("address")?.trim();

  if (!address || address.length < 6) {
    return NextResponse.json(EMPTY_RESULT);
  }

  const url = new URL("https://geocoding.geo.census.gov/geocoder/geographies/onelineaddress");
  url.searchParams.set("address", address);
  url.searchParams.set("benchmark", "Public_AR_Current");
  url.searchParams.set("vintage", "Current_Current");
  url.searchParams.set("layers", "Counties,States");
  url.searchParams.set("format", "json");

  let match: CensusAddressMatch | undefined;

  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) return NextResponse.json(EMPTY_RESULT);

    const data = (await response.json()) as CensusResponse;
    match = data.result?.addressMatches?.[0];
  } catch {
    return NextResponse.json(EMPTY_RESULT);
  }

  if (!match) return NextResponse.json(EMPTY_RESULT);

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
  ] = await Promise.all([
    hasCoordinates ? lookupFloodZone(lat, lng) : Promise.resolve(null),
    county?.toLowerCase() === "hillsborough" ? lookupHillsboroughParcel(address) : Promise.resolve(null),
    stateFips && countyFips ? lookupPopulationGrowthPercent(stateFips, countyFips) : Promise.resolve(null),
    stateFips && countyFips ? lookupEmploymentGrowthPercent(stateFips, countyFips) : Promise.resolve(null),
    hasCoordinates ? lookupWetlandsPresent(lat, lng) : Promise.resolve(null),
    stateFips && countyFips ? lookupNaturalHazardExposure(stateFips, countyFips) : Promise.resolve(null),
    hasCoordinates ? lookupNearbyAmenitiesCount(lat, lng) : Promise.resolve(null),
  ]);

  return NextResponse.json<PropertyLookupResult>({
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
  });
}

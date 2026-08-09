import { FemaFloodZone, HazardExposure } from "../types/property";

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

export async function lookupPropertyData(address: string): Promise<PropertyLookupResult> {
  try {
    const response = await fetch(`/api/geocode?address=${encodeURIComponent(address)}`);
    if (!response.ok) return EMPTY_RESULT;
    return (await response.json()) as PropertyLookupResult;
  } catch {
    return EMPTY_RESULT;
  }
}

export interface ExtractedListingData {
  askingPrice: number | null;
  lotSizeSqft: number | null;
  address: string | null;
  avgDaysOnMarket: number | null;
  comparablePricePerSqft: number | null;
  hoaRestrictions: boolean | null;
  waterSewerAvailable: boolean | null;
  roadFrontage: boolean | null;
}

const EMPTY_EXTRACTION: ExtractedListingData = {
  askingPrice: null,
  lotSizeSqft: null,
  address: null,
  avgDaysOnMarket: null,
  comparablePricePerSqft: null,
  hoaRestrictions: null,
  waterSewerAvailable: null,
  roadFrontage: null,
};

export async function extractListingData(text: string): Promise<ExtractedListingData> {
  try {
    const response = await fetch("/api/extract-listing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!response.ok) return EMPTY_EXTRACTION;
    return (await response.json()) as ExtractedListingData;
  } catch {
    return EMPTY_EXTRACTION;
  }
}

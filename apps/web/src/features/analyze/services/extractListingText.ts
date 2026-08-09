import { chatComplete } from "@/lib/ai/claudeClient";

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

const EMPTY_RESULT: ExtractedListingData = {
  askingPrice: null,
  lotSizeSqft: null,
  address: null,
  avgDaysOnMarket: null,
  comparablePricePerSqft: null,
  hoaRestrictions: null,
  waterSewerAvailable: null,
  roadFrontage: null,
};

const SYSTEM_PROMPT = `You extract structured facts from real estate listing text that a user pasted directly
from a site like Zillow or Realtor.com — you are reading text the user gave you, not searching or guessing.
Only include a field if it's explicitly and unambiguously stated in the text; never estimate, infer, or guess
a value that isn't clearly there. When in doubt, leave the field null.

Field notes:
- lotSizeSqft: convert to square feet if given in acres (1 acre = 43,560 sqft).
- avgDaysOnMarket: convert weeks/months to days if needed (1 week = 7 days, 1 month = 30 days).
- comparablePricePerSqft: a $/sqft figure explicitly stated for this listing or nearby comparable sales.
- hoaRestrictions: true only if an HOA/mandatory association fee is mentioned as present; false only if the
  text explicitly says there is no HOA; null if HOA isn't mentioned at all.
- waterSewerAvailable: true only if explicitly connected to public/city water and sewer; false only if
  explicitly on well/septic only; null if not mentioned.
- roadFrontage: true only if the text explicitly describes paved/maintained road access; false only if it
  explicitly describes unpaved road or no legal road access; null if not mentioned.

Respond with ONLY a JSON object: {"askingPrice": number|null, "lotSizeSqft": number|null, "address": string|null,
"avgDaysOnMarket": number|null, "comparablePricePerSqft": number|null, "hoaRestrictions": boolean|null,
"waterSewerAvailable": boolean|null, "roadFrontage": boolean|null}`;

/**
 * Parses a raw pasted listing description (price, lot size, address) via Claude. This never
 * fetches or scrapes anything — it only reads text the user pasted themselves, which sidesteps
 * Zillow/Realtor's anti-scraping protections entirely (see PropertyInformationSection).
 * Returns nulls (not thrown errors) when AI is unavailable or nothing could be parsed.
 */
export async function extractListingText(rawText: string): Promise<ExtractedListingData> {
  if (!rawText.trim()) return EMPTY_RESULT;

  const raw = await chatComplete([
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: rawText.slice(0, 4000) },
  ]);
  if (!raw) return EMPTY_RESULT;

  try {
    const cleaned = raw.trim().replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
    const parsed = JSON.parse(cleaned);
    return {
      askingPrice: typeof parsed.askingPrice === "number" ? parsed.askingPrice : null,
      lotSizeSqft: typeof parsed.lotSizeSqft === "number" ? parsed.lotSizeSqft : null,
      address: typeof parsed.address === "string" && parsed.address.trim() ? parsed.address : null,
      avgDaysOnMarket: typeof parsed.avgDaysOnMarket === "number" ? parsed.avgDaysOnMarket : null,
      comparablePricePerSqft: typeof parsed.comparablePricePerSqft === "number" ? parsed.comparablePricePerSqft : null,
      hoaRestrictions: typeof parsed.hoaRestrictions === "boolean" ? parsed.hoaRestrictions : null,
      waterSewerAvailable: typeof parsed.waterSewerAvailable === "boolean" ? parsed.waterSewerAvailable : null,
      roadFrontage: typeof parsed.roadFrontage === "boolean" ? parsed.roadFrontage : null,
    };
  } catch {
    return EMPTY_RESULT;
  }
}

import { chatComplete } from "@/lib/ai/claudeClient";

export interface ExtractedListingData {
  askingPrice: number | null;
  lotSizeSqft: number | null;
  address: string | null;
}

const EMPTY_RESULT: ExtractedListingData = { askingPrice: null, lotSizeSqft: null, address: null };

const SYSTEM_PROMPT = `You extract structured facts from real estate listing text that a user pasted directly
from a site like Zillow or Realtor.com — you are reading text the user gave you, not searching or guessing.
Only include a field if it's explicitly stated in the text; never estimate or infer a value that isn't there.

Convert lot size to square feet if given in acres (1 acre = 43,560 sqft).

Respond with ONLY a JSON object: {"askingPrice": number|null, "lotSizeSqft": number|null, "address": string|null}`;

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
    };
  } catch {
    return EMPTY_RESULT;
  }
}

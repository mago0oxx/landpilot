import { chatCompleteWithWebSearch } from "@/lib/ai/claudeClient";
import { LandAnalysisInput } from "../types/property";
import { EngineId } from "../types/scoring";

/**
 * Fields Claude is allowed to research and fill when the investor opts in. Restricted to soft,
 * regional/market figures a knowledgeable local researcher could reasonably look up —
 * deliberately excludes every legal/environmental/infrastructure boolean (title issues,
 * easements, wetlands, utility access, zoning compliance, code violations) and anything
 * else that's a hard fact about this specific parcel. No web search can verify those for one
 * exact lot, so guessing them — even "researched" — risks masking a real red flag.
 */
export const AI_RESEARCHABLE_FIELDS = [
  "location.employmentGrowthRatePercent",
  "development.zoningAllowedUnits",
  "development.estimatedConstructionCostPerSqft",
  "development.regionalAvgConstructionCostPerSqft",
  "financial.areaAvgPricePerSqft",
  "market.comparableSalesTrendPercent",
  "market.monthsOfSupply",
  "market.avgDaysOnMarket",
] as const;

export type AiResearchableField = (typeof AI_RESEARCHABLE_FIELDS)[number];

/** Which engine's confidence/badge a given researched field affects. */
export const FIELD_TO_ENGINE: Record<AiResearchableField, EngineId> = {
  "location.employmentGrowthRatePercent": "location",
  "development.zoningAllowedUnits": "development",
  "development.estimatedConstructionCostPerSqft": "development",
  "development.regionalAvgConstructionCostPerSqft": "development",
  "financial.areaAvgPricePerSqft": "financial",
  "market.comparableSalesTrendPercent": "market",
  "market.monthsOfSupply": "market",
  "market.avgDaysOnMarket": "market",
};

interface ResearchTarget {
  address: string;
  county: string;
  state: string;
  /** Already-known values, so Claude only fills genuine gaps instead of overwriting real input. */
  known: Partial<Record<AiResearchableField, number>>;
}

const SYSTEM_PROMPT = `You are researching US residential land investment figures using live web search.
Only report a number for a field if you found a real, current source for that specific county/area —
never invent a plausible-sounding figure. Skip any field you can't ground in an actual search result.

Respond with ONLY a JSON object mapping field name to a numeric value, using exactly these keys (omit
any key you couldn't verify):
${AI_RESEARCHABLE_FIELDS.map((f) => `"${f}"`).join(", ")}

Field meanings:
- location.employmentGrowthRatePercent: annual employment growth % for the county
- development.zoningAllowedUnits: typical residential zoning density (units allowed) for the area
- development.estimatedConstructionCostPerSqft: typical residential construction cost $/sqft in the county
- development.regionalAvgConstructionCostPerSqft: same, as the regional benchmark to compare against
- financial.areaAvgPricePerSqft: average land/home price per sqft in the immediate area
- market.comparableSalesTrendPercent: year-over-year comparable sales price trend %
- market.monthsOfSupply: months of housing supply in the local market
- market.avgDaysOnMarket: average days on market for comparable listings`;

function buildUserPrompt(target: ResearchTarget): string {
  const missing = AI_RESEARCHABLE_FIELDS.filter((f) => target.known[f] === undefined);
  return `Property: ${target.address}, ${target.county} County, ${target.state}.

Research current values for: ${missing.join(", ")}.

Search the web for real, current sources (county assessor sites, Zillow/Redfin research, local
market reports, construction cost indices) — don't estimate from memory alone.`;
}

export interface AiResearchResult {
  values: Partial<Record<AiResearchableField, number>>;
  fieldsUsed: AiResearchableField[];
}

/** Returns {} / [] if AI is unavailable, disabled, or nothing could be verified via search. */
export async function researchMissingFields(target: ResearchTarget): Promise<AiResearchResult> {
  const missing = AI_RESEARCHABLE_FIELDS.filter((f) => target.known[f] === undefined);
  if (missing.length === 0) return { values: {}, fieldsUsed: [] };

  const raw = await chatCompleteWithWebSearch([
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: buildUserPrompt(target) },
  ]);
  if (!raw) return { values: {}, fieldsUsed: [] };

  try {
    const cleaned = raw.trim().replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
    const parsed = JSON.parse(cleaned);
    const values: Partial<Record<AiResearchableField, number>> = {};
    const fieldsUsed: AiResearchableField[] = [];

    for (const field of missing) {
      const value = parsed[field];
      if (typeof value === "number" && Number.isFinite(value)) {
        values[field] = value;
        fieldsUsed.push(field);
      }
    }

    return { values, fieldsUsed };
  } catch {
    return { values: {}, fieldsUsed: [] };
  }
}

/** Reads the current value of each researchable field so Claude is only asked to fill real gaps. */
export function buildKnownMap(input: LandAnalysisInput): Partial<Record<AiResearchableField, number>> {
  return {
    "location.employmentGrowthRatePercent": input.location.employmentGrowthRatePercent,
    "development.zoningAllowedUnits": input.development.zoningAllowedUnits,
    "development.estimatedConstructionCostPerSqft": input.development.estimatedConstructionCostPerSqft,
    "development.regionalAvgConstructionCostPerSqft": input.development.regionalAvgConstructionCostPerSqft,
    "financial.areaAvgPricePerSqft": input.financial.areaAvgPricePerSqft,
    "market.comparableSalesTrendPercent": input.market.comparableSalesTrendPercent,
    "market.monthsOfSupply": input.market.monthsOfSupply,
    "market.avgDaysOnMarket": input.market.avgDaysOnMarket,
  };
}

/** Returns a new input with researched values filled into the (previously empty) target fields. */
export function mergeResearchedValues(
  input: LandAnalysisInput,
  values: Partial<Record<AiResearchableField, number>>
): LandAnalysisInput {
  return {
    ...input,
    location: { ...input.location, employmentGrowthRatePercent: values["location.employmentGrowthRatePercent"] ?? input.location.employmentGrowthRatePercent },
    development: {
      ...input.development,
      zoningAllowedUnits: values["development.zoningAllowedUnits"] ?? input.development.zoningAllowedUnits,
      estimatedConstructionCostPerSqft:
        values["development.estimatedConstructionCostPerSqft"] ?? input.development.estimatedConstructionCostPerSqft,
      regionalAvgConstructionCostPerSqft:
        values["development.regionalAvgConstructionCostPerSqft"] ?? input.development.regionalAvgConstructionCostPerSqft,
    },
    financial: { ...input.financial, areaAvgPricePerSqft: values["financial.areaAvgPricePerSqft"] ?? input.financial.areaAvgPricePerSqft },
    market: {
      ...input.market,
      comparableSalesTrendPercent: values["market.comparableSalesTrendPercent"] ?? input.market.comparableSalesTrendPercent,
      monthsOfSupply: values["market.monthsOfSupply"] ?? input.market.monthsOfSupply,
      avgDaysOnMarket: values["market.avgDaysOnMarket"] ?? input.market.avgDaysOnMarket,
    },
  };
}

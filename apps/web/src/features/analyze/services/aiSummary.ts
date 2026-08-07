import { chatComplete } from "@/lib/ai/claudeClient";
import { LPSResult } from "../types/scoring";
import { ScenarioResult } from "../types/scenario";

interface AiSummaryProperty {
  address: string;
  county: string;
  state: string;
  askingPrice: number;
}

export type AnalysisIntent = "investment" | "residence";

const INVESTMENT_SYSTEM_PROMPT = `You are a land investment analyst writing for a US-based investor. You are given the
already-computed output of a rule-based scoring engine — never invent scores, dollar amounts, or facts
that aren't in the data provided. Write in plain, direct English.

If a strategy comparison table is included, recommend the single best strategy (what to build, and
whether to sell or rent it) citing the actual ROI numbers given — and say so plainly if none of the
build scenarios are confirmed viable (zoning not verified against real data).

Respond with ONLY a JSON object of the form:
{"summary": "2-4 sentence narrative explaining the score and the recommended strategy", "actionItems": ["short actionable next step", ...]}

actionItems must have 2-3 items, each a concrete thing the investor should verify or do before buying
(e.g. confirm zoning with the county, get a survey for easements) — grounded in the red flags and
weakest engines given, not generic advice.`;

const RESIDENCE_SYSTEM_PROMPT = `You are a land advisor writing for someone who wants to build their own home
and live there — not an investor. You are given the already-computed output of a rule-based scoring
engine — never invent facts that aren't in the data provided. Write in plain, direct English.

Never mention ROI, return on investment, profit, or resale value — that is not what this buyer cares
about. Focus on whether this is a safe, pleasant, low-hassle place to build and live: location quality,
environmental risk, legal complications, and access to utilities/roads.

Respond with ONLY a JSON object of the form:
{"summary": "2-4 sentence narrative on whether this is a good place to live", "actionItems": ["short actionable next step", ...]}

actionItems must have 2-3 items grounded in the red flags and weakest engines given (e.g. confirm flood
insurance requirements, verify road access) — not generic advice.`;

function buildEngineLines(result: LPSResult): string {
  return result.engines
    .map((e) => `- ${e.label}: ${e.contribution}/${e.weight} pts (score ${e.score}/100)${e.redFlags.length ? ` — red flags: ${e.redFlags.join("; ")}` : ""}`)
    .join("\n");
}

function buildScenarioLines(scenarios: ScenarioResult[]): string {
  return scenarios
    .map((s) => {
      const metric =
        s.exitStrategy === "rent"
          ? `${s.roiPercent}%/year cash-on-cash return`
          : s.exitStrategy === "sell"
            ? `${s.roiPercent}% total ROI at sale`
            : `${s.roiPercent}% ROI (resale as-is, no construction)`;
      const status = s.viable ? "viable" : `NOT VIABLE — ${s.viabilityNote}`;
      return `- ${s.label}: ${metric}, total investment $${s.totalInvestment.toLocaleString()} (${status})`;
    })
    .join("\n");
}

function buildBasePrompt(result: LPSResult, property: AiSummaryProperty): string {
  return `Property: ${property.address}, ${property.county}, ${property.state}. Asking price: $${property.askingPrice.toLocaleString()}.

LPS Score: ${result.score}/1000
Confidence: ${result.confidenceLevel}
Risk level: ${result.riskLevel}
Recommendation: ${result.recommendation}

Engine breakdown:
${buildEngineLines(result)}`;
}

/** Returns a JSON string {summary, actionItems} for storage, or null if AI is unavailable/fails. */
export async function generateAiSummary(
  result: LPSResult,
  property: AiSummaryProperty,
  intent: AnalysisIntent,
  scenarios: ScenarioResult[] | null
): Promise<string | null> {
  const base = buildBasePrompt(result, property);
  const userPrompt =
    intent === "investment" && scenarios && scenarios.length > 0
      ? `${base}\n\nStrategy comparison for this lot (7 build/exit scenarios):\n${buildScenarioLines(scenarios)}`
      : base;
  const systemPrompt = intent === "residence" ? RESIDENCE_SYSTEM_PROMPT : INVESTMENT_SYSTEM_PROMPT;

  const raw = await chatComplete([
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ]);
  if (!raw) return null;

  try {
    const cleaned = raw.trim().replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
    const parsed = JSON.parse(cleaned);
    if (typeof parsed.summary !== "string" || !Array.isArray(parsed.actionItems)) return null;
    return JSON.stringify({
      summary: parsed.summary,
      actionItems: parsed.actionItems.filter((item: unknown) => typeof item === "string").slice(0, 3),
    });
  } catch {
    return null;
  }
}

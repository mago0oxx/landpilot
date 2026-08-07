import { ConfidenceLevel, EngineResult, LPSResult, Recommendation, RiskLevel } from "../../types/scoring";

const HARD_OVERRIDE_FLAGS = ["Projected ROI is negative.", "Unresolved title issues or liens."];

/**
 * Decision Intelligence (aggregator / docs/engines/decision-intelligence.md)
 * Combines the 7 scored engines into the final LPS Score, Confidence, Risk and Recommendation.
 */
export function evaluateDecision(engines: EngineResult[]): LPSResult {
  const score = Math.round(engines.reduce((sum, e) => sum + e.contribution, 0) * 10) / 10;

  const confidenceLevel = computeConfidenceLevel(engines);
  const redFlags = engines.flatMap((e) => e.redFlags);
  const riskLevel = computeRiskLevel(redFlags);
  const recommendation = computeRecommendation(score, riskLevel);
  const explanation = buildExplanation(engines, score, riskLevel, recommendation, redFlags);

  return { score, confidenceLevel, riskLevel, recommendation, explanation, engines };
}

function computeConfidenceLevel(engines: EngineResult[]): ConfidenceLevel {
  const avgCompleteness = engines.reduce((sum, e) => sum + e.confidencePercent, 0) / engines.length;
  if (avgCompleteness >= 85) return "High";
  if (avgCompleteness >= 60) return "Medium";
  return "Low";
}

function computeRiskLevel(redFlags: string[]): RiskLevel {
  const hasHardOverride = redFlags.some((flag) => HARD_OVERRIDE_FLAGS.includes(flag));
  if (hasHardOverride || redFlags.length >= 3) return "High";
  if (redFlags.length >= 1) return "Medium";
  return "Low";
}

function computeRecommendation(score: number, riskLevel: RiskLevel): Recommendation {
  if (riskLevel === "High" || score < 500) return "Pass";
  if (score >= 800) return "Strong Buy";
  if (score >= 650) return "Buy";
  return "Consider";
}

function buildExplanation(
  engines: EngineResult[],
  score: number,
  riskLevel: RiskLevel,
  recommendation: Recommendation,
  redFlags: string[]
): string {
  const sorted = [...engines].sort((a, b) => b.contribution - a.contribution);
  const strongest = sorted[0];
  const weakest = sorted[sorted.length - 1];

  const parts = [
    `LPS Score of ${score}/1000 driven mainly by ${strongest.label} (${strongest.contribution}/${strongest.weight} pts) and weighed down most by ${weakest.label} (${weakest.contribution}/${weakest.weight} pts).`,
  ];

  if (redFlags.length > 0) {
    parts.push(`${redFlags.length} risk flag(s) identified: ${redFlags.join(" ")}`);
  } else {
    parts.push("No risk flags identified across the seven Intelligence Engines.");
  }

  parts.push(`Risk Level: ${riskLevel}. Recommendation: ${recommendation}.`);

  return parts.join(" ");
}

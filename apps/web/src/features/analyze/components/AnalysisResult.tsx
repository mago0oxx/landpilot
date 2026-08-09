import { Sparkles } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import SectionCard from "@/components/ui/SectionCard";
import DisclaimerNote from "@/components/shared/DisclaimerNote";
import TopoPattern from "@/components/shared/TopoPattern";
import { AiResearchableField, FIELD_TO_ENGINE } from "../services/aiResearch";
import { EngineId, LPSResult, Recommendation, RiskLevel } from "../types/scoring";
import { ScenarioResult } from "../types/scenario";
import DeleteAnalysisButton from "./DeleteAnalysisButton";
import EngineCard from "./EngineCard";
import PortfolioToggleButton from "./PortfolioToggleButton";
import ScenarioComparison from "./ScenarioComparison";
import ScoreGauge from "./ScoreGauge";

const RECOMMENDATION_VARIANT: Record<Recommendation, "success" | "info" | "warning" | "danger"> = {
  "Strong Buy": "success",
  Buy: "info",
  Consider: "warning",
  Pass: "danger",
};

const RECOMMENDATION_TEXT_TONE: Record<Recommendation, string> = {
  "Strong Buy": "text-emerald-700",
  Buy: "text-emerald-700",
  Consider: "text-amber-700",
  Pass: "text-red-700",
};

const RISK_VARIANT: Record<RiskLevel, "success" | "warning" | "danger"> = {
  Low: "success",
  Medium: "warning",
  High: "danger",
};

interface AnalysisResultProperty {
  address: string;
  county: string;
  state: string;
  lotSizeSqft: number;
  askingPrice: number;
  listingUrl?: string | null;
}

interface ParsedAiSummary {
  summary: string;
  actionItems: string[];
}

interface AnalysisResultProps {
  analysisId: string;
  result: LPSResult;
  aiSummary?: string | null;
  aiResearchedFields?: string[];
  scenarios?: ScenarioResult[] | null;
  property: AnalysisResultProperty;
  inPortfolio: boolean;
  canUsePortfolio: boolean;
}

function parseAiSummary(raw?: string | null): ParsedAiSummary | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed.summary !== "string" || !Array.isArray(parsed.actionItems)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export default function AnalysisResult({
  analysisId,
  result,
  aiSummary,
  aiResearchedFields = [],
  scenarios,
  property,
  inPortfolio,
  canUsePortfolio,
}: AnalysisResultProps) {
  const avgConfidencePercent = Math.round(
    result.engines.reduce((sum, engine) => sum + engine.confidencePercent, 0) / result.engines.length
  );
  const ai = parseAiSummary(aiSummary);
  const aiResearchedEngines = new Set<EngineId>(
    aiResearchedFields.map((field) => FIELD_TO_ENGINE[field as AiResearchableField]).filter(Boolean)
  );

  return (
    <div className="space-y-6">
      <Card className="!p-0 overflow-hidden">
        <div className="relative overflow-hidden bg-lp-forest px-8 py-6">
          <TopoPattern />
          <p className="relative z-10 text-xs font-semibold tracking-wide text-lp-mint">PROPERTY</p>
          <h1 className="relative z-10 mt-1 text-2xl font-semibold text-lp-cream">{property.address}</h1>
          <div className="relative z-10 mt-3 flex w-fit flex-wrap items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-2">
            <span className="font-mono text-xs text-lp-mint">{property.lotSizeSqft.toLocaleString()} sqft</span>
            <span className="h-3 w-px bg-white/15" />
            <span className="font-mono text-xs text-lp-mint">
              {property.county}, {property.state}
            </span>
            <span className="h-3 w-px bg-white/15" />
            <span className="font-mono text-xs text-lp-mint">${property.askingPrice.toLocaleString()}</span>
            {property.listingUrl && (
              <>
                <span className="h-3 w-px bg-white/15" />
                <a
                  href={property.listingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-lp-gold underline"
                >
                  Listing ↗
                </a>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 px-6 pt-6">
          <PortfolioToggleButton analysisId={analysisId} initialInPortfolio={inPortfolio} canUsePortfolio={canUsePortfolio} />
          <DeleteAnalysisButton analysisId={analysisId} redirectTo="/dashboard" />
        </div>

        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-[130px_1fr]">
          <div className="flex items-center justify-center">
            <ScoreGauge score={result.score} />
          </div>
          <div className="flex flex-col justify-center gap-3">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-medium text-stone-500">Confidence</span>
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-stone-200">
                <div className="h-full rounded-full bg-lp-forest-light" style={{ width: `${avgConfidencePercent}%` }} />
              </div>
              <span className="font-mono text-xs text-lp-ink">{result.confidenceLevel}</span>
            </div>
            {aiResearchedEngines.size > 0 && (
              <p className="text-[10.5px] text-lp-gold">
                Includes AI-researched data — confidence is capped at &quot;Medium&quot;.
              </p>
            )}
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-stone-500">Risk level</span>
              <Badge variant={RISK_VARIANT[result.riskLevel]}>{result.riskLevel}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-stone-500">Recommendation</span>
              <Badge variant={RECOMMENDATION_VARIANT[result.recommendation]}>{result.recommendation}</Badge>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <p className="mb-2 text-[10px] font-bold tracking-wide text-lp-forest-light">INVESTMENT RECOMMENDATION</p>
        <p className="text-sm leading-relaxed text-stone-600">{result.explanation}</p>
      </Card>

      <DisclaimerNote variant="card" />

      {scenarios && scenarios.length > 0 && <ScenarioComparison scenarios={scenarios} />}

      {ai && (
        <Card className="!border-lp-gold/25 !bg-lp-gold/5">
          <div className="mb-2 flex items-center gap-1.5">
            <Sparkles size={14} className="text-lp-gold" />
            <p className="text-[10px] font-bold tracking-wide text-lp-gold">AI INSIGHTS · GENERATED BY CLAUDE</p>
          </div>
          <p className="text-sm leading-relaxed text-stone-600">{ai.summary}</p>
          {ai.actionItems.length > 0 && (
            <ul className="mt-3 space-y-1.5 text-sm text-stone-600">
              {ai.actionItems.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-lp-gold">→</span>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}

      <div>
        <p className="mb-3 text-[10px] font-bold tracking-wide text-stone-500">INTELLIGENCE ENGINE BREAKDOWN</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {result.engines.map((engine) => (
            <EngineCard key={engine.engine} engine={engine} aiResearched={aiResearchedEngines.has(engine.engine)} />
          ))}

          {/* Decision Intelligence is the aggregator, not an 8th scored engine — no independent
              weight/score exists for it (docs/engines/decision-intelligence.md), so this card
              shows the aggregation outcome instead of a score bar. */}
          <div className="rounded-xl border border-lp-border bg-white p-3">
            <p className="mb-1.5 text-[9px] font-bold tracking-wide text-stone-500">DECISION</p>
            <p className={`font-mono text-lg font-bold leading-none ${RECOMMENDATION_TEXT_TONE[result.recommendation]}`}>
              {result.recommendation.toUpperCase()}
            </p>
            <div className="mt-2.5 flex flex-col gap-0.5">
              <span className="text-[9.5px] leading-tight text-stone-500">Confidence: {result.confidenceLevel}</span>
              <span className="text-[9.5px] leading-tight text-stone-500">Risk: {result.riskLevel}</span>
              <span className="text-[9.5px] leading-tight text-stone-500">
                {result.engines.length} engines aggregated
              </span>
            </div>
          </div>
        </div>
      </div>

      <SectionCard title="Full Engine Detail" description="Every factor and red flag behind each engine's score.">
        <div className="space-y-4">
          {result.engines.map((engine) => (
            <div key={engine.engine} className="rounded-xl border border-lp-border p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium text-lp-ink">{engine.label}</p>
                <p className="font-mono text-sm text-stone-500">
                  {engine.contribution} / {engine.weight} pts
                </p>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-stone-200">
                <div className="h-full rounded-full bg-lp-forest-light" style={{ width: `${engine.score}%` }} />
              </div>
              {engine.redFlags.length > 0 && (
                <ul className="mt-3 space-y-1 text-sm text-red-700">
                  {engine.redFlags.map((flag) => (
                    <li key={flag}>⚠ {flag}</li>
                  ))}
                </ul>
              )}
              <ul className="mt-3 space-y-1 text-sm text-stone-500">
                {engine.factors.map((factor) => (
                  <li key={factor.id}>
                    <span className="text-lp-ink">{factor.id}</span> {factor.label}: {factor.score.toFixed(0)}/100 — {factor.finding}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

import { EngineId, EngineResult } from "@/features/analyze/types/scoring";

export interface EngineAggregate {
  engine: EngineId;
  label: string;
  avgScore: number;
  avgConfidence: number;
  /** How many analyses this was the single lowest-scoring engine — i.e. the deal-breaker. */
  weakestCount: number;
}

/** Averages + "most often the weak link" per engine, across every analysis the investor has run. */
export function computeEngineStats(allEngineResults: EngineResult[][]): EngineAggregate[] {
  const totals = new Map<EngineId, { label: string; scoreSum: number; confidenceSum: number; count: number; weakestCount: number }>();

  for (const engines of allEngineResults) {
    if (engines.length === 0) continue;
    const weakest = engines.reduce((min, e) => (e.score < min.score ? e : min), engines[0]);

    for (const e of engines) {
      const existing = totals.get(e.engine) ?? { label: e.label, scoreSum: 0, confidenceSum: 0, count: 0, weakestCount: 0 };
      existing.scoreSum += e.score;
      existing.confidenceSum += e.confidencePercent;
      existing.count += 1;
      if (e.engine === weakest.engine) existing.weakestCount += 1;
      totals.set(e.engine, existing);
    }
  }

  return Array.from(totals.entries())
    .map(([engine, t]) => ({
      engine,
      label: t.label,
      avgScore: Math.round((t.scoreSum / t.count) * 10) / 10,
      avgConfidence: Math.round(t.confidenceSum / t.count),
      weakestCount: t.weakestCount,
    }))
    .sort((a, b) => a.avgScore - b.avgScore);
}

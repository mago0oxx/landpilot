import { EngineFactorResult, EngineId, EngineResult } from "../../types/scoring";

export const NEUTRAL_SCORE = 50;

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function linearScore(value: number, min: number, max: number): number {
  if (max === min) return 100;
  return clamp(((value - min) / (max - min)) * 100, 0, 100);
}

export function inverseLinearScore(value: number, min: number, max: number): number {
  return 100 - linearScore(value, min, max);
}

export function boolScore(value: boolean | undefined, trueScore = 100, falseScore = 0): number {
  if (value === undefined) return NEUTRAL_SCORE;
  return value ? trueScore : falseScore;
}

export function enumScore<T extends string>(
  value: T | undefined,
  scoreMap: Record<T, number>
): number {
  if (value === undefined) return NEUTRAL_SCORE;
  return scoreMap[value];
}

export interface RawFactor extends EngineFactorResult {
  hasData: boolean;
}

export function buildEngineResult(
  engine: EngineId,
  label: string,
  engineWeight: number,
  factors: RawFactor[],
  redFlags: string[] = []
): EngineResult {
  const totalFactorWeight = factors.reduce((sum, f) => sum + f.weight, 0);
  const weightedScore =
    totalFactorWeight === 0
      ? NEUTRAL_SCORE
      : factors.reduce((sum, f) => sum + (f.score * f.weight) / totalFactorWeight, 0);
  const score = Math.round(clamp(weightedScore, 0, 100) * 10) / 10;
  const confidencePercent = Math.round(
    (factors.filter((f) => f.hasData).length / factors.length) * 100
  );

  return {
    engine,
    label,
    weight: engineWeight,
    score,
    contribution: Math.round(((score / 100) * engineWeight) * 10) / 10,
    confidencePercent,
    redFlags,
    factors: factors.map(({ id, label: factorLabel, weight, score: factorScore, finding }) => ({
      id,
      label: factorLabel,
      weight,
      score: factorScore,
      finding,
    })),
  };
}

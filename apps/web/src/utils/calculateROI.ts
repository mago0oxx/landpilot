import {
  DEFAULT_CONSTRUCTION_COST_PER_SQFT,
  DEFAULT_EXIT_VALUE_MULTIPLIER,
  DEFAULT_ZONING_ALLOWED_UNITS,
} from "@/features/analyze/services/engines/defaults";
import { LandAnalysisInput } from "@/features/analyze/types/property";

/** Default assumed size of a single residential unit when the investor has not provided one. */
export const DEFAULT_AVG_UNIT_SIZE_SQFT = 1200;

export interface RoiInputs {
  purchasePrice: number;
  constructionCostPerSqft: number;
  buildableUnits: number;
  avgUnitSizeSqft?: number;
  exitValue: number;
}

export function calculateBuildableSqft(inputs: Pick<RoiInputs, "buildableUnits" | "avgUnitSizeSqft">): number {
  return inputs.buildableUnits * (inputs.avgUnitSizeSqft ?? DEFAULT_AVG_UNIT_SIZE_SQFT);
}

export function calculateTotalInvestment(inputs: RoiInputs): number {
  const buildableSqft = calculateBuildableSqft(inputs);
  return inputs.purchasePrice + inputs.constructionCostPerSqft * buildableSqft;
}

export function calculateROI(inputs: RoiInputs): number {
  const totalInvestment = calculateTotalInvestment(inputs);
  if (totalInvestment <= 0) return 0;
  return ((inputs.exitValue - totalInvestment) / totalInvestment) * 100;
}

export function calculateProfitMargin(inputs: RoiInputs): number {
  return inputs.exitValue - calculateTotalInvestment(inputs);
}

/** Shared mapping from the full analysis input to the ROI inputs, used by both
 * Financial Intelligence (FI-01/FI-02) and the API route (LandAnalysis.estimatedRoi).
 * Falls back to documented defaults (defaults.ts) for fields the investor left unresearched,
 * so an analysis submitted with just an address and asking price still produces a score.
 *
 * Construction cost is only assumed when the investor signaled build intent (either
 * zoningAllowedUnits or estimatedConstructionCostPerSqft was provided) — otherwise the
 * default scenario is a land-only resale/hold, not a phantom construction budget nobody asked for. */
export function roiInputsFromAnalysis(input: LandAnalysisInput): RoiInputs {
  const hasDevelopmentIntent =
    input.development.zoningAllowedUnits !== undefined || input.development.estimatedConstructionCostPerSqft !== undefined;

  const exitValue =
    input.financial.projectedExitValue ?? input.property.askingPrice * DEFAULT_EXIT_VALUE_MULTIPLIER;

  return {
    purchasePrice: input.property.askingPrice,
    constructionCostPerSqft: hasDevelopmentIntent
      ? (input.development.estimatedConstructionCostPerSqft ?? DEFAULT_CONSTRUCTION_COST_PER_SQFT)
      : 0,
    buildableUnits: hasDevelopmentIntent ? (input.development.zoningAllowedUnits ?? DEFAULT_ZONING_ALLOWED_UNITS) : 0,
    avgUnitSizeSqft: input.development.avgUnitSizeSqft,
    exitValue,
  };
}

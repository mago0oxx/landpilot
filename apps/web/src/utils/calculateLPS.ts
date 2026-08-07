import { evaluateDecision } from "@/features/analyze/services/engines/decision";
import { evaluateDevelopment } from "@/features/analyze/services/engines/development";
import { evaluateEnvironmental } from "@/features/analyze/services/engines/environmental";
import { evaluateFinancial } from "@/features/analyze/services/engines/financial";
import { evaluateInfrastructure } from "@/features/analyze/services/engines/infrastructure";
import { evaluateLegal } from "@/features/analyze/services/engines/legal";
import { evaluateLocation } from "@/features/analyze/services/engines/location";
import { evaluateMarket } from "@/features/analyze/services/engines/market";
import { LandAnalysisInput } from "@/features/analyze/types/property";
import { LPSResult } from "@/features/analyze/types/scoring";

/**
 * Public entry point for the LPS Engine (docs/architecture/LPS-ENGINE.md).
 * Runs the 7 scored Intelligence Engines and aggregates them via Decision Intelligence.
 */
export function calculateLPS(input: LandAnalysisInput): LPSResult {
  const engines = [
    evaluateLocation(input),
    evaluateDevelopment(input),
    evaluateFinancial(input),
    evaluateEnvironmental(input),
    evaluateMarket(input),
    evaluateLegal(input),
    evaluateInfrastructure(input),
  ];

  return evaluateDecision(engines);
}

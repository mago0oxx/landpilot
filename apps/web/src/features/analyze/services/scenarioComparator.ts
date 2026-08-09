import {
  calculateBuildableSqft,
  calculateProfitMargin,
  calculateROI,
  calculateTotalInvestment,
} from "@/utils/calculateROI";
import { LandAnalysisInput } from "../types/property";
import { ScenarioResult } from "../types/scenario";
import {
  DEFAULT_CONSTRUCTION_COST_PER_SQFT,
  DEFAULT_EXIT_VALUE_MULTIPLIER,
  DEFAULT_MONTHLY_RENT_PER_UNIT,
  DEFAULT_OPERATING_EXPENSE_RATIO,
  DEFAULT_SALE_PRICE_PER_SQFT,
} from "./engines/defaults";

interface ScenarioDefinition {
  id: string;
  label: string;
  units: number;
  exitStrategy: ScenarioResult["exitStrategy"];
}

const SCENARIO_DEFINITIONS: ScenarioDefinition[] = [
  { id: "as-is", label: "Sell as-is (no construction)", units: 0, exitStrategy: null },
  { id: "single-sell", label: "Single-family home — build and sell", units: 1, exitStrategy: "sell" },
  { id: "single-rent", label: "Single-family home — build and rent", units: 1, exitStrategy: "rent" },
  { id: "duplex-sell", label: "Duplex — build and sell", units: 2, exitStrategy: "sell" },
  { id: "duplex-rent", label: "Duplex — build and rent", units: 2, exitStrategy: "rent" },
  { id: "triplex-sell", label: "Triplex — build and sell", units: 3, exitStrategy: "sell" },
  { id: "triplex-rent", label: "Triplex — build and rent", units: 3, exitStrategy: "rent" },
];

/**
 * Compares fixed build/exit strategies on the same lot ("Highest and Best Use") instead of
 * scoring a single fixed assumption. Legal/zoning gates which scenarios are even viable —
 * we never silently score a scenario the real zoning data rules out, we flag it instead.
 */
export function computeScenarios(input: LandAnalysisInput): ScenarioResult[] {
  const { development, financial, property } = input;
  const maxAllowedUnits = development.zoningAllowedUnits;
  const constructionCostPerSqft = development.estimatedConstructionCostPerSqft ?? DEFAULT_CONSTRUCTION_COST_PER_SQFT;
  const salePricePerSqft = financial.areaAvgPricePerSqft ?? financial.estimatedMarketValue ?? DEFAULT_SALE_PRICE_PER_SQFT;

  return SCENARIO_DEFINITIONS.map((def) => {
    const { viable, viabilityNote } = checkViability(def.units, maxAllowedUnits);

    if (def.id === "as-is") {
      const roiInputs = {
        purchasePrice: property.askingPrice,
        constructionCostPerSqft: 0,
        buildableUnits: 0,
        exitValue: financial.projectedExitValue ?? property.askingPrice * DEFAULT_EXIT_VALUE_MULTIPLIER,
      };
      return buildResult(def, true, undefined, calculateTotalInvestment(roiInputs), calculateROI(roiInputs), calculateProfitMargin(roiInputs));
    }

    const roiInputs = {
      purchasePrice: property.askingPrice,
      constructionCostPerSqft,
      buildableUnits: def.units,
      avgUnitSizeSqft: development.avgUnitSizeSqft,
      exitValue: 0,
    };
    const totalInvestment = calculateTotalInvestment(roiInputs);

    if (def.exitStrategy === "sell") {
      const buildableSqft = calculateBuildableSqft(roiInputs);
      const exitValue = buildableSqft * salePricePerSqft;
      const roi = calculateROI({ ...roiInputs, exitValue });
      const profit = calculateProfitMargin({ ...roiInputs, exitValue });
      return buildResult(def, viable, viabilityNote, totalInvestment, roi, profit);
    }

    // Rent: an ongoing annual cash-on-cash return, not a one-time sale ROI.
    const monthlyRentPerUnit = financial.projectedAnnualRentalIncome
      ? financial.projectedAnnualRentalIncome / def.units / 12
      : DEFAULT_MONTHLY_RENT_PER_UNIT;
    const annualNetIncome = def.units * monthlyRentPerUnit * 12 * (1 - DEFAULT_OPERATING_EXPENSE_RATIO);
    const annualRoiPercent = totalInvestment > 0 ? (annualNetIncome / totalInvestment) * 100 : 0;
    return buildResult(def, viable, viabilityNote, totalInvestment, annualRoiPercent, annualNetIncome);
  });
}

function checkViability(units: number, maxAllowedUnits?: number): { viable: boolean; viabilityNote?: string } {
  if (units === 0) return { viable: true };
  if (maxAllowedUnits === undefined) {
    return { viable: true, viabilityNote: "Density not verified against actual zoning — confirm with the county." };
  }
  if (units > maxAllowedUnits) {
    return { viable: false, viabilityNote: `Exceeds the zoning-allowed density (max ${maxAllowedUnits} unit(s)).` };
  }
  return { viable: true };
}

function buildResult(
  def: ScenarioDefinition,
  viable: boolean,
  viabilityNote: string | undefined,
  totalInvestment: number,
  roiPercent: number,
  profitOrAnnualIncome: number
): ScenarioResult {
  return {
    id: def.id,
    label: def.label,
    units: def.units,
    exitStrategy: def.exitStrategy,
    viable,
    viabilityNote,
    roiPercent: Math.round(roiPercent * 10) / 10,
    totalInvestment: Math.round(totalInvestment),
    profitOrAnnualIncome: Math.round(profitOrAnnualIncome),
  };
}

/** Best viable "sell" and "rent" scenario, ranked separately since they're not comparable numbers. */
export function pickBestScenarios(scenarios: ScenarioResult[]): {
  bestSell: ScenarioResult | null;
  bestRent: ScenarioResult | null;
} {
  const viable = scenarios.filter((s) => s.viable);
  const bestSell = viable.filter((s) => s.exitStrategy === "sell").sort((a, b) => b.roiPercent - a.roiPercent)[0] ?? null;
  const bestRent = viable.filter((s) => s.exitStrategy === "rent").sort((a, b) => b.roiPercent - a.roiPercent)[0] ?? null;
  return { bestSell, bestRent };
}

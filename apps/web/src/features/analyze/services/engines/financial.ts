import { calculateProfitMargin, calculateROI, calculateTotalInvestment, roiInputsFromAnalysis } from "@/utils/calculateROI";
import { LandAnalysisInput } from "../../types/property";
import { EngineResult } from "../../types/scoring";
import { DEFAULT_LOT_SIZE_SQFT } from "./defaults";
import { RawFactor, buildEngineResult, inverseLinearScore, linearScore, NEUTRAL_SCORE } from "./scoreHelpers";

/**
 * Financial Intelligence (weight 250 / docs/engines/financial-intelligence.md)
 * FI-01 (Estimated ROI) is the dominant factor — this is what lets a high-ROI,
 * modestly-located lot outscore a low-ROI, prestigiously-located one (CTO Decision #008).
 */
export function evaluateFinancial(input: LandAnalysisInput): EngineResult {
  const financial = input.financial;
  const redFlags: string[] = [];

  const roiInputs = roiInputsFromAnalysis(input);

  const totalInvestment = calculateTotalInvestment(roiInputs);
  const roi = calculateROI(roiInputs);
  const profitMargin = calculateProfitMargin(roiInputs);
  const marginRatio = totalInvestment > 0 ? (profitMargin / totalInvestment) * 100 : 0;

  // ROI/margin are only as reliable as the underlying inputs — if construction cost, density,
  // or exit value were defaulted rather than researched, mark these factors low-confidence.
  const roiHasRealData =
    input.development.zoningAllowedUnits !== undefined &&
    input.development.estimatedConstructionCostPerSqft !== undefined &&
    input.financial.projectedExitValue !== undefined;

  if (roi < 0) {
    redFlags.push("Projected ROI is negative.");
  }

  const factors: RawFactor[] = [
    {
      id: "FI-01",
      label: "Estimated ROI",
      weight: 40,
      hasData: roiHasRealData,
      score: linearScore(roi, 0, 30),
      finding: roiHasRealData
        ? `Estimated ROI of ${roi.toFixed(1)}% (total investment $${totalInvestment.toLocaleString()}).`
        : `Estimated ROI of ${roi.toFixed(1)}% using default construction cost/density/exit value assumptions — provide real figures for an accurate score.`,
    },
    {
      id: "FI-02",
      label: "Profit Margin",
      weight: 20,
      hasData: roiHasRealData,
      score: linearScore(marginRatio, 0, 40),
      finding: roiHasRealData
        ? `Projected profit margin of $${profitMargin.toLocaleString()} (${marginRatio.toFixed(1)}% of investment).`
        : `Projected profit margin of $${profitMargin.toLocaleString()} based on default assumptions.`,
    },
    {
      id: "FI-03",
      label: "Purchase Price vs Market Value",
      weight: 15,
      hasData: financial.estimatedMarketValue !== undefined,
      score:
        financial.estimatedMarketValue !== undefined
          ? inverseLinearScore(input.property.askingPrice / financial.estimatedMarketValue, 0.8, 1.2)
          : NEUTRAL_SCORE,
      finding:
        financial.estimatedMarketValue !== undefined
          ? `Asking price of $${input.property.askingPrice.toLocaleString()} vs estimated market value of $${financial.estimatedMarketValue.toLocaleString()}.`
          : "No estimated market value provided.",
    },
    {
      id: "FI-04",
      label: "Cap Rate / Cash Flow Potential",
      weight: 10,
      hasData: financial.projectedAnnualRentalIncome !== undefined,
      score:
        financial.projectedAnnualRentalIncome !== undefined && totalInvestment > 0
          ? linearScore((financial.projectedAnnualRentalIncome / totalInvestment) * 100, 0, 10)
          : NEUTRAL_SCORE,
      finding:
        financial.projectedAnnualRentalIncome !== undefined
          ? `Projected annual rental income of $${financial.projectedAnnualRentalIncome.toLocaleString()}.`
          : "No rental income projection provided (flip/build-to-sell strategy assumed).",
    },
    {
      id: "FI-05",
      label: "Financing Feasibility",
      weight: 8,
      hasData: financial.downPaymentPercent !== undefined || financial.maxLoanToCostPercent !== undefined,
      score: financingFeasibilityScore(financial.downPaymentPercent, financial.maxLoanToCostPercent),
      finding:
        financial.downPaymentPercent !== undefined || financial.maxLoanToCostPercent !== undefined
          ? `Down payment ${financial.downPaymentPercent ?? "N/A"}%, max loan-to-cost ${financial.maxLoanToCostPercent ?? "N/A"}%.`
          : "No financing terms provided.",
    },
    {
      id: "FI-06",
      label: "Price per Sqft vs Area Average",
      weight: 7,
      hasData: financial.areaAvgPricePerSqft !== undefined,
      score:
        financial.areaAvgPricePerSqft !== undefined
          ? inverseLinearScore(
              input.property.askingPrice / (input.property.lotSizeSqft ?? DEFAULT_LOT_SIZE_SQFT) / financial.areaAvgPricePerSqft,
              0.7,
              1.3
            )
          : NEUTRAL_SCORE,
      finding:
        financial.areaAvgPricePerSqft !== undefined
          ? `Deal price of $${(input.property.askingPrice / (input.property.lotSizeSqft ?? DEFAULT_LOT_SIZE_SQFT)).toFixed(2)}/sqft vs area average of $${financial.areaAvgPricePerSqft}/sqft.`
          : "No area average price per sqft provided.",
    },
  ];

  return buildEngineResult("financial", "Financial Intelligence", 250, factors, redFlags);
}

function financingFeasibilityScore(downPaymentPercent?: number, maxLoanToCostPercent?: number): number {
  const scores: number[] = [];
  if (downPaymentPercent !== undefined) scores.push(inverseLinearScore(downPaymentPercent, 10, 40));
  if (maxLoanToCostPercent !== undefined) scores.push(linearScore(maxLoanToCostPercent, 50, 90));
  if (scores.length === 0) return NEUTRAL_SCORE;
  return scores.reduce((s, v) => s + v, 0) / scores.length;
}

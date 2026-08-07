import { LandAnalysisInput } from "../../types/property";
import { EngineResult } from "../../types/scoring";
import { DEFAULT_CONSTRUCTION_COST_PER_SQFT, DEFAULT_LOT_SIZE_SQFT, DEFAULT_ZONING_ALLOWED_UNITS } from "./defaults";
import { RawFactor, buildEngineResult, clamp, inverseLinearScore, linearScore, NEUTRAL_SCORE } from "./scoreHelpers";

/**
 * Development Intelligence (weight 180 / docs/engines/development-intelligence.md)
 * DV-01 (Zoning Allowed Density) is the factor that lets a duplex/triplex-feasible lot
 * outscore a single-family lot, per CTO Decision #008.
 */
export function evaluateDevelopment(input: LandAnalysisInput): EngineResult {
  const dev = input.development;
  const redFlags: string[] = [];

  const zoningAllowedUnits = dev.zoningAllowedUnits ?? DEFAULT_ZONING_ALLOWED_UNITS;
  const zoningHasData = dev.zoningAllowedUnits !== undefined;
  const densityScore = clamp(40 + (zoningAllowedUnits - 1) * 20, 40, 100);

  let buildableAreaScore = NEUTRAL_SCORE;
  let buildableAreaHasData = false;
  if (dev.minLotAreaPerUnitSqft !== undefined) {
    const lotSizeSqft = input.property.lotSizeSqft ?? DEFAULT_LOT_SIZE_SQFT;
    const requiredArea = dev.minLotAreaPerUnitSqft * zoningAllowedUnits;
    const ratio = requiredArea > 0 ? lotSizeSqft / requiredArea : 1;
    buildableAreaScore = linearScore(ratio, 1, 1.5);
    buildableAreaHasData = true;
    if (ratio < 1) {
      redFlags.push("Lot area may be insufficient for the zoned density after setbacks.");
    }
  }

  const estimatedConstructionCostPerSqft = dev.estimatedConstructionCostPerSqft ?? DEFAULT_CONSTRUCTION_COST_PER_SQFT;
  let costEfficiencyScore = NEUTRAL_SCORE;
  const costEfficiencyHasData =
    dev.regionalAvgConstructionCostPerSqft !== undefined && dev.estimatedConstructionCostPerSqft !== undefined;
  if (dev.regionalAvgConstructionCostPerSqft !== undefined) {
    const ratio = estimatedConstructionCostPerSqft / dev.regionalAvgConstructionCostPerSqft;
    costEfficiencyScore = inverseLinearScore(ratio, 0.7, 1.3);
  }

  const monthsHasData = dev.estimatedPermitMonths !== undefined;
  const countHasData = dev.requiredPermitsCount !== undefined;
  let permittingScore = NEUTRAL_SCORE;
  if (monthsHasData || countHasData) {
    const monthsScore = monthsHasData ? inverseLinearScore(dev.estimatedPermitMonths!, 1, 12) : NEUTRAL_SCORE;
    const countScore = countHasData ? inverseLinearScore(dev.requiredPermitsCount!, 1, 8) : NEUTRAL_SCORE;
    const parts = [monthsHasData ? monthsScore : null, countHasData ? countScore : null].filter(
      (v): v is number => v !== null
    );
    permittingScore = parts.reduce((s, v) => s + v, 0) / parts.length;
  }

  const factors: RawFactor[] = [
    {
      id: "DV-01",
      label: "Zoning Allowed Density",
      weight: 30,
      hasData: zoningHasData,
      score: densityScore,
      finding: zoningHasData
        ? `Zoning allows up to ${zoningAllowedUnits} unit(s).`
        : `No zoning density provided — assuming ${DEFAULT_ZONING_ALLOWED_UNITS} unit(s) (single-family default).`,
    },
    {
      id: "DV-02",
      label: "Buildable Area Sufficiency",
      weight: 25,
      hasData: buildableAreaHasData,
      score: buildableAreaScore,
      finding: buildableAreaHasData
        ? `Lot size checked against minimum area required for ${zoningAllowedUnits} unit(s).`
        : "No minimum lot area per unit provided.",
    },
    {
      id: "DV-03",
      label: "Construction Cost Efficiency",
      weight: 25,
      hasData: costEfficiencyHasData,
      score: costEfficiencyScore,
      finding: costEfficiencyHasData
        ? `Estimated construction cost of $${estimatedConstructionCostPerSqft}/sqft vs regional average of $${dev.regionalAvgConstructionCostPerSqft}/sqft.`
        : "No regional average construction cost provided for comparison.",
    },
    {
      id: "DV-04",
      label: "Permitting Complexity",
      weight: 20,
      hasData: monthsHasData || countHasData,
      score: permittingScore,
      finding:
        monthsHasData || countHasData
          ? `Estimated permitting timeline of ${dev.estimatedPermitMonths ?? "N/A"} month(s) across ${dev.requiredPermitsCount ?? "N/A"} permit(s).`
          : "No permitting timeline data provided.",
    },
  ];

  return buildEngineResult("development", "Development Intelligence", 180, factors, redFlags);
}

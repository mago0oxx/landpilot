import { LandAnalysisInput } from "../../types/property";
import { EngineResult } from "../../types/scoring";
import { RawFactor, buildEngineResult, inverseLinearScore, linearScore, NEUTRAL_SCORE } from "./scoreHelpers";

/**
 * Location Intelligence (weight 180 / docs/engines/location-intelligence.md)
 * LI-07 (Neighborhood Quality), LI-09 (Residential Demand) and LI-10 (Overall Desirability)
 * are composite/derived indicators per the engine's "no subjective opinions" principle —
 * they are not captured as separate manual inputs, so they are not scored factors here.
 */
export function evaluateLocation(input: LandAnalysisInput): EngineResult {
  const location = input.location;

  const factors: RawFactor[] = [
    {
      id: "LI-01",
      label: "Population Growth",
      weight: 12,
      hasData: location.populationGrowthRatePercent !== undefined,
      score:
        location.populationGrowthRatePercent !== undefined
          ? linearScore(location.populationGrowthRatePercent, 0, 3)
          : NEUTRAL_SCORE,
      finding:
        location.populationGrowthRatePercent !== undefined
          ? `Annual population growth of ${location.populationGrowthRatePercent}%.`
          : "No population growth data provided.",
    },
    {
      id: "LI-02",
      label: "Employment Growth",
      weight: 10,
      hasData: location.employmentGrowthRatePercent !== undefined,
      score:
        location.employmentGrowthRatePercent !== undefined
          ? linearScore(location.employmentGrowthRatePercent, 0, 3)
          : NEUTRAL_SCORE,
      finding:
        location.employmentGrowthRatePercent !== undefined
          ? `Annual employment growth of ${location.employmentGrowthRatePercent}%.`
          : "No employment growth data provided.",
    },
    {
      id: "LI-03",
      label: "School Quality",
      weight: 13,
      hasData: location.schoolRating !== undefined,
      score:
        location.schoolRating !== undefined
          ? linearScore(location.schoolRating, 1, 10)
          : NEUTRAL_SCORE,
      finding:
        location.schoolRating !== undefined
          ? `School rating of ${location.schoolRating}/10.`
          : "No school rating provided.",
    },
    {
      id: "LI-04",
      label: "Crime Rate",
      weight: 35,
      hasData: location.crimeIndex !== undefined,
      score:
        location.crimeIndex !== undefined
          ? inverseLinearScore(location.crimeIndex, 0, 200)
          : NEUTRAL_SCORE,
      finding:
        location.crimeIndex !== undefined
          ? `Crime index of ${location.crimeIndex} (100 = national average).`
          : "No crime index provided.",
    },
    {
      id: "LI-05",
      label: "Accessibility",
      weight: 12,
      hasData: location.walkScore !== undefined,
      score: location.walkScore !== undefined ? clampWalkScore(location.walkScore) : NEUTRAL_SCORE,
      finding:
        location.walkScore !== undefined
          ? `Walk Score of ${location.walkScore}/100.`
          : "No accessibility score provided.",
    },
    {
      id: "LI-06",
      label: "Nearby Services",
      weight: 10,
      hasData: location.nearbyAmenitiesCount !== undefined,
      score:
        location.nearbyAmenitiesCount !== undefined
          ? linearScore(location.nearbyAmenitiesCount, 0, 20)
          : NEUTRAL_SCORE,
      finding:
        location.nearbyAmenitiesCount !== undefined
          ? `${location.nearbyAmenitiesCount} amenities within the researched radius.`
          : "No nearby services count provided.",
    },
    {
      id: "LI-08",
      label: "Future Development",
      weight: 8,
      hasData: location.plannedDevelopmentProjectsCount !== undefined,
      score:
        location.plannedDevelopmentProjectsCount !== undefined
          ? linearScore(location.plannedDevelopmentProjectsCount, 0, 5)
          : NEUTRAL_SCORE,
      finding:
        location.plannedDevelopmentProjectsCount !== undefined
          ? `${location.plannedDevelopmentProjectsCount} planned development projects nearby.`
          : "No future development data provided.",
    },
  ];

  return buildEngineResult("location", "Location Intelligence", 180, factors);
}

function clampWalkScore(value: number): number {
  return Math.min(100, Math.max(0, value));
}

import { LandAnalysisInput } from "../../types/property";
import { EngineResult } from "../../types/scoring";
import { RawFactor, boolScore, buildEngineResult } from "./scoreHelpers";

/** Infrastructure Intelligence (weight 80 / docs/engines/infrastructure-intelligence.md) */
export function evaluateInfrastructure(input: LandAnalysisInput): EngineResult {
  const infra = input.infrastructure;
  const redFlags: string[] = [];

  if (infra.roadFrontage === false) {
    redFlags.push("Parcel lacks legal road frontage.");
  }

  const factors: RawFactor[] = [
    {
      id: "IN-01",
      label: "Water & Sewer Access",
      weight: 30,
      hasData: infra.waterSewerAvailable !== undefined,
      score: boolScore(infra.waterSewerAvailable, 100, 0),
      finding:
        infra.waterSewerAvailable !== undefined
          ? infra.waterSewerAvailable
            ? "Public water and sewer available at the property line."
            : "Public water/sewer not available; well/septic likely required."
          : "No water/sewer data provided.",
    },
    {
      id: "IN-02",
      label: "Electricity & Utilities Access",
      weight: 25,
      hasData: infra.electricityAvailable !== undefined,
      score: boolScore(infra.electricityAvailable, 100, 0),
      finding:
        infra.electricityAvailable !== undefined
          ? infra.electricityAvailable
            ? "Electric utility service available at or near the parcel."
            : "Electric utility service not confirmed."
          : "No electricity data provided.",
    },
    {
      id: "IN-03",
      label: "Road Access & Frontage",
      weight: 25,
      hasData: infra.roadFrontage !== undefined,
      score: boolScore(infra.roadFrontage, 100, 0),
      finding:
        infra.roadFrontage !== undefined
          ? infra.roadFrontage
            ? "Parcel has legal frontage on a public or maintained road."
            : "Parcel lacks confirmed legal road frontage."
          : "No road access data provided.",
    },
    {
      id: "IN-04",
      label: "Stormwater Drainage",
      weight: 10,
      hasData: infra.stormwaterDrainageAdequate !== undefined,
      score: boolScore(infra.stormwaterDrainageAdequate, 100, 40),
      finding:
        infra.stormwaterDrainageAdequate !== undefined
          ? infra.stormwaterDrainageAdequate
            ? "Existing stormwater drainage appears adequate."
            : "Additional stormwater drainage work likely required."
          : "No stormwater drainage data provided.",
    },
    {
      id: "IN-05",
      label: "Broadband Availability",
      weight: 10,
      hasData: infra.broadbandAvailable !== undefined,
      score: boolScore(infra.broadbandAvailable, 100, 60),
      finding:
        infra.broadbandAvailable !== undefined
          ? infra.broadbandAvailable
            ? "Broadband internet service available."
            : "Broadband internet service not confirmed."
          : "No broadband data provided.",
    },
  ];

  return buildEngineResult("infrastructure", "Infrastructure Intelligence", 80, factors, redFlags);
}

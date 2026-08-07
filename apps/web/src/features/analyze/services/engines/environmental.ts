import { LandAnalysisInput } from "../../types/property";
import { EngineResult } from "../../types/scoring";
import { RawFactor, boolScore, buildEngineResult, enumScore } from "./scoreHelpers";

const FLOOD_ZONE_SCORES: Record<NonNullable<LandAnalysisInput["environmental"]["femaFloodZone"]>, number> = {
  X: 100,
  A: 50,
  AO: 40,
  AE: 20,
  VE: 0,
  OTHER: 50,
};

const HAZARD_SCORES: Record<NonNullable<LandAnalysisInput["environmental"]["naturalHazardExposure"]>, number> = {
  low: 100,
  medium: 50,
  high: 0,
};

const SOIL_SCORES: Record<NonNullable<LandAnalysisInput["environmental"]["soilQuality"]>, number> = {
  good: 100,
  fair: 60,
  poor: 20,
};

/** Environmental Intelligence (weight 120 / docs/engines/environmental-intelligence.md) */
export function evaluateEnvironmental(input: LandAnalysisInput): EngineResult {
  const env = input.environmental;
  const redFlags: string[] = [];

  if (env.femaFloodZone === "AE" || env.femaFloodZone === "VE") {
    redFlags.push(`High-risk FEMA flood zone (${env.femaFloodZone}).`);
  }
  if (env.wetlandsPresent) {
    redFlags.push("Wetlands present on parcel.");
  }

  const factors: RawFactor[] = [
    {
      id: "EI-01",
      label: "FEMA Flood Zone",
      weight: 35,
      hasData: env.femaFloodZone !== undefined,
      score: enumScore(env.femaFloodZone, FLOOD_ZONE_SCORES),
      finding: env.femaFloodZone ? `FEMA flood zone: ${env.femaFloodZone}.` : "No FEMA flood zone provided.",
    },
    {
      id: "EI-02",
      label: "Wetlands Presence",
      weight: 20,
      hasData: env.wetlandsPresent !== undefined,
      score: boolScore(env.wetlandsPresent, 0, 100),
      finding:
        env.wetlandsPresent !== undefined
          ? env.wetlandsPresent
            ? "Wetlands present on the parcel."
            : "No wetlands present."
          : "No wetlands data provided.",
    },
    {
      id: "EI-03",
      label: "Natural Hazard Exposure",
      weight: 20,
      hasData: env.naturalHazardExposure !== undefined,
      score: enumScore(env.naturalHazardExposure, HAZARD_SCORES),
      finding: env.naturalHazardExposure
        ? `Natural hazard exposure rated ${env.naturalHazardExposure}.`
        : "No natural hazard exposure data provided.",
    },
    {
      id: "EI-04",
      label: "Soil Quality",
      weight: 15,
      hasData: env.soilQuality !== undefined,
      score: enumScore(env.soilQuality, SOIL_SCORES),
      finding: env.soilQuality ? `Soil quality rated ${env.soilQuality}.` : "No soil quality data provided.",
    },
    {
      id: "EI-05",
      label: "Environmental Permitting Risk",
      weight: 10,
      hasData: env.environmentalPermitRequired !== undefined,
      score: boolScore(env.environmentalPermitRequired, 30, 100),
      finding:
        env.environmentalPermitRequired !== undefined
          ? env.environmentalPermitRequired
            ? "Additional environmental permitting expected."
            : "No additional environmental permitting expected."
          : "No environmental permitting data provided.",
    },
  ];

  return buildEngineResult("environmental", "Environmental Intelligence", 120, factors, redFlags);
}

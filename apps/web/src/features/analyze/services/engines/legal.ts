import { LandAnalysisInput } from "../../types/property";
import { EngineResult } from "../../types/scoring";
import { RawFactor, boolScore, buildEngineResult } from "./scoreHelpers";

/** Legal Intelligence (weight 90 / docs/engines/legal-intelligence.md) */
export function evaluateLegal(input: LandAnalysisInput): EngineResult {
  const legal = input.legal;
  const redFlags: string[] = [];

  if (legal.titleIssues) {
    redFlags.push("Unresolved title issues or liens.");
  }
  if (legal.zoningCompliant === false) {
    redFlags.push("Intended use is not zoning-compliant.");
  }

  const factors: RawFactor[] = [
    {
      id: "LG-01",
      label: "Zoning Compliance",
      weight: 30,
      hasData: legal.zoningCompliant !== undefined,
      score: boolScore(legal.zoningCompliant, 100, 0),
      finding:
        legal.zoningCompliant !== undefined
          ? legal.zoningCompliant
            ? "Intended use conforms to current zoning."
            : "Intended use requires a variance or rezoning."
          : "No zoning compliance data provided.",
    },
    {
      id: "LG-02",
      label: "Title Issues / Liens",
      weight: 25,
      hasData: legal.titleIssues !== undefined,
      score: boolScore(legal.titleIssues, 0, 100),
      finding:
        legal.titleIssues !== undefined
          ? legal.titleIssues
            ? "Title carries liens, judgments, or ownership disputes."
            : "Title is clear."
          : "No title data provided.",
    },
    {
      id: "LG-03",
      label: "Easements & Encroachments",
      weight: 20,
      hasData: legal.easementsPresent !== undefined,
      score: boolScore(legal.easementsPresent, 40, 100),
      finding:
        legal.easementsPresent !== undefined
          ? legal.easementsPresent
            ? "Easements or encroachments identified on the parcel."
            : "No easements or encroachments identified."
          : "No easement data provided.",
    },
    {
      id: "LG-04",
      label: "HOA / Deed Restrictions",
      weight: 15,
      hasData: legal.hoaRestrictions !== undefined,
      score: boolScore(legal.hoaRestrictions, 50, 100),
      finding:
        legal.hoaRestrictions !== undefined
          ? legal.hoaRestrictions
            ? "Restrictive covenants may limit the intended development."
            : "No HOA or deed restrictions identified."
          : "No HOA/deed restriction data provided.",
    },
    {
      id: "LG-05",
      label: "Code Violation History",
      weight: 10,
      hasData: legal.openCodeViolations !== undefined,
      score: boolScore(legal.openCodeViolations, 20, 100),
      finding:
        legal.openCodeViolations !== undefined
          ? legal.openCodeViolations
            ? "Open code enforcement cases found."
            : "No open code violations found."
          : "No code violation data provided.",
    },
  ];

  return buildEngineResult("legal", "Legal Intelligence", 90, factors, redFlags);
}

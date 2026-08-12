import { PropertyLookupResult } from "@/lib/propertyLookup";

/**
 * `alert`   — a real problem that changes what the lot is worth or whether you can build.
 * `caution` — worth knowing and budgeting for, not a dealbreaker on its own.
 * `clear`   — checked against real data and came back fine.
 * `unknown` — the data source had no answer for this parcel. Deliberately NOT rendered as
 *             "clear"; telling someone a lot is fine when we simply couldn't check is the
 *             one failure mode that could actually cost them money.
 */
export type FindingStatus = "alert" | "caution" | "clear" | "unknown";

export interface Finding {
  id: string;
  label: string;
  status: FindingStatus;
  detail: string;
  /** Guide slug that explains this finding in depth, when one exists. */
  guideSlug?: string;
}

/** What a free address check genuinely cannot answer — stated plainly rather than implied. */
export const NOT_CHECKED: { label: string; detail: string; guideSlug?: string }[] = [
  {
    label: "Septic / perc test",
    detail:
      "Whether the soil will pass a percolation test can only be answered by an actual test on the lot. No public dataset has this.",
    guideSlug: "perc-test",
  },
  {
    label: "Legal road access",
    detail:
      "Recorded easements and rights-of-way live in county deed records, which aren't machine-readable. A title search is the reliable check.",
    guideSlug: "landlocked-land",
  },
  {
    label: "Zoning & permitted use",
    detail:
      "Zoning codes vary by county and change often. Confirm the parcel's code and whether a home is a permitted use with the county planning office.",
    guideSlug: "is-land-buildable",
  },
  {
    label: "Utility hookup cost",
    detail:
      "Only the utility company can quote what it costs to run power and water to this specific parcel.",
    guideSlug: "utility-costs",
  },
  {
    label: "Title, liens & deed restrictions",
    detail: "Surfaced by a title search during closing — not available from any public API.",
  },
];

function floodZoneFinding(zone: PropertyLookupResult["femaFloodZone"]): Finding {
  const base = { id: "flood-zone", label: "FEMA flood zone", guideSlug: "fema-flood-zone-ae" };

  switch (zone) {
    case "VE":
      return {
        ...base,
        status: "alert",
        detail:
          "Zone VE — high-risk coastal zone with wave action. Flood insurance is required with a federally backed mortgage, and construction has to meet elevation requirements that add real cost.",
      };
    case "AE":
      return {
        ...base,
        status: "alert",
        detail:
          "Zone AE — high-risk flood area with a defined base flood elevation. Flood insurance is required with a federally backed mortgage, and you'll likely have to build elevated.",
      };
    case "A":
    case "AO":
      return {
        ...base,
        status: "caution",
        detail: `Zone ${zone} — mapped as high-risk, but FEMA hasn't published a base flood elevation here. Expect an elevation certificate to be required before you can price insurance.`,
      };
    case "X":
      return {
        ...base,
        status: "clear",
        detail: "Zone X — outside the mapped 100-year floodplain. Flood insurance isn't federally required.",
      };
    case "OTHER":
      return {
        ...base,
        status: "caution",
        detail: "FEMA maps this parcel in a zone outside the common categories. Worth confirming with the county floodplain administrator.",
      };
    default:
      return {
        ...base,
        status: "unknown",
        detail: "FEMA's flood layer returned no zone for this location — often means the address didn't resolve to a mapped parcel.",
      };
  }
}

function wetlandsFinding(present: boolean | null): Finding {
  const base = { id: "wetlands", label: "Wetlands" };
  if (present === true) {
    return {
      ...base,
      status: "alert",
      detail:
        "The USFWS National Wetlands Inventory maps wetlands on or touching this parcel. Building on or filling wetlands needs a federal permit and can shrink your usable area well below the acreage on the deed.",
    };
  }
  if (present === false) {
    return { ...base, status: "clear", detail: "No mapped wetlands on this parcel in the USFWS National Wetlands Inventory." };
  }
  return { ...base, status: "unknown", detail: "The wetlands inventory returned no data for this location." };
}

/**
 * Never escalates past `caution`, even at "high". The National Risk Index is a *county-level*
 * rating, so it says nothing specific about this parcel — and in coastal states it reads high
 * almost everywhere. Rendering that as a red alert would put a warning banner on nearly every
 * Florida result, which trains people to ignore the banner that actually matters.
 */
function hazardFinding(exposure: PropertyLookupResult["naturalHazardExposure"]): Finding {
  const base = { id: "hazard", label: "County natural hazard rating" };
  switch (exposure) {
    case "high":
      return {
        ...base,
        status: "caution",
        detail:
          "FEMA's National Risk Index rates this county high for natural hazard risk. That's a county-wide figure, not a reading on this parcel — but it does tend to show up in insurance pricing.",
      };
    case "medium":
      return {
        ...base,
        status: "clear",
        detail: "FEMA's National Risk Index rates this county medium for natural hazard risk — around the national middle.",
      };
    case "low":
      return { ...base, status: "clear", detail: "FEMA's National Risk Index rates this county low for natural hazard risk." };
    default:
      return { ...base, status: "unknown", detail: "No FEMA National Risk Index rating available for this county." };
  }
}

function growthFinding(population: number | null, employment: number | null): Finding {
  const base = { id: "growth", label: "County population & jobs" };

  if (population === null && employment === null) {
    return { ...base, status: "unknown", detail: "Census ACS growth data isn't available for this county." };
  }

  const parts: string[] = [];
  if (population !== null) parts.push(`population ${population >= 0 ? "+" : ""}${population.toFixed(1)}%`);
  if (employment !== null) parts.push(`employment ${employment >= 0 ? "+" : ""}${employment.toFixed(1)}%`);
  const summary = `Census ACS: ${parts.join(", ")}.`;

  // Land in a shrinking county is the classic trap — cheap to buy, very hard to resell.
  if ((population ?? 0) < 0) {
    return {
      ...base,
      status: "caution",
      detail: `${summary} A shrinking county usually means thin resale demand, which matters more for land than for houses.`,
    };
  }

  return { ...base, status: "clear", detail: `${summary} Demand in the area is holding up or growing.` };
}

function amenitiesFinding(count: number | null): Finding {
  const base = { id: "amenities", label: "Nearby services" };
  if (count === null) {
    return { ...base, status: "unknown", detail: "Couldn't check what's around this parcel." };
  }
  if (count === 0) {
    return {
      ...base,
      status: "caution",
      detail:
        "No shops, schools, or services mapped within the search radius. That can be exactly what you want in rural land — just know it going in.",
    };
  }
  return {
    ...base,
    status: "clear",
    detail: `${count} mapped services (shops, schools, healthcare) within the surrounding area.`,
  };
}

/**
 * Turns a raw lookup into buyer-facing findings. Every finding here is backed by a real
 * government or GIS source — no scoring, no assumptions. The full 1000-point LPS Score
 * needs the buyer's own numbers (asking price, lot size, intent) and lives behind signup.
 */
export function buildFindings(lookup: PropertyLookupResult): Finding[] {
  return [
    floodZoneFinding(lookup.femaFloodZone),
    wetlandsFinding(lookup.wetlandsPresent),
    hazardFinding(lookup.naturalHazardExposure),
    growthFinding(lookup.populationGrowthRatePercent, lookup.employmentGrowthRatePercent),
    amenitiesFinding(lookup.nearbyAmenitiesCount),
  ];
}

export function countByStatus(findings: Finding[], status: FindingStatus): number {
  return findings.filter((f) => f.status === status).length;
}

/** One-line verdict for the top of the result page — deliberately not a score. */
export function headlineFor(findings: Finding[]): { title: string; tone: FindingStatus } {
  const alerts = countByStatus(findings, "alert");
  const cautions = countByStatus(findings, "caution");

  if (alerts > 0) {
    return {
      title: `${alerts} thing${alerts === 1 ? "" : "s"} here you need to look at before you make an offer`,
      tone: "alert",
    };
  }
  if (cautions > 0) {
    return {
      title: `${cautions} thing${cautions === 1 ? "" : "s"} worth budgeting for on this lot`,
      tone: "caution",
    };
  }
  return { title: "Nothing alarming in the public records for this parcel", tone: "clear" };
}

import { EngineId } from "../../types/scoring";
import { LandAnalysisInput } from "../../types/property";

export type FactorFieldType = "number" | "boolean" | "enum";

export interface FactorFieldOption {
  value: string;
  label: string;
}

export interface FactorFieldDef {
  /** Dot path into LandAnalysisInput, e.g. "location.populationGrowthRatePercent". */
  path: string;
  label: string;
  type: FactorFieldType;
  /** Which factor(s) this fills in, for display context (e.g. "LI-01"). */
  factorId: string;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  options?: FactorFieldOption[];
}

/**
 * Every optional input field, grouped by the engine it belongs to — used to build the
 * "fill in missing data and recalculate" form on the analysis result page. Only fields that
 * are genuinely undefined in the stored analysis are ever shown (see getMissingFieldsForEngine).
 *
 * A few factors (e.g. FI-01/FI-02's ROI inputs) also depend on fields owned by a different
 * engine (Development's zoning/construction cost) — those are edited from that engine's own
 * card instead of being duplicated here, since each field has exactly one home.
 */
export const ENGINE_FIELDS: Record<EngineId, FactorFieldDef[]> = {
  location: [
    { path: "location.populationGrowthRatePercent", label: "Population Growth", type: "number", factorId: "LI-01", suffix: "%", step: 0.1 },
    { path: "location.employmentGrowthRatePercent", label: "Employment Growth", type: "number", factorId: "LI-02", suffix: "%", step: 0.1 },
    { path: "location.schoolRating", label: "School Rating", type: "number", factorId: "LI-03", min: 1, max: 10, suffix: "/10" },
    { path: "location.crimeIndex", label: "Crime Index", type: "number", factorId: "LI-04", min: 0, max: 300, suffix: "(100 = national avg)" },
    { path: "location.walkScore", label: "Walk Score", type: "number", factorId: "LI-05", min: 0, max: 100, suffix: "/100" },
    { path: "location.nearbyAmenitiesCount", label: "Nearby Amenities Count", type: "number", factorId: "LI-06", min: 0 },
    { path: "location.plannedDevelopmentProjectsCount", label: "Planned Development Projects", type: "number", factorId: "LI-08", min: 0 },
  ],
  development: [
    { path: "development.zoningAllowedUnits", label: "Zoning Allowed Units", type: "number", factorId: "DV-01", min: 1, step: 1 },
    { path: "development.minLotAreaPerUnitSqft", label: "Min Lot Area per Unit", type: "number", factorId: "DV-02", min: 0, suffix: "sqft" },
    { path: "development.estimatedConstructionCostPerSqft", label: "Estimated Construction Cost", type: "number", factorId: "DV-03", min: 0, suffix: "$/sqft" },
    { path: "development.regionalAvgConstructionCostPerSqft", label: "Regional Avg Construction Cost", type: "number", factorId: "DV-03", min: 0, suffix: "$/sqft" },
    { path: "development.estimatedPermitMonths", label: "Estimated Permit Timeline", type: "number", factorId: "DV-04", min: 0, suffix: "months" },
    { path: "development.requiredPermitsCount", label: "Required Permits", type: "number", factorId: "DV-04", min: 0 },
  ],
  financial: [
    { path: "financial.estimatedMarketValue", label: "Estimated Market Value", type: "number", factorId: "FI-03", min: 0, suffix: "$" },
    { path: "financial.projectedExitValue", label: "Projected Exit Value", type: "number", factorId: "FI-01", min: 0, suffix: "$" },
    { path: "financial.projectedAnnualRentalIncome", label: "Projected Annual Rental Income", type: "number", factorId: "FI-04", min: 0, suffix: "$/yr" },
    { path: "financial.downPaymentPercent", label: "Down Payment", type: "number", factorId: "FI-05", min: 0, max: 100, suffix: "%" },
    { path: "financial.maxLoanToCostPercent", label: "Max Loan-to-Cost", type: "number", factorId: "FI-05", min: 0, max: 100, suffix: "%" },
    { path: "financial.areaAvgPricePerSqft", label: "Area Average Price per Sqft", type: "number", factorId: "FI-06", min: 0, suffix: "$/sqft" },
  ],
  environmental: [
    {
      path: "environmental.femaFloodZone",
      label: "FEMA Flood Zone",
      type: "enum",
      factorId: "EI-01",
      options: ["X", "A", "AE", "VE", "AO", "OTHER"].map((v) => ({ value: v, label: v })),
    },
    { path: "environmental.wetlandsPresent", label: "Wetlands Present", type: "boolean", factorId: "EI-02" },
    {
      path: "environmental.naturalHazardExposure",
      label: "Natural Hazard Exposure",
      type: "enum",
      factorId: "EI-03",
      options: [
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High" },
      ],
    },
    {
      path: "environmental.soilQuality",
      label: "Soil Quality",
      type: "enum",
      factorId: "EI-04",
      options: [
        { value: "good", label: "Good" },
        { value: "fair", label: "Fair" },
        { value: "poor", label: "Poor" },
      ],
    },
    { path: "environmental.environmentalPermitRequired", label: "Environmental Permit Required", type: "boolean", factorId: "EI-05" },
  ],
  market: [
    { path: "market.comparableSalesTrendPercent", label: "Comparable Sales Trend", type: "number", factorId: "MI-01", suffix: "%", step: 0.1 },
    { path: "market.monthsOfSupply", label: "Months of Supply", type: "number", factorId: "MI-02", min: 0 },
    { path: "market.avgDaysOnMarket", label: "Average Days on Market", type: "number", factorId: "MI-03", min: 0 },
    { path: "market.vacancyRatePercent", label: "Vacancy Rate", type: "number", factorId: "MI-04", min: 0, max: 100, suffix: "%" },
    { path: "market.comparablePricePerSqft", label: "Comparable Price per Sqft", type: "number", factorId: "MI-05", min: 0, suffix: "$/sqft" },
  ],
  legal: [
    { path: "legal.zoningCompliant", label: "Zoning Compliant", type: "boolean", factorId: "LG-01" },
    { path: "legal.titleIssues", label: "Title Issues / Liens", type: "boolean", factorId: "LG-02" },
    { path: "legal.easementsPresent", label: "Easements / Encroachments", type: "boolean", factorId: "LG-03" },
    { path: "legal.hoaRestrictions", label: "HOA / Deed Restrictions", type: "boolean", factorId: "LG-04" },
    { path: "legal.openCodeViolations", label: "Open Code Violations", type: "boolean", factorId: "LG-05" },
  ],
  infrastructure: [
    { path: "infrastructure.waterSewerAvailable", label: "Water & Sewer Available", type: "boolean", factorId: "IN-01" },
    { path: "infrastructure.electricityAvailable", label: "Electricity Available", type: "boolean", factorId: "IN-02" },
    { path: "infrastructure.roadFrontage", label: "Road Frontage", type: "boolean", factorId: "IN-03" },
    { path: "infrastructure.stormwaterDrainageAdequate", label: "Stormwater Drainage Adequate", type: "boolean", factorId: "IN-04" },
    { path: "infrastructure.broadbandAvailable", label: "Broadband Available", type: "boolean", factorId: "IN-05" },
  ],
};

/** All valid dot paths across every engine — the allowlist the recalculate API validates against. */
export const ALL_FIELD_PATHS = new Set(Object.values(ENGINE_FIELDS).flat().map((f) => f.path));

function getByPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object") return (acc as Record<string, unknown>)[key];
    return undefined;
  }, obj);
}

/** Fields for this engine that are currently undefined in the stored input — i.e. actually missing. */
export function getMissingFieldsForEngine(engine: EngineId, input: LandAnalysisInput): FactorFieldDef[] {
  return ENGINE_FIELDS[engine].filter((field) => getByPath(input, field.path) === undefined);
}

export function findFieldDef(path: string): FactorFieldDef | undefined {
  return Object.values(ENGINE_FIELDS)
    .flat()
    .find((f) => f.path === path);
}

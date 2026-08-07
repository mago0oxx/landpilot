import { z } from "zod";

/** Empty strings come from untouched optional inputs/selects — treat them as "not provided", not as 0 or an invalid enum value. */
const emptyToUndefined = (val: unknown) => (val === "" || val === null ? undefined : val);
function optional<T extends z.ZodTypeAny>(schema: T) {
  return z.preprocess(emptyToUndefined, schema.optional());
}

export const propertySchema = z.object({
  address: z.string().min(1, "Address is required"),
  county: optional(z.string()),
  state: z.string().min(1).default("FL"),
  parcelId: z.string().optional(),
  listingUrl: z.string().url().optional().or(z.literal("")),
  lotSizeSqft: optional(z.coerce.number().positive("Lot size must be greater than 0")),
  askingPrice: z.coerce.number().positive("Asking price must be greater than 0"),
});

export const locationSchema = z.object({
  populationGrowthRatePercent: optional(z.coerce.number()),
  employmentGrowthRatePercent: optional(z.coerce.number()),
  schoolRating: optional(z.coerce.number().min(1).max(10)),
  crimeIndex: optional(z.coerce.number().min(0).max(300)),
  walkScore: optional(z.coerce.number().min(0).max(100)),
  nearbyAmenitiesCount: optional(z.coerce.number().min(0)),
  plannedDevelopmentProjectsCount: optional(z.coerce.number().min(0)),
});

export const developmentSchema = z.object({
  zoningAllowedUnits: optional(z.coerce.number().min(1, "Must allow at least 1 unit")),
  avgUnitSizeSqft: optional(z.coerce.number().positive()),
  minLotAreaPerUnitSqft: optional(z.coerce.number().positive()),
  estimatedConstructionCostPerSqft: optional(z.coerce.number().positive()),
  regionalAvgConstructionCostPerSqft: optional(z.coerce.number().positive()),
  estimatedPermitMonths: optional(z.coerce.number().min(0)),
  requiredPermitsCount: optional(z.coerce.number().min(0)),
});

export const financialSchema = z.object({
  estimatedMarketValue: optional(z.coerce.number().positive()),
  projectedExitValue: optional(z.coerce.number().positive()),
  projectedAnnualRentalIncome: optional(z.coerce.number().min(0)),
  downPaymentPercent: optional(z.coerce.number().min(0).max(100)),
  maxLoanToCostPercent: optional(z.coerce.number().min(0).max(100)),
  areaAvgPricePerSqft: optional(z.coerce.number().positive()),
});

export const environmentalSchema = z.object({
  femaFloodZone: optional(z.enum(["X", "A", "AE", "VE", "AO", "OTHER"])),
  wetlandsPresent: z.boolean().optional(),
  naturalHazardExposure: optional(z.enum(["low", "medium", "high"])),
  soilQuality: optional(z.enum(["good", "fair", "poor"])),
  environmentalPermitRequired: z.boolean().optional(),
});

export const marketSchema = z.object({
  comparableSalesTrendPercent: optional(z.coerce.number()),
  monthsOfSupply: optional(z.coerce.number().min(0)),
  avgDaysOnMarket: optional(z.coerce.number().min(0)),
  avgMonthlyRent: optional(z.coerce.number().min(0)),
  vacancyRatePercent: optional(z.coerce.number().min(0).max(100)),
  comparablePricePerSqft: optional(z.coerce.number().positive()),
});

export const legalSchema = z.object({
  zoningCompliant: z.boolean().optional(),
  titleIssues: z.boolean().optional(),
  easementsPresent: z.boolean().optional(),
  hoaRestrictions: z.boolean().optional(),
  openCodeViolations: z.boolean().optional(),
});

export const infrastructureSchema = z.object({
  waterSewerAvailable: z.boolean().optional(),
  electricityAvailable: z.boolean().optional(),
  roadFrontage: z.boolean().optional(),
  stormwaterDrainageAdequate: z.boolean().optional(),
  broadbandAvailable: z.boolean().optional(),
});

export const analysisSchema = z.object({
  intent: z.enum(["investment", "residence"]),
  property: propertySchema,
  location: locationSchema,
  development: developmentSchema,
  financial: financialSchema,
  environmental: environmentalSchema,
  market: marketSchema,
  legal: legalSchema,
  infrastructure: infrastructureSchema,
});

/** Post-validation shape (numbers coerced, defaults applied) — what onSubmit receives and the API expects. */
export type AnalysisFormValues = z.output<typeof analysisSchema>;
/** Pre-validation shape (raw form values, e.g. numeric fields still `unknown`) — what react-hook-form tracks internally. */
export type AnalysisFormInput = z.input<typeof analysisSchema>;

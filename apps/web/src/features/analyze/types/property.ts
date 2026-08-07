export interface PropertyInfo {
  address: string;
  county?: string;
  state: string;
  parcelId?: string;
  listingUrl?: string;
  /** Optional — defaults to DEFAULT_LOT_SIZE_SQFT when not researched. */
  lotSizeSqft?: number;
  askingPrice: number;
}

export interface LocationInput {
  populationGrowthRatePercent?: number;
  employmentGrowthRatePercent?: number;
  schoolRating?: number;
  crimeIndex?: number;
  walkScore?: number;
  nearbyAmenitiesCount?: number;
  plannedDevelopmentProjectsCount?: number;
}

export interface DevelopmentInput {
  /** Optional — defaults to DEFAULT_ZONING_ALLOWED_UNITS (single-family) when not researched. */
  zoningAllowedUnits?: number;
  avgUnitSizeSqft?: number;
  minLotAreaPerUnitSqft?: number;
  /** Optional — defaults to DEFAULT_CONSTRUCTION_COST_PER_SQFT when not researched. */
  estimatedConstructionCostPerSqft?: number;
  regionalAvgConstructionCostPerSqft?: number;
  estimatedPermitMonths?: number;
  requiredPermitsCount?: number;
}

export interface FinancialInput {
  estimatedMarketValue?: number;
  /** Optional — defaults to askingPrice * DEFAULT_EXIT_VALUE_MULTIPLIER when not projected. */
  projectedExitValue?: number;
  projectedAnnualRentalIncome?: number;
  downPaymentPercent?: number;
  maxLoanToCostPercent?: number;
  areaAvgPricePerSqft?: number;
}

export type FemaFloodZone = "X" | "A" | "AE" | "VE" | "AO" | "OTHER";
export type HazardExposure = "low" | "medium" | "high";
export type SoilQuality = "good" | "fair" | "poor";

export interface EnvironmentalInput {
  femaFloodZone?: FemaFloodZone;
  wetlandsPresent?: boolean;
  naturalHazardExposure?: HazardExposure;
  soilQuality?: SoilQuality;
  environmentalPermitRequired?: boolean;
}

export interface MarketInput {
  comparableSalesTrendPercent?: number;
  monthsOfSupply?: number;
  avgDaysOnMarket?: number;
  avgMonthlyRent?: number;
  vacancyRatePercent?: number;
  comparablePricePerSqft?: number;
}

export interface LegalInput {
  zoningCompliant?: boolean;
  titleIssues?: boolean;
  easementsPresent?: boolean;
  hoaRestrictions?: boolean;
  openCodeViolations?: boolean;
}

export interface InfrastructureInput {
  waterSewerAvailable?: boolean;
  electricityAvailable?: boolean;
  roadFrontage?: boolean;
  stormwaterDrainageAdequate?: boolean;
  broadbandAvailable?: boolean;
}

export interface LandAnalysisInput {
  property: PropertyInfo;
  location: LocationInput;
  development: DevelopmentInput;
  financial: FinancialInput;
  environmental: EnvironmentalInput;
  market: MarketInput;
  legal: LegalInput;
  infrastructure: InfrastructureInput;
}

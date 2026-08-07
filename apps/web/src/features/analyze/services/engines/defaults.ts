/**
 * Fallback assumptions used when the investor submits an analysis without
 * researching every field (PRD: analysis must be possible from just an
 * address + asking price). Each default is documented so the Decision
 * Intelligence explanation can point back to why a score used an assumption
 * instead of researched data.
 */

/** Typical vacant residential lot size in Florida when no lot size is provided. */
export const DEFAULT_LOT_SIZE_SQFT = 7000;

/** Assumes single-family zoning, the most common residential designation, when zoning is unresearched. */
export const DEFAULT_ZONING_ALLOWED_UNITS = 1;

/** Typical Florida residential construction cost per square foot when no estimate is provided. */
export const DEFAULT_CONSTRUCTION_COST_PER_SQFT = 180;

/** Assumes modest 15% appreciation over total investment when no exit value is projected. */
export const DEFAULT_EXIT_VALUE_MULTIPLIER = 1.15;

/** Typical finished-home sale price per square foot in Florida, used to scale a "build and
 * sell" scenario's exit value with unit count when no comparable price/sqft is provided. */
export const DEFAULT_SALE_PRICE_PER_SQFT = 230;

/** Typical monthly rent per residential unit in Florida, used for "build and rent" scenarios
 * when no rental income projection is provided. */
export const DEFAULT_MONTHLY_RENT_PER_UNIT = 1800;

/** Share of gross rental income assumed to go to taxes, insurance, maintenance and vacancy —
 * standard real-estate rule-of-thumb operating expense ratio for a rental return estimate. */
export const DEFAULT_OPERATING_EXPENSE_RATIO = 0.35;

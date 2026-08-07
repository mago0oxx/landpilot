import { LandAnalysisInput } from "../../types/property";
import { EngineResult } from "../../types/scoring";
import { DEFAULT_LOT_SIZE_SQFT } from "./defaults";
import { RawFactor, buildEngineResult, inverseLinearScore, linearScore, NEUTRAL_SCORE } from "./scoreHelpers";

/** Market Intelligence (weight 100 / docs/engines/market-intelligence.md) */
export function evaluateMarket(input: LandAnalysisInput): EngineResult {
  const market = input.market;

  const factors: RawFactor[] = [
    {
      id: "MI-01",
      label: "Comparable Sales Trend",
      weight: 30,
      hasData: market.comparableSalesTrendPercent !== undefined,
      score:
        market.comparableSalesTrendPercent !== undefined
          ? linearScore(market.comparableSalesTrendPercent, 0, 10)
          : NEUTRAL_SCORE,
      finding:
        market.comparableSalesTrendPercent !== undefined
          ? `Comparable sales trending at ${market.comparableSalesTrendPercent}% year-over-year.`
          : "No comparable sales trend data provided.",
    },
    {
      id: "MI-02",
      label: "Absorption / Supply-Demand Balance",
      weight: 25,
      hasData: market.monthsOfSupply !== undefined,
      score: market.monthsOfSupply !== undefined ? inverseLinearScore(market.monthsOfSupply, 2, 12) : NEUTRAL_SCORE,
      finding:
        market.monthsOfSupply !== undefined
          ? `${market.monthsOfSupply} months of supply in the surrounding market.`
          : "No supply/demand data provided.",
    },
    {
      id: "MI-03",
      label: "Days on Market",
      weight: 20,
      hasData: market.avgDaysOnMarket !== undefined,
      score:
        market.avgDaysOnMarket !== undefined ? inverseLinearScore(market.avgDaysOnMarket, 15, 120) : NEUTRAL_SCORE,
      finding:
        market.avgDaysOnMarket !== undefined
          ? `Comparable properties average ${market.avgDaysOnMarket} days on market.`
          : "No days-on-market data provided.",
    },
    {
      id: "MI-04",
      label: "Rental Market Strength",
      weight: 15,
      hasData: market.vacancyRatePercent !== undefined,
      score:
        market.vacancyRatePercent !== undefined
          ? inverseLinearScore(market.vacancyRatePercent, 3, 15)
          : NEUTRAL_SCORE,
      finding:
        market.vacancyRatePercent !== undefined
          ? `Vacancy rate of ${market.vacancyRatePercent}%${market.avgMonthlyRent ? ` at an average rent of $${market.avgMonthlyRent}/mo.` : "."}`
          : "No rental market data provided.",
    },
    {
      id: "MI-05",
      label: "Price per Sqft vs Comps",
      weight: 10,
      hasData: market.comparablePricePerSqft !== undefined,
      score:
        market.comparablePricePerSqft !== undefined
          ? inverseLinearScore(
              input.property.askingPrice / (input.property.lotSizeSqft ?? DEFAULT_LOT_SIZE_SQFT) / market.comparablePricePerSqft,
              0.7,
              1.3
            )
          : NEUTRAL_SCORE,
      finding:
        market.comparablePricePerSqft !== undefined
          ? `Deal price vs comparable sales of $${market.comparablePricePerSqft}/sqft.`
          : "No comparable price per sqft provided.",
    },
  ];

  return buildEngineResult("market", "Market Intelligence", 100, factors);
}

# Market Intelligence Engine

Version: 1.0

Status: Draft

Owner:
Daniel Quijada (CEO)
Sofi (CTO)

---

# Purpose

The Market Intelligence Engine evaluates macro real estate market trends and liquidity in the surrounding area — distinct from the specific deal's pricing (Financial Intelligence) or the neighborhood's livability (Location Intelligence).

It measures comparable sales trends, supply/demand balance, days on market, and rental market strength.

---

# Business Question

Is the surrounding real estate market moving in the investor's favor?

---

# Guiding Principles

- Every metric must be objective.
- Every score must be explainable.
- Market trend is a macro signal, evaluated separately from the deal-specific pricing owned by Financial Intelligence.
- Every factor should influence long-term investment performance.

---

# Engine Responsibilities

The Market Intelligence Engine is responsible for evaluating:

- Comparable sales trend (appreciation)
- Absorption / supply-demand balance
- Days on market
- Rental market strength
- Price per square foot vs comparable sales

It is NOT responsible for evaluating:

- The specific deal's price or ROI
- Neighborhood livability factors (schools, crime, accessibility)

Those dimensions belong to other Intelligence Engines.

# Evaluation Factors

| ID | Factor | Description | Weight |
|----|---------|-------------|-------:|
| MI-01 | Comparable Sales Trend | Year-over-year appreciation trend of comparable land/home sales in the area. | 30 |
| MI-02 | Absorption / Supply-Demand Balance | Ratio of homes sold to active inventory (months of supply) in the surrounding market. | 25 |
| MI-03 | Days on Market | Average time comparable properties take to sell, as a liquidity indicator. | 20 |
| MI-04 | Rental Market Strength | Average rent and vacancy rate for comparable units, relevant to hold/rental strategies. | 15 |
| MI-05 | Price per Sqft vs Comps | Deal's price per square foot benchmarked against recent comparable sales. | 10 |

# Weight Rationale

- **MI-01 (30):** Long-term appreciation trend is the strongest indicator that the broader market supports the investment thesis.
- **MI-02 (25):** A tight supply-demand balance protects resale value and reduces time-to-exit risk.
- **MI-03 (20):** Liquidity determines how quickly the investor can exit if needed.
- **MI-04 (15):** Confirms whether a rental/hold fallback strategy is realistic if a flip doesn't materialize.
- **MI-05 (10):** A lighter-weight cross-check against Financial Intelligence's own pricing factor, kept here to isolate market-wide from deal-specific pricing signals.

End of Document.

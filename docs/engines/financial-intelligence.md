# Financial Intelligence Engine

Version: 1.0

Status: Draft

Owner:
Daniel Quijada (CEO)
Sofi (CTO)

---

# Purpose

The Financial Intelligence Engine evaluates whether the numbers behind the deal make it a sound investment, independent of the property's other qualities.

It exists because the LPS Engine's guiding philosophy is that LandPilot finds the best investment, not the best land (Decision #008): a modest lot with strong economics must be able to outscore a prestigious lot with weak economics.

The engine does not evaluate location desirability, zoning feasibility, or market trends directly — it evaluates the deal's math.

---

# Business Question

Does the math of this deal make it a good investment?

---

# Guiding Principles

- Every metric must be objective.
- Every score must be explainable.
- ROI is the single strongest signal of investment quality.
- A deal must be judged by its numbers, not by the appeal of the land.
- Every factor should influence long-term investment performance.

---

# Engine Responsibilities

The Financial Intelligence Engine is responsible for evaluating:

- Estimated ROI
- Profit margin
- Purchase price vs estimated market value
- Cap rate / cash flow potential
- Financing feasibility
- Price per square foot vs area average

It is NOT responsible for evaluating:

- Location desirability
- Zoning / development feasibility
- Market-wide trend direction
- Legal or environmental risk

Those dimensions belong to other Intelligence Engines.

# Evaluation Factors

| ID | Factor | Description | Weight |
|----|---------|-------------|-------:|
| FI-01 | Estimated ROI | Projected return on investment, calculated from total investment cost and projected exit value or rental income. | 40 |
| FI-02 | Profit Margin | Projected profit (exit/build value minus total investment cost), normalized against total investment. | 20 |
| FI-03 | Purchase Price vs Market Value | Compares the asking/purchase price against the investor's estimated fair market value for the land. | 15 |
| FI-04 | Cap Rate / Cash Flow Potential | For hold/rental strategies, measures projected net operating income relative to total investment. | 10 |
| FI-05 | Financing Feasibility | Evaluates down payment requirement and loan-to-cost ratio against the investor's stated budget. | 8 |
| FI-06 | Price per Sqft vs Area Average | Compares the deal's price per buildable square foot against the surrounding area's average. | 7 |

# Weight Rationale

- **FI-01 (40):** ROI is the number the CTO used to explain the philosophy of the entire engine (Decision #008) — a high-ROI deal must be able to outrank a low-ROI deal even when every other dimension is weaker.
- **FI-02 (20):** ROI can be distorted by unrealistic assumptions; profit margin in absolute dollars is a second, independent check on deal quality.
- **FI-03 (15):** Buying below fair market value is the most direct protection against overpaying, independent of the projected exit.
- **FI-04 (10):** Distinguishes deals that only work as a flip from deals that also produce sustainable cash flow if held.
- **FI-05 (8):** A deal with excellent ROI on paper is not investable if it cannot realistically be financed within the investor's constraints.
- **FI-06 (7):** A secondary sanity check against comparable pricing in the immediate area.

End of Document.

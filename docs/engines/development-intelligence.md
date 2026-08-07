# Development Intelligence Engine

Version: 1.0

Status: Draft

Owner:
Daniel Quijada (CEO)
Sofi (CTO)

---

# Purpose

The Development Intelligence Engine evaluates whether a parcel can physically and legally support the residential development the investor has in mind, and how difficult that development will be to execute.

It measures zoning-allowed density, buildable area, construction cost efficiency, and permitting complexity.

The engine does not evaluate whether the resulting deal is profitable, whether utilities exist at the site, or whether the title/zoning is legally clean.

Its responsibility is exclusively to determine the development potential and feasibility of the land itself.

---

# Business Question

Can this land support the development strategy the investor wants, and how difficult will it be to build?

---

# Guiding Principles

- Every metric must be objective.
- Every score must be explainable.
- Zoning-allowed density is the strongest signal of development upside.
- Density that is not physically buildable must not be rewarded.
- Every factor should influence long-term investment performance.

---

# Engine Responsibilities

The Development Intelligence Engine is responsible for evaluating:

- Zoning-allowed density (units permitted by right)
- Buildable area sufficiency after setbacks and minimum lot size per unit
- Construction cost efficiency
- Permitting complexity and timeline

It is NOT responsible for evaluating:

- Deal profitability / ROI
- Utility availability at the site
- Zoning compliance disputes or title issues
- Environmental restrictions

Those dimensions belong to other Intelligence Engines.

# Evaluation Factors

| ID | Factor | Description | Weight |
|----|---------|-------------|-------:|
| DV-01 | Zoning Allowed Density | Measures the maximum number of residential units permitted by right under current zoning. | 30 |
| DV-02 | Buildable Area Sufficiency | Compares lot size against minimum lot area per unit required by zoning, confirming the allowed density is physically achievable after setbacks. | 25 |
| DV-03 | Construction Cost Efficiency | Compares the investor's estimated construction cost per square foot against the regional average. | 25 |
| DV-04 | Permitting Complexity | Measures estimated permitting timeline and number of distinct permits required before construction can start. | 20 |

# Weight Rationale

- **DV-01 (30):** This is the strongest driver of development upside — a lot legally entitled for multiple units can outperform a "better located" single-family lot. This is the exact scenario the CTO used to define the philosophy of the LPS Engine (Decision #008: Terreno A vs Terreno B).
- **DV-02 (25):** Zoning density is meaningless if the physical lot cannot accommodate it after required setbacks and minimum lot area per unit. This factor prevents the engine from rewarding density that is not actually buildable.
- **DV-03 (25):** Construction cost directly determines whether the extra units from higher density translate into extra profit. A lot with high allowed density but abnormally expensive construction erodes the advantage captured in DV-01.
- **DV-04 (20):** Long or complex permitting timelines increase holding costs and risk, even when zoning and lot size are favorable.

End of Document.

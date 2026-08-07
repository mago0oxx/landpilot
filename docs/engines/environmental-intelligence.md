# Environmental Intelligence Engine

Version: 1.0

Status: Draft

Owner:
Daniel Quijada (CEO)
Sofi (CTO)

---

# Purpose

The Environmental Intelligence Engine evaluates physical and environmental risk exposure that could restrict development, increase costs, or reduce insurability.

It measures FEMA flood zone designation, wetlands presence, natural hazard exposure, soil quality, and environmental permitting risk.

The engine does not evaluate zoning/legal restrictions, construction cost, or market pricing.

---

# Business Question

Does this land carry environmental risk that could compromise the investment?

---

# Guiding Principles

- Every metric must be objective.
- Every score must be explainable.
- Florida-specific hazards (flood, storm surge) carry disproportionate weight in the initial market.
- Every factor should influence long-term investment performance.

---

# Engine Responsibilities

The Environmental Intelligence Engine is responsible for evaluating:

- FEMA flood zone designation
- Wetlands presence
- Natural hazard exposure (hurricane, storm surge, wildfire)
- Soil quality and contamination risk
- Environmental permitting risk

It is NOT responsible for evaluating:

- Zoning or legal restrictions
- Construction cost
- Market pricing or trends

Those dimensions belong to other Intelligence Engines.

# Evaluation Factors

| ID | Factor | Description | Weight |
|----|---------|-------------|-------:|
| EI-01 | FEMA Flood Zone | Classifies the parcel's FEMA flood zone designation (e.g. X = minimal risk, AE/VE = high risk). | 35 |
| EI-02 | Wetlands Presence | Indicates whether all or part of the parcel is designated wetlands, which can restrict buildable area. | 20 |
| EI-03 | Natural Hazard Exposure | Evaluates exposure to hurricane storm surge, wildfire, or other regional natural hazards. | 20 |
| EI-04 | Soil Quality | Evaluates soil bearing capacity and contamination risk relevant to construction. | 15 |
| EI-05 | Environmental Permitting Risk | Estimates the likelihood of needing additional environmental permits/studies before construction. | 10 |

# Weight Rationale

- **EI-01 (35):** Flood zone is the single most consequential environmental factor in Florida — it directly affects insurance cost, financing eligibility, and buildability.
- **EI-02 (20):** Wetlands can eliminate large portions of a lot's buildable area regardless of its zoned density.
- **EI-03 (20):** Hurricane / storm-surge exposure is a first-order risk to long-term value in the initial Florida market.
- **EI-04 (15):** Poor soil conditions raise construction cost and can invalidate the Development Intelligence cost assumptions.
- **EI-05 (10):** Additional required environmental studies extend timeline and add holding costs, similar in spirit to Development's permitting factor.

End of Document.

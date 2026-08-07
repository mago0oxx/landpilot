# Infrastructure Intelligence Engine

Version: 1.0

Status: Draft

Owner:
Daniel Quijada (CEO)
Sofi (CTO)

---

# Purpose

The Infrastructure Intelligence Engine evaluates whether the utilities and physical access needed to build already exist at or near the parcel.

It measures water/sewer access, electricity, road access/frontage, stormwater drainage, and broadband availability.

---

# Business Question

Does this land have the physical infrastructure needed to build on it?

---

# Guiding Principles

- Every metric must be objective.
- Every score must be explainable.
- Missing infrastructure is a cost and feasibility signal, not a cost estimate itself.
- Every factor should influence long-term investment performance.

---

# Engine Responsibilities

The Infrastructure Intelligence Engine is responsible for evaluating:

- Water and sewer access
- Electricity and utilities access
- Road access and legal frontage
- Stormwater drainage infrastructure
- Broadband availability

It is NOT responsible for evaluating:

- The cost of connecting utilities as part of the construction budget (Development Intelligence)
- Utility easement legal disputes (Legal Intelligence)

Those dimensions belong to other Intelligence Engines.

# Evaluation Factors

| ID | Factor | Description | Weight |
|----|---------|-------------|-------:|
| IN-01 | Water & Sewer Access | Confirms availability of public water/sewer at the property line, versus requiring well/septic. | 30 |
| IN-02 | Electricity & Utilities Access | Confirms electric utility service is available at or near the parcel. | 25 |
| IN-03 | Road Access & Frontage | Confirms the parcel has legal frontage on a public or maintained road. | 25 |
| IN-04 | Stormwater Drainage | Evaluates existing stormwater infrastructure or drainage requirements. | 10 |
| IN-05 | Broadband Availability | Confirms availability of broadband internet service. | 10 |

# Weight Rationale

- **IN-01 (30):** Lack of public water/sewer is the most common and costly infrastructure gap, often requiring well/septic permitting that affects both cost and buildable area.
- **IN-02 (25):** Electric service availability is a hard prerequisite for construction financing and habitability.
- **IN-03 (25):** A parcel without legal, maintained road frontage may not be permittable at all, regardless of every other factor.
- **IN-04 (10):** Missing drainage infrastructure adds site work cost but is rarely a deal-blocker.
- **IN-05 (10):** Increasingly relevant to resale value and buyer expectations, but the least likely to block development.

End of Document.

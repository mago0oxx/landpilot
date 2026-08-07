# Legal Intelligence Engine

Version: 1.0

Status: Draft

Owner:
Daniel Quijada (CEO)
Sofi (CTO)

---

# Purpose

The Legal Intelligence Engine evaluates legal and title risk that could block or complicate the transaction or the investor's intended use of the land.

It measures zoning compliance, title issues, easements/encroachments, HOA/deed restrictions, and code violation history.

---

# Business Question

Are there legal obstacles that could block this investment or its intended use?

---

# Guiding Principles

- Every metric must be objective.
- Every score must be explainable.
- A legal obstacle can invalidate every other engine's analysis until resolved.
- Every factor should influence long-term investment performance.

---

# Engine Responsibilities

The Legal Intelligence Engine is responsible for evaluating:

- Zoning compliance / conforming use
- Title issues and liens
- Easements and encroachments
- HOA and deed restrictions
- Code violation history

It is NOT responsible for evaluating:

- Whether zoning density is profitable enough (Development Intelligence)
- Environmental restrictions (Environmental Intelligence)

Those dimensions belong to other Intelligence Engines.

# Evaluation Factors

| ID | Factor | Description | Weight |
|----|---------|-------------|-------:|
| LG-01 | Zoning Compliance | Confirms the intended use conforms to current zoning, or requires a variance/rezoning. | 30 |
| LG-02 | Title Issues / Liens | Evaluates whether the title is clear or carries liens, judgments, or ownership disputes. | 25 |
| LG-03 | Easements & Encroachments | Identifies utility, access, or drainage easements and any encroachments affecting buildable area. | 20 |
| LG-04 | HOA / Deed Restrictions | Evaluates restrictive covenants that could limit the intended development. | 15 |
| LG-05 | Code Violation History | Checks for open code enforcement cases or unresolved violations tied to the parcel. | 10 |

# Weight Rationale

- **LG-01 (30):** If the intended use is not legally permitted, every other engine's analysis becomes moot until resolved.
- **LG-02 (25):** Unclear title can block the transaction entirely, making this the second most severe legal risk.
- **LG-03 (20):** Easements can silently reduce the buildable area assumed by Development Intelligence.
- **LG-04 (15):** Deed restrictions/HOA rules can prohibit the specific development type even when zoning allows it.
- **LG-05 (10):** Open violations can delay permitting and closing, though they are typically resolvable.

End of Document.

# Decision Intelligence Engine

Version: 1.0

Status: Draft

Owner:
Daniel Quijada (CEO)
Sofi (CTO)

---

# Purpose

The Decision Intelligence Engine combines the outputs of the seven scored Intelligence Engines (Location, Development, Financial, Environmental, Market, Legal, Infrastructure) into a single LPS Score, Confidence Level, Risk Level, and Investment Recommendation.

It does not independently score any dimension of the property. It is the orchestration layer described in `docs/engines/README.md` ("The Decision Intelligence Engine combines all results into the final recommendation") and `docs/architecture/LPS-ENGINE.md`.

---

# Business Question

Given everything the other engines found, should this investor pursue this land?

---

# Guiding Principles

- The engine never asks "is this land beautiful?" — it asks "is this investment financially and strategically attractive?"
- A numerically high score must never hide a critical risk (Decision Intelligence can cap the recommendation even when the score is high).
- Confidence must reflect how much of the analysis was based on researched data vs missing inputs.
- Every conclusion must be explainable in terms of the underlying engine outputs.

---

# Engine Responsibilities

The Decision Intelligence Engine is responsible for:

- Aggregating the 7 engine scores into the LPS Score (0-1000)
- Computing the Confidence Level
- Computing the Risk Level
- Producing the Investment Recommendation
- Producing the Detailed Explanation

It is NOT responsible for:

- Scoring any individual dimension (Location, Development, Financial, Environmental, Market, Legal, Infrastructure) — those belong to the other 7 Intelligence Engines.

# Weight

Decision Intelligence does not hold a share of the 1000-point total. The 7 scored engines already sum to 1000 (180+180+250+120+100+90+80). Decision Intelligence is a pure aggregator, not an additional scored dimension.

# Aggregation Logic

## LPS Score (0-1000)

```
LPS Score = Σ (engine.score / 100 × engine.weight)   for the 7 scored engines
```

## Confidence Level

V1 has no automated data sources — every input is manually researched (PRD: "Manual data entry"). Confidence measures how complete that manual research is.

```
completeness = filledOptionalFields / totalOptionalFields

High    if completeness >= 85%
Medium  if completeness >= 60%
Low     if completeness <  60%
```

## Risk Level

Counts "red flags" raised by the individual engines (e.g. high-risk FEMA flood zone, unresolved title issues, negative ROI, non-conforming zoning).

```
0 red flags                                -> Low
1-2 red flags                              -> Medium
3+ red flags, OR any hard-override flag    -> High
```

Hard-override flags (force High risk regardless of count): negative estimated ROI, unresolved title dispute.

## Investment Recommendation

```
if riskLevel == High or lpsScore < 500     -> Pass
else if lpsScore >= 800                    -> Strong Buy
else if lpsScore >= 650                    -> Buy
else                                        -> Consider / Further Due Diligence
```

# Design Rationale

- Risk overrides score by design: a numerically high LPS Score built on a critical red flag (e.g. negative ROI, unresolved title) must not translate into a "Buy" recommendation. This protects the "Data First" and "Investor First" principles in `docs/business/vision.md`.
- Financial Intelligence's dominant weight (250/1000, with Estimated ROI at 40% of that) already makes deal economics the single largest driver of the LPS Score, which is how the engine detects the Terreno A vs Terreno B scenario from Decision #008 without Decision Intelligence needing its own financial logic.
- Confidence is reported separately from Score/Risk so a low-confidence "Strong Buy" (built on many un-researched assumptions) is visibly different from a high-confidence one — consistent with the platform's "Transparency" principle.

End of Document.

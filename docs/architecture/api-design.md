# API Design

Version: 1.0

Status: Draft

---

# Overview

V1 has a single resource: the land analysis produced by the LPS Engine. Routes live under `apps/web/src/app/api/`, using Next.js 16 Route Handlers.

# `POST /api/analyses`

Runs the LPS Engine against a submitted `LandAnalysisInput` and persists the result.

- **Body**: JSON matching `analysisSchema` (`apps/web/src/features/analyze/schemas/analysisSchema.ts`) — the 8 section inputs (property, location, development, financial, environmental, market, legal, infrastructure).
- **Validation**: `analysisSchema.safeParse`. On failure, returns `400` with `{ error, issues }` (zod's `flatten()`).
- **Processing**: `calculateLPS(input)` (`apps/web/src/utils/calculateLPS.ts`) runs the 7 scored Intelligence Engines + Decision Intelligence aggregation. `calculateROI` computes `estimatedRoi` separately so the dashboard can aggregate it without parsing JSON.
- **Persistence**: creates a `Property` and its first `LandAnalysis` in one nested Prisma write.
- **Response**: `201 { id }` — the new `LandAnalysis.id`, used to redirect to `/analyses/[id]`.

# `GET /api/analyses`

Lists analyses for the dashboard, most recent first.

- **Response**: `200 [{ id, address, lpsScore, riskLevel, recommendation, createdAt }]`.
- Not currently used by the server-rendered dashboard (`app/dashboard/page.tsx` queries Prisma directly), but kept as a public read endpoint for future client-side or external consumption.

# `GET /api/analyses/[id]`

Returns one full analysis (property + inputs + score + per-engine breakdown).

- **Response**: `200` — the full `LandAnalysis` row (including `property`), or `404 { error }` if not found.
- Not currently used by the server-rendered analysis page (`app/analyses/[id]/page.tsx` queries Prisma directly); kept for the same reason as the list endpoint.

# Not yet built (out of scope this round)

- Auth / per-user scoping of analyses.
- `PATCH`/`DELETE` on analyses (re-scoring, deleting a saved analysis).
- Pagination on `GET /api/analyses`.

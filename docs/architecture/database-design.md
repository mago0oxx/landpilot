# Database Design

Version: 1.0

Status: Draft

---

# Stack

- PostgreSQL 16 (local via `docker-compose.yml` at the repo root; migrates to Supabase later by swapping `DATABASE_URL`).
- Prisma ORM 7 (`apps/web/prisma/schema.prisma`).

# Prisma 7: driver adapters instead of an inline connection string

Prisma 7 removed the `url` field from the `datasource` block in `schema.prisma` — connection strings are no longer read from the schema file. Two files handle this instead:

- `apps/web/prisma.config.ts` — read by the Prisma CLI (`generate`, `migrate`) for the `DATABASE_URL`. It loads `.env` explicitly via `dotenv/config`, because Prisma 7's config loader no longer auto-loads `.env` files.
- `apps/web/src/lib/prisma.ts` — the runtime client. It builds a `PrismaPg` driver adapter (`@prisma/adapter-pg`, backed by the `pg` package) from `DATABASE_URL` and passes it to `new PrismaClient({ adapter })`.

This was discovered empirically while setting up the database — Prisma 7 is a breaking-change release relative to the version most documentation assumes (see `apps/web/AGENTS.md`).

# Models

## Property

One row per physical parcel. Kept separate from `LandAnalysis` so the same property can be re-analyzed over time (PRD: "Users can review previously analyzed properties").

| Field | Type | Notes |
|---|---|---|
| id | String (cuid) | |
| address | String | |
| county | String | |
| state | String | defaults to `"FL"` (PRD: initial market is Florida) |
| parcelId | String? | |
| listingUrl | String? | |
| lotSizeSqft | Float | |
| askingPrice | Float | |
| createdAt | DateTime | |

## LandAnalysis

One row per LPS Engine run against a `Property`.

| Field | Type | Notes |
|---|---|---|
| id | String (cuid) | |
| propertyId | String | FK to `Property`, `onDelete: Cascade` |
| inputs | Json | The full `LandAnalysisInput` (all 8 section inputs) submitted by the investor |
| lpsScore | Float | 0-1000, from Decision Intelligence |
| confidenceLevel | String | `High` / `Medium` / `Low` |
| riskLevel | String | `Low` / `Medium` / `High` |
| recommendation | String | `Strong Buy` / `Buy` / `Consider` / `Pass` |
| explanation | String | Human-readable summary from Decision Intelligence |
| engineResults | Json | Per-engine breakdown (`LPSResult["engines"]`), used by the analysis detail view |
| createdAt / updatedAt | DateTime | |

`inputs` and `engineResults` are stored as `Json` rather than fully normalized columns because the engine sub-weights are still explicitly marked as refinable in `docs/engines/location-intelligence.md` ("Weight: TBD") and the platform's stated principle is continuous improvement (`docs/business/vision.md`). Normalizing now would force a schema migration every time a factor or weight changes; the top-level scoring fields (`lpsScore`, `riskLevel`, etc.) are normalized because the dashboard needs to query/sort/filter on them.

# Not yet modeled (out of scope this round)

- User / auth — analyses are single-tenant for now.
- Historical re-scoring (re-running the LPS Engine with updated weights against old `inputs`).

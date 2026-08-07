# ADR-001: Project Structure

## Status
Accepted

## Context
LandPilot is expected to grow into a large application with multiple business domains.

## Decision
Reusable components will live under `components/`.
Business-specific functionality will live under `features/`.

## Consequences
- Better scalability.
- Easier maintenance.
- Clear separation of responsibilities.
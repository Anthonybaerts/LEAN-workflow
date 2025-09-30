---
docType: implementation
id: F-007
phases: [P0, P1]
deliverables: [F-007-D1, F-007-D2, F-007-D3]
acCoverage: [F-007-AC1, F-007-AC2, F-007-AC3]
generatedBy: implementation_planner
---

# Implementation — F-007 (Form Validation)

Links:
- Shard: PRD_Shard_F-007.md
- Index: MASTER_INDEX.yaml (F-007)

## Deliverables (trace to ACs)
- F-007-D1 → F-007-AC1: Shared Zod schemas + RHF resolvers for create/edit flows with inline errors
- F-007-D2 → F-007-AC2: Submit buttons disabled until form valid (schema-driven, RHF state)
- F-007-D3 → F-007-AC3: Successful submit path with schema-validated data and no client errors

## Phases (incremental, reference Deliverables & ACs)
- P0: Dependencies & Setup (S0)
  - Goal: Ensure validation libs and wiring patterns are ready
  - Steps:
    - S0: Deps & Setup check for validation
      - Ensure `zod`, `react-hook-form`, `@hookform/resolvers/zod` are installed
      - Decide folder: `vakkerUI/src/services/validation/` (schemas) and `vakkerUI/src/services/forms/` (hooks/helpers)
      - Establish message copy surface (Dutch) for common errors (e.g., vereist, ongeldig e-mail)
  - Entry criteria: None (independent)
  - Exit criteria: Ready to implement schemas and hooks
  - Step Gate: After S0, STOP. Await explicit "proceed" before P1

- P1: Implement schemas and RHF integration helpers (D1, D2, D3 → F-007-AC1..AC3)
  - Goal: Provide reusable schemas and hooks to be consumed by F-003, F-004, F-015, F-016
  - Steps (Batch A): Schemas
    - S1: Create `clientSchema` with fields: type (enum: Zakelijk|Particulier), name (required), email (email), phone (string, min 10), addressLine (required), postalCode (optional), city (optional), notes (optional)
    - S2: Create `taskSchema` with fields: clientId (required), date (ISO/date), startAt (string HH:mm), endAt (string HH:mm, refine end > start), type (enum), description (optional)
    - Step Gate A: STOP. Await "proceed" before hooks
  - Steps (Batch B): RHF helpers
    - S3: Create `useZodForm` helper to wire `zodResolver(schema)` and return RHF methods; include `isValid` and `formState.errors`
    - S4: Add `getErrorMessage` util mapping Zod issues → Dutch strings
    - S5: Document usage in `README` snippet for NewClient/NewTask screens
    - Step Gate B: STOP. Await validation before closing P1
  - Entry criteria: deps met
  - Exit criteria: ACs satisfied: [F-007-AC1, F-007-AC2, F-007-AC3]

## Data & State
- No new entities; schemas validate payloads for existing create/edit flows

## UX Notes
- Inline errors displayed under inputs; disable submit until `isValid` is true
- Reuse existing `Input` error styling conventions if present; otherwise minimal text error below field

## Risks / Rollback
- Risks:
  - Over-strict schemas could block valid submissions; keep MVP-friendly
  - Locale consistency for messages
- Rollback Plan:
  - Temporarily relax fields (warnings in console) while preserving core required checks

## Definition of Done
- All ACs validated in QA doc
- No unresolved deps
- Schemas and hooks documented with examples for F-003 and F-004 consumers

## Execution Guardrails (for Dev Agent)
- Do not modify `@ui/components`; only provide schemas/hooks in `src/services`
- Keep helpers framework-agnostic beyond RHF resolver; no Redux coupling
- Context7 usage: only if unsure about RHF + Zod patterns in React Native; save high-signal notes under `docs/context7/`

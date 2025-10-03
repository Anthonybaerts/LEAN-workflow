---
docType: implementation
id: F-003
phases: [P0, P1, P2, P3]
deliverables: [F-003-D1, F-003-D2, F-003-D3]
acCoverage: [F-003-AC1, F-003-AC2, F-003-AC3]
generatedBy: implementation_planner
---

# Implementation — F-003 (Clients: Create)

Links:
- Shard: PRD_Shard_F-003.md
- Index: MASTER_INDEX.yaml (F-003)

## Deliverables (trace to ACs)
- F-003-D1 → F-003-AC2: Validated NewClient form (Zod + RHF) with disabled submit until valid and inline errors.
- F-003-D2 → F-003-AC1: Firestore create (clients collection) with owner scoping; navigate to `ClientInfoScreen` on success.
- F-003-D3 → F-003-AC3: ClientInfo immediately reflects the newly created client data after navigation.

## Phases (incremental, reference Deliverables & ACs)
- P0: Dependencies & Setup (S0)
  - Goal: Ensure validation/data/navigation dependencies are ready
  - Steps:
    - S0: Deps & Setup check
      - Verify `clientSchema` exists with required fields per PRD (present)
      - Verify `useZodForm` helper (present)
      - Confirm `clientsRepository.create` exists and sets `ownerId` and timestamps (present)
      - Ensure route for `new-client` and `client-info` present (present)
  - Entry criteria: F-001, F-005, F-006, F-007 available per shard deps
  - Exit criteria: All prerequisites confirmed; otherwise STOP and request update
  - Step Gate: After P0, STOP. Dev agent must ask to proceed before edits.
  - MCP: Context7 — If unsure, review Expo Router route param passing and Firebase Firestore create patterns in RN; save notes to `docs/context7/`.

- P1: Form wiring and validation (D1 → F-003-AC2)
  - Goal: Replace local state with RHF+Zod; show inline errors; disable submit until valid
  - Includes: [F-003-D1] → [F-003-AC2]
  - Steps:
    - S1: In `NewClientScreen`, integrate `useZodForm(clientSchema)` with default values
    - S2: Bind inputs via `Controller`/`register`; surface `getErrorMessage` per field
    - S3: Bind header "Opslaan" and bottom primary button to the same `onSubmit` handler; disable both when `form.isValid` is false
    - S4: Confirm type mapping: UI `business`|`personal` → schema `Zakelijk`|`Particulier`
  - Entry criteria: deps met
  - Exit criteria: Form shows validation errors and prevents invalid submit
  - Step Gate: After P1, STOP. Dev agent must ask to proceed.
  - MCP: Sequential Thinking — Map each UI field to schema, define error copy paths, and confirm disabled-submit logic across states (pristine, dirty, invalid, valid).
  - MCP: Context7 — Best practices for RHF + Zod Controller usage in React Native, including performance tips and keyboard handling.

- P2: Persistence and navigation (D2 → F-003-AC1)
  - Goal: Persist new client to Firestore and navigate to details
  - Includes: [F-003-D2] → [F-003-AC1]
  - Steps:
    - S1: On submit, map form values to repository `clientsRepository.create`
    - S2: Await result; on success, navigate to Clients stack `client-info` with `clientId` via route param
    - S3: On failure, keep form state intact and show a friendly toast/log; allow retry without clearing fields
  - Entry criteria: P1 complete
  - Exit criteria: New client document created; app navigates to details for new client
  - Step Gate: After P2, STOP. Dev agent must ask to proceed.
  - MCP: Sequential Thinking — Validate data mapping (schema → repo payload), error flows, and navigation param typing to avoid runtime route issues.
  - MCP: Context7 — RN Linking and Expo Router navigation patterns for passing params; Firestore create patterns with owner scoping and timestamps.

- P3: Details reflection and polish (D3 → F-003-AC3)
  - Goal: Ensure `ClientInfoScreen` immediately reflects created client
  - Includes: [F-003-D3] → [F-003-AC3]
  - Steps:
    - S1: Confirm `ClientInfoScreen` reads `clientId` from route/prop (see F-010 plan)
    - S2: If F-010 not yet executed, add a temporary fetch `getById` fallback to show data once (unsubscribe not required); remove after F-010
    - S3: Visual QA: header/title reflects name; contact fields populate; tasks may be empty
  - Entry criteria: P2 complete
  - Exit criteria: Details screen shows newly created client data
  - Step Gate: After P3, STOP. Dev agent must ask to proceed.
  - MCP: Sequential Thinking — Confirm interim fallback vs. final observer approach when sequencing with F-010; define cleanup/removal plan once F-010 lands.
  - MCP: Context7 — If needed, check best practices for detail-to-form navigation and back behavior in nested stacks/tabs.

## Data & State
- Entities: clients (ownerId, type, name, email, phone, addressLine, postalCode, city, notes)
- Storage: Firebase Firestore via `clientsRepository.create`
- State: RHF local form state only; no Redux required

## UX Notes
- Use `NewClientScreen` layout with bordered Inputs; keep action buttons at bottom
- Copy: Dutch labels per PRD; friendly errors via `getErrorMessage`
- Type selection tabs: highlight active with primary color and 20% background

## Risks / Rollback
- Risks:
  - Validation-schema mismatch with UI fields naming
  - Navigation param mismatch for `clientId`
- Rollback Plan:
  - If create fails, stay on form, show toast, allow retry; no partial doc usage

## Definition of Done
- All ACs validated in QA doc
- No unresolved deps
- Submit disabled until valid; inline errors visible; navigation on success

## Execution Guardrails (for Dev Agent)
- Manual step gate enforced; after each phase, STOP and request explicit "proceed" before continuing.
- Sequential Thinking MCP: Use at P1 start to map form fields ↔ schema and error messaging consistency.
- Context7 MCP: Consult for Expo Router param passing patterns and RHF + Zod Controller patterns if unsure; save any consulted notes under `docs/context7/`.



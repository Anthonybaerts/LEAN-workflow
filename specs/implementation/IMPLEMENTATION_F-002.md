---
docType: implementation
id: F-002
phases: [P0, P1]
deliverables: [F-002-D1, F-002-D2, F-002-D3]
acCoverage: [F-002-AC1, F-002-AC2, F-002-AC3]
generatedBy: implementation_planner
---

# Implementation — F-002 (Clients: List & Search)

Links:
- Shard: PRD_Shard_F-002.md
- Index: MASTER_INDEX.yaml (F-002)

## Deliverables (trace to ACs)
- F-002-D1 → F-002-AC1: Clients list wired to Firestore via data layer; renders `CustomerCard` items
- F-002-D2 → F-002-AC2: Search-as-you-type filter on client name/company using `Input`
- F-002-D3 → F-002-AC3: Empty state shown when no results match search

## Phases (incremental, reference Deliverables & ACs)
- P0: Dependencies & Setup (S0)
  - Goal: Confirm prerequisites and data utilities are ready
  - Steps:
    - S0: Verify deps and context
      - Auth available (F-001) and user session routing in `_layout.tsx`
      - Navigation set up (F-005) with `ClientsScreen` route
      - Data layer ready (F-006): `clientsRepository` present with list/observe helpers
      - Firestore index note: `(ownerId, name)` documented
  - Entry criteria: F-001, F-005, F-006 available
  - Exit criteria: Ready to wire UI
  - Step Gate: After S0, STOP. Await explicit "proceed" before starting P1

- P1: Implement Clients list + search (D1, D2, D3 → F-002-AC1..AC3)
  - Goal: Reuse `@ui/screens/ClientsScreen` and connect to repository with search and empty state
  - Steps (Batch A):
    - S1: Render `ClientsScreen` and manage local `searchQuery` state
    - S2: Subscribe to `clientsRepository.observeListByOwnerId(undefined, setClients)` to receive live list
    - S3: Implement client-side filter by `name` includes search (case-insensitive, trimmed)
    - Step Gate A: After S1–S3, STOP. Await explicit "proceed" before Batch B
  - Steps (Batch B):
    - S4: Pass filtered data to `CustomerCard` props shape expected by UI
    - S5: Show empty state message when filtered list is empty (reuse existing UI pattern; no new component creation)
    - S6: Wire `RoundButton` action to navigate to `NewClientScreen` (future F-003 dependency acknowledged)
    - Step Gate B: After S4–S6, STOP. Await explicit "proceed" before closing P1
  - Entry criteria: deps met
  - Exit criteria: ACs satisfied: [F-002-AC1, F-002-AC2, F-002-AC3]

## Data & State
- Entities: `clients` collection (provided by F-006 repos)
- State: Local screen state for `searchQuery`; data via repository observer

## UX Notes
- Reuse `Header`, `Input`, `CustomerCard`, `TabButton`, `RoundButton` per UI map
- Search input uses `Search` icon and Dutch placeholder "Zoek klanten..."
- Empty state copy: "Geen klanten gevonden" (per MASTER_PRD)

## Risks / Rollback
- Risks:
  - Missing Firestore index for `(ownerId, name)` may slow queries (client-side filter mitigates for MVP)
  - Large lists without virtualization (acceptable for MVP sample sizes)
- Rollback Plan:
  - If real-time observer is unstable, fall back to `listByOwnerId` on focus

## Definition of Done
- All ACs validated in QA doc
- No unresolved deps
- Reuse-first: Only wired existing `@ui/screens` and components; no new UI added

## Execution Guardrails (for Dev Agent)
- Do not introduce state libraries (Redux comes in F-009)
- Keep logic within screen-level hook/component wrappers; repositories remain in `src/services`
- Provide a short route map and prop wiring notes in EXEC_NOTES
- Gating policy:
  - Default: Stop after each phase (P0, P1) and await "proceed"
  - Within P1: follow Batch A and Batch B step gates defined above
  - Batch size: keep to ≤3–5 cohesive steps or ≤150 LOC across ≤3 files; otherwise split and STOP
  - Auto-continue: only for trivial same-file wiring with no new deps and passing lint; otherwise STOP
- Context7 MCP usage:
  - Use for library API specifics, version differences, or when local notes are stale/missing; save high-signal notes to `docs/context7/` and cite
  - Skip for routine UI wiring and basic repository calls
- Sequential thinking:
  - Use for ambiguous requirements, cross-cutting changes, or risky paths; skip for straightforward single-screen wiring

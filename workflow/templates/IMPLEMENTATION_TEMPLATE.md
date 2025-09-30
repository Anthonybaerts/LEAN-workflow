---
docType: implementation
id: <F-101>
phases: []
deliverables: []
acCoverage: []
generatedBy: implementation_planner
---

# Implementation — <ID e.g., F-101>

Links:
- Shard: PRD_Shard_F-101.md
- Index: MASTER_INDEX.yaml (F-101)

## Deliverables (trace to ACs)
- D1 → F-101-AC1: <...>
- D2 → F-101-AC2: <...>

## Phases (incremental, reference Deliverables & ACs)
- P0: Dependencies & Setup (S0)
  - Goal: Ensure all libraries/config required for this feature exist and are correctly set up
  - Steps:
    - S0: Deps & Setup check for this feature (verify installs, peers, Babel/Metro config, entry/root wrappers, permissions)
  - Entry criteria: Global Pre-flight complete
  - Exit criteria: All required deps present; otherwise STOP and request MASTER_PRD/sequence update

- P1: <phase title>
  - Goal: <concise outcome>
  - Includes: [D1] → [F-101-AC1]
  - Steps:
    - S1: <small, testable step>
    - S2: <small, testable step>
    - S3: <add more steps as needed for complex phases>
  - Entry criteria: deps met: [F-000]
  - Exit criteria: ACs satisfied: [F-101-AC1]
  - Feature flags: <flag-name> (default off)

- P2: <phase title>
  - Goal: <concise outcome>
  - Includes: [D2] → [F-101-AC2]
  - Steps:
    - S1: <small, testable step>
  - Entry criteria: P1 complete
  - Exit criteria: ACs satisfied: [F-101-AC2]
  - Feature flags: <flag-name>

  - Visual QA (run at phase end):
    - Safe areas respected; spacing via tokens; readable typography; header/tab sizing consistent; list/card density acceptable; press feedback on tappables.

## Data & State
- Entities:
- Storage:

## UX Notes
- Screens:
- Edge cases:

## Risks / Rollback
- Risks:
- Rollback Plan:

## Definition of Done
- All ACs validated in QA doc
- No unresolved deps


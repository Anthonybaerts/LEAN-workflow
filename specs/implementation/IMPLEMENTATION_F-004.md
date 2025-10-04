---
docType: implementation
id: F-004
phases: [P0, P1, P2a, P2b, P2c, P2d, P2e, P2f, P3a, P3b]
deliverables: [F-004-D1, F-004-D2, F-004-D3, F-004-D4, F-004-D5]
acCoverage: [F-004-AC1, F-004-AC2, F-004-AC3, F-004-AC4, F-004-AC5]
generatedBy: implementation_planner
---

# Implementation — F-004 (Tasks: Create)

Links:
- Shard: PRD_Shard_F-004.md
- Index: MASTER_INDEX.yaml (F-004)

## Deliverables (trace to ACs)
- F-004-D1 → F-004-AC1: Empty-slot tap in Calendar navigates to `NewTask` route with params `{ date, startAt, endAt=startAt+1h }`.
- F-004-D2 → F-004-AC2: `NewTaskScreen` shows time buttons with values and opens the RN 24h datetime picker on tap.
- F-004-D3 → F-004-AC3: Duration auto-updates on time changes; Save button disabled until valid; validation blocks save if `endAt <= startAt` or not same day.
- F-004-D4 → F-004-AC4: On save, task is created in Firestore; navigates back and Calendar reflects the new task for that date.
- F-004-D5 → F-004-AC5: On failure, show toast and keep form state intact.

## Phases (incremental, reference Deliverables & ACs)
- P0: Dependencies & Setup (S0)
  - Goal: Confirm routing, validation, data, and picker dependencies are ready
  - Steps:
    - S0: Deps & Setup check for this feature
      - Verify navigation route exists for `/(tabs)/calendar/new-task` (present) and Calendar pushes params (present)
      - Verify `tasksRepository.create` exists and sets `ownerId` and timestamps (present)
      - Verify `taskSchema` exists and matches required fields: `clientId`, `date`, `startAt`, `endAt`, `type`, `description?` (present)
      - Ensure `@react-native-community/datetimepicker` is available (24h). If missing, add it during implementation (no native rebuild in Expo managed flow)
      - Confirm indices note: `(ownerId, date, startAt)` is documented in rules/indexes
  - Entry criteria: F-001, F-005, F-006, F-007, F-008 available per shard deps
  - Exit criteria: All prerequisites confirmed; otherwise STOP and request update
  - MCP:
    - Sequential Thinking (REQUIRED): Validate dependencies checklist; note any ambiguities to clarify.
    - Context7 (NOT NEEDED): Skip unless package versions seem mismatched.
  - Step Gate: After P0, STOP. Ask the user to say 'proceed' to continue before making edits.

- P1: Calendar → NewTask routing (D1 → F-004-AC1)
  - Goal: Ensure Calendar empty-slot tap navigates to `NewTask` with correct params and sensible defaults
  - Steps:
    - S1: Confirm `handleSlotPress` only acts on empty slots and performs `router.push('/(tabs)/calendar/new-task', { date, startAt })`
    - S2: In `NewTask` route controller, compute default `endAt = min(startAt + 60m, 23:59)`; keep same-day constraint
    - S3: Prefill UI values in `NewTaskScreen` props from params
  - Entry criteria: P0 complete
  - Exit criteria: AC satisfied: [F-004-AC1]
  - MCP:
    - Sequential Thinking (REQUIRED): Verify param names/types and navigation path correctness; list quick test notes.
    - Context7 (NOT NEEDED): Expo Router push usage here is straightforward; skip.
  - Step Gate: After P1, STOP. Ask the user to say 'proceed' to continue. Provide quick test notes.

- P2a: Controller init (params → defaults) (D2 → F-004-AC2)
  - Goal: Initialize state from params and compute default times
  - Steps:
    - S1: Read `{ date, startAt }` from route params
    - S2: Compute `endAt = min(startAt + 60m, 23:59)`; clamp to same day
    - S3: Prefill `NewTaskScreen` props and local controller state
  - MCP:
    - Sequential Thinking (REQUIRED): Define clamping and default computation; document edge cases (late start).
    - Context7 (NOT NEEDED): Pure state logic; skip.
  - Gate: STOP after P2a. Ask the user to say 'proceed' to continue. Verify prefilled times and labels.

- P2b: Start time picker (D2 → F-004-AC2)
  - Goal: Wire Starttijd button to RN datetime picker (24h)
  - Steps:
    - S1: Implement `onStartTimePress` → open picker; round to 15–30 min
    - S2: Update `startAt` in state; keep same-day
    - S3: Recompute `endAt` only if needed (optional policy: keep duration stable or keep end fixed; choose and note)
  - MCP:
    - Context7 (REQUIRED): Confirm `@react-native-community/datetimepicker` 24h config, value/prop differences iOS/Android, Expo managed caveats, and rounding approach. Save notes under `docs/context7/`.
    - Sequential Thinking (REQUIRED): Decide rounding to nearest step and whether end time adjusts or stays fixed.
  - Gate: STOP after P2b. Ask the user to say 'proceed' to continue. Validate start time interactions.

- P2c: End time picker (D2 → F-004-AC2)
  - Goal: Wire Eindtijd button to RN datetime picker (24h)
  - Steps:
    - S1: Implement `onEndTimePress` → open picker; round to 15–30 min
    - S2: Update `endAt` in state; clamp to `>= startAt` and same day
  - MCP:
    - Context7 (REQUIRED): Same picker API checks as P2b; ensure minTime logic is handled in controller since picker lacks min.
    - Sequential Thinking (REQUIRED): Define clamping when picked end < start; decide UX copy.
  - Gate: STOP after P2c. Ask the user to say 'proceed' to continue. Validate end time interactions.

- P2d: Duration + clamps (D3 → F-004-AC3)
  - Goal: Keep duration label accurate and enforce same-day
  - Steps:
    - S1: On any time change, recompute duration label
    - S2: If times cross day boundary, clamp and show brief message
  - MCP:
    - Sequential Thinking (REQUIRED): Specify duration calc (hours/min), clamping messages, and test matrix.
    - Context7 (NOT NEEDED): No external API.
  - Gate: STOP after P2d. Ask the user to say 'proceed' to continue. Confirm duration text for several cases.

- P2e: Validation + disabled Save (D3 → F-004-AC3)
  - Goal: Enforce Zod checks and disable Save until valid
  - Steps:
    - S1: Validate via `taskSchema` (end > start, same day, requireds)
    - S2: Show toast on invalid; keep inline UI unchanged; disable Save button until valid
  - MCP:
    - Sequential Thinking (REQUIRED): Map UI → `taskSchema` fields; define disabled-state transitions and error toast copy.
    - Context7 (NOT NEEDED): Zod usage is internal.
  - Gate: STOP after P2e. Ask the user to say 'proceed' to continue. Confirm disabled/enabled states.

- P2f: Work type mapping (D3 → F-004-AC3)
  - Goal: Map UI work types to Calendar color semantics
  - Steps:
    - S1: `maintenance → blue`, `project → yellow`, `client_visit → green`, `free_task → gray`
    - S2: Ensure mapping used in payload and compatible with Calendar coloring
  - MCP:
    - Sequential Thinking (OPTIONAL): Double-check mapping aligns with Calendar color expectations.
    - Context7 (NOT NEEDED).
  - Gate: STOP after P2f. Ask the user to say 'proceed' to continue. Validate mapping.
  - Entry criteria for P2a–P2f: P1 complete
  - Exit criteria: ACs satisfied: [F-004-AC2, F-004-AC3]

- P3a: Client selection modal (D4 → F-004-AC4)
  - Goal: Minimal, reusable client picker
  - Steps:
    - S1: Open modal/sheet when `Klant` input is pressed
    - S2: Render `ClientsScreen` in selection mode; on press set `clientId` + label
    - S3: Dismiss modal and reflect selected client in input
  - MCP:
    - Sequential Thinking (REQUIRED): Define minimal selection mode for `ClientsScreen`, prop contract, and dismissal behavior.
    - Context7 (OPTIONAL/REQUIRED if new modal library): If using RN modal or bottom-sheet libs, consult Context7 for API specifics; otherwise skip.
  - Gate: STOP after P3a. Ask the user to say 'proceed' to continue. Confirm selection flow.

- P3b: Save flow + error handling (D4, D5 → F-004-AC4, F-004-AC5)
  - Goal: Persist task and return to Calendar; handle errors gracefully
  - Steps:
    - S1: On Save, validate via `taskSchema`; if invalid, toast and abort
    - S2: Call `tasksRepository.create({ clientId, date, startAt, endAt, type, description })`
    - S3: Success → `router.back()`; Failure → toast/alert; keep state
    - S4: Calendar automatically reflects new task via existing observer
  - MCP:
    - Sequential Thinking (REQUIRED): Define success/error flows, toasts vs alerts per platform, and navigation timing.
    - Context7 (NOT NEEDED).
  - Gate: STOP after P3b. Ask the user to say 'proceed' to continue or close out after QA validation.
  - Entry criteria: P2a–P2f complete
  - Exit criteria: ACs satisfied: [F-004-AC4, F-004-AC5]

## Data & State
- Entities: `tasks` { ownerId, clientId, date, startAt, endAt, type, description, createdAt, updatedAt }
- Storage: Firestore via `tasksRepository` (`ownerId` and timestamps set server-side)
- UI State (controller): `clientId`, `clientLabel`, `startAt`, `endAt`, `type`, `description`, `durationLabel`, `isSaving`, `showStartPicker`, `showEndPicker`, `showClientPicker`

## UX Notes
- Time pickers: RN datetime picker in 24h mode; minute step 15–30; round values
- Duration text examples: "Duur: 1 uur", "Duur: 1 uur 30 min", "Duur: 45 min"
- Same-day constraint: clamp `endAt` to 23:59 if start at late hour; show brief message when clamped
- Copy: Dutch labels consistent with existing UI; reuse `Header`, `HourSelector`, `InfoCard`, `Input`, `TabSelection`, `Button`
- Work type → color mapping: blue/yellow/green/gray to match Calendar markers
 - Save button remains disabled until the form validates via `taskSchema`

## Risks / Rollback
- Risk: `@react-native-community/datetimepicker` API differences across platforms; mitigate with simple, tested props
- Risk: Client selection scope creep; mitigate by reusing `ClientsScreen` in modal selection mode, no new UI components
- Risk: Schema mismatch (`taskSchema` vs. UI); mitigate by validating at save and testing edge times
- Rollback Plan: If picker causes issues, use text-based HH:mm inputs with masking (temporary). If client selection unstable, allow manual clientId entry (hidden dev toggle) for local testing only.

## Definition of Done
- All ACs validated via manual QA checklist for F-004
- No unresolved deps or TODOs
- Reuse-first adhered to; only lightweight controller/modal added; no design deviations

## Execution Guardrails (for Dev Agent)
- Manual step gate enforced. Do not proceed past each gate without explicit user "proceed".
- Keep edits localized to `/(tabs)/calendar/index.tsx` (params verification only), `/(tabs)/calendar/new-task.tsx` (controller), and a small modal wrapper for client selection if needed
- No new external packages beyond `@react-native-community/datetimepicker` (if not already present)
- Context7 usage (when unsure): datetime picker API nuances, time rounding patterns; save any consulted notes under `docs/context7/` and cite
- Batch size: keep to ≤3–5 cohesive steps or ≤150 LOC across ≤3 files; otherwise split and STOP

## EXEC_NOTES (short)
- Route params already pushed from Calendar: `{ date, startAt }`
- `type` stored as color semantic for Calendar dot: blue/yellow/green/gray
- Index usage: queries in Calendar already order by `startAt`



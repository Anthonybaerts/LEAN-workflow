---
docType: implementation
id: F-016
phases: [P0, P1]
deliverables: [F-016-D1, F-016-D2]
acCoverage: [F-016-AC1, F-016-AC2, F-016-AC3]
generatedBy: implementation_planner
---

# Implementation — F-016 (Tasks: Edit — basic)

Links:
- Shard: PRD_Shard_F-016.md
- Index: MASTER_INDEX.yaml (F-016)

## Summary
Enable editing of core task fields (time range, client, type, description) from a dedicated full-screen edit route. Persist updates to Firestore via `tasksRepository.update` and return to `CalendarScreen`, which already live-subscribes to tasks and will reflect changes.

## Deliverables (trace to ACs)
- F-016-D1 → F-016-AC1: `EditTaskScreen` pre-fills form with existing task values
- F-016-D2 → F-016-AC2/AC3: Save flow updates Firestore; calendar reflects time changes immediately

## Phases (incremental, reference Deliverables & ACs)
- P0: Screen scaffolding + data load
  - Goal: Add route-level container that fetches task by id and mounts `EditTaskScreen` UI with pre-filled values
  - Steps:
    - S0: Route wiring
      - File exists: `vakkerUI/src/app/(tabs)/calendar/edit-task.tsx` (exports `EditTaskScreen`)
      - Replace placeholder with container logic using `useLocalSearchParams<{ id: string }>()` and `tasksRepository.getById(id)`
      - Derive initial UI props: `selectedDate` (nl label), `startTime`, `endTime`, `duration`, `selectedWorkType` (map from stored `type` via `resolveVariant`), `clientDisplay`
    - S1: Build `EditTaskScreen` UI
      - New file: `vakkerUI/src/ui/screens/EditTaskScreen/EditTaskScreen.tsx` (mirrors `NewTaskScreen` props where applicable)
      - Props parity: keep `HourSelector`, client inline list, work type selection, description field, and primary/secondary actions
      - Show header title "Taak Bewerken"; right action "Opslaan"; left back
    - S2: Form setup
      - Use `useZodForm(taskSchema)`; initialize from fetched task
      - Keep live sync when start/end change; enforce same-day and `endAt > startAt`
  - Entry criteria: None
  - Exit criteria: Route opens with given `id` and fields are pre-filled (AC1)
  - Micro Gate: STOP. Share brief notes and await "proceed" before save wiring.

- P1: Save flow + navigation
  - Goal: Update task and return to calendar; ensure UI refresh
  - Steps:
    - S1: Save handler
      - Call `tasksRepository.update(id, { clientId, date, startAt, endAt, type: resolveVariant(values.type), description: values.description || undefined })`
      - On success: toast success (reusing `useToast()`), then `router.back()`
      - On error: toast error with PRD-aligned copy
    - S2: Calendar reflection
      - No extra work: `CalendarScreen` already observes by date; when date or time changes, the task appears in the new time slot and disappears from the previous
      - Optional: if date changed, navigate back to calendar (existing behavior) is sufficient due to live subscription
  - Entry criteria: P0 approved
  - Exit criteria: AC2/AC3 met; correct updates and timeline position adjusted
  - Step Gate: STOP. Provide validation notes; request approval to close feature.

## Data & Compatibility
- No schema changes. Uses existing `tasksRepository.update` and `taskSchema` validation.
- Reuses `workTypeToVariant` and `resolveVariant` mapping used in creation screen.

## UX & Accessibility
- Mirror `NewTaskScreen` layout for consistency; dark theme tokens.
- Maintain 44px minimum touch targets; polite toasts on save/error.

## Risks / Rollback
- Risk: Editing date moves task across observed day; ensure timeline subscription reflects change (covered by existing live query).
- Rollback: Disable route navigation to edit; no data migration.

## Definition of Done
- Edit screen pre-fills existing task
- Save updates Firestore and navigates back
- Calendar reflects new time/date immediately

## Execution Guardrails (for Dev Agent)
- No new packages; reuse existing validation and tokens
- Keep changes localized to the edit route and new screen file
- Do not alter repository API



---
docType: implementation
id: F-008
phases: [P0, P1, P2, P3, P4]
deliverables: [F-008-D1, F-008-D2, F-008-D3]
acCoverage: [F-008-AC1, F-008-AC2, F-008-AC3, F-008-AC4, F-008-AC5]
generatedBy: implementation_planner
---

# Implementation — F-008 (Calendar: Day View)

Links:
- Shard: PRD_Shard_F-008.md
- Index: MASTER_INDEX.yaml (F-008)

## Deliverables (trace to ACs)
- F-008-D1 → F-008-AC1, F-008-AC3: CalendarScreen day timeline fed by Firestore tasks for selected date; updates on date change
- F-008-D2 → F-008-AC2, F-008-AC4: Tap empty time slot → navigate to NewTaskScreen with pre-selected time; working hours limited to 07:00–19:00
- F-008-D3 → F-008-AC5: Overlap layout algorithm for side-by-side events with "+N" overflow indicator

## Phases (incremental, reference Deliverables & ACs)
- P0: Dependencies & Setup (S0)
  - Goal: Ensure calendar libraries and data deps are ready
  - Steps:
    - S0: Deps & Setup check for calendar
      - Confirm `react-native-calendars` installed
      - Confirm `dayjs` nl locale, 24h
      - Confirm data layer read by date; nav to `NewTaskScreen`
      - Ensure theming via vakkerUI tokens
  - Entry criteria: F-001, F-005, F-006 available
  - Exit criteria: Ready to implement CalendarScreen logic
  - Step Gate: STOP after S0

- P1: Month calendar header and date selection (D1 → F-008-AC3)
  - Goal: Month grid displays; selecting a day updates `selectedDate`
  - Steps:
    - S1: Render `react-native-calendars` month grid with chevrons
    - S2: Wire `onDayPress` → set `selectedDate`
    - S3: Persist selection in component state only (no Redux)
  - Entry criteria: P0 complete
  - Exit criteria: AC partial satisfied (date changes trigger timeline refresh later)
  - Step Gate: STOP after P1

- P2: Day timeline 07:00–19:00 (D1, D2 → F-008-AC1, F-008-AC4)
  - Goal: Render 30-min rows with working-hours constraint and show tasks for selected date
  - Steps:
    - S1: Maintain `selectedDate` (dayjs) default today
    - S2: Observe/read tasks for `selectedDate`; store unsubscribe; remount on date change/unmount
    - S3: Render rows 07:00–19:00 using `TimeSlot`; map tasks to `EventBlock`
  - Entry criteria: P1 complete
  - Exit criteria: ACs satisfied: [F-008-AC1, F-008-AC4]
  - Step Gate: STOP after P2

- P3: Tap-to-add navigation (D2 → F-008-AC2)
  - Goal: Tapping empty slot opens `NewTaskScreen` pre-filled
  - Steps:
    - S1: On empty slot press, navigate with params `{ date, startAt }`
    - S2: Add optional current-time indicator when `selectedDate` is today
  - Entry criteria: P2 complete
  - Exit criteria: AC satisfied: [F-008-AC2]
  - Step Gate: STOP after P3

- P4: Overlap layout and "+N" overflow (D3 → F-008-AC5)
  - Goal: Side-by-side overlapping events with overflow count
  - Steps:
    - S1: Assign columns by scanning tasks sorted by start, pushing overlaps right
    - S2: Cap visible columns (2–3); compute "+N" for overflow
    - S3: Ensure task type → color mapping via tokens
  - Entry criteria: P3 complete
  - Exit criteria: AC satisfied: [F-008-AC5]
  - Step Gate: STOP after P4

## Data & State
- Entities: `tasks` (ownerId, date, startAt, endAt, type)
- State: `selectedDate`; tasks list; derived layout columns

## UX Notes
- Reuse `Header`, `TimeSlot`, `EventBlock`, `TabButton`
- Locale: nl-NL; 24-hour; week starts Monday
- Working hours: 07:00–19:00
- Color mapping: `TASK_TYPE_TO_COLOR` constant; `EventBlock` variant from mapping

## Risks / Rollback
- Risks: performance on dense days; overlap edge cases
- Rollback: limit columns to 2; omit "+N" temporarily

## Definition of Done
- All ACs validated in QA doc
- No unresolved deps
- Reuse-first: existing `@ui/screens` and components; tokens for theming

## Execution Guardrails (for Dev Agent)
- No week view/drag-resize/recurrence in this feature
- Use `react-native-calendars` for month grid; unsubscribe observers on date change/unmount
- Keep overlap algorithm simple and documented; consult Context7 for patterns if needed

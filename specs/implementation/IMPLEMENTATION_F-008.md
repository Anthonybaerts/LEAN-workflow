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


### Screen Overview (what the user experiences)
- Landing: A calendar month grid at the top and a day timeline below.
- Selecting a date: Tapping a day in the month grid updates the timeline to that date.
- Viewing tasks: The 07:00–19:00 timeline shows colored `EventBlock`s at their time slots; overlapping tasks appear side-by-side with a "+N" overflow label if needed.
- Adding a task: Tapping an empty slot starts the task creation flow (or shows a “coming soon” toast until the create screen is ready).


## Phases (incremental, reference Deliverables & ACs)
- P0: Dependencies & Setup (S0)
  - Goal: Ensure calendar libraries and data deps are ready
  - Steps:
    - S0: Deps & Setup check for calendar
      - Confirm `react-native-calendars` installed
      - Confirm `dayjs` nl locale, 24h
      - Confirm `tasksRepository.listByDate` and `tasksRepository.observeListByDate` exist; if missing → STOP and run P2 in sample-data mode only
      - Verify navigation route to `NewTaskScreen` (F-004). If absent → P3 is conditional (toast/stub route)
      - Ensure theming via vakkerUI tokens
      - Context7 MCP: Verify expo-router route patterns for calendar deep links and tab/stack nesting best practices
      - Sequential Thinking MCP: Map prerequisites → phases, identify gates and fallback paths (live vs sample)
  - Entry criteria: F-001, F-005, F-006 available
  - Exit criteria: Gates resolved (repo present yes/no; NewTask route present yes/no) and mode decided (live vs sample)
  - Step Gate: STOP after S0

- P1: Month calendar header and date selection (D1 → F-008-AC3)
  - Goal: Month grid displays; selecting a day updates `selectedDate`
  - Steps:
    - S1: Render `react-native-calendars` month grid with chevrons
    - S2: Wire `onDayPress` → set `selectedDate`
    - S3: Persist selection in component state only (no Redux)
    - S4: Context7 MCP REQUIRED: Review `react-native-calendars` Calendar setup (props, theming with vakkerUI tokens, month navigation, marked dates, locale config for nl-NL) and confirm best practices before wiring
    - S5: Sequential Thinking MCP: Decide how marked dates and selected day state interact with observer refresh to avoid double renders
  - Entry criteria: P0 complete
  - Exit criteria: AC partial satisfied (date changes trigger timeline refresh later)
  - Step Gate: STOP after P1

- P2: Day timeline 07:00–19:00 (D1, D2 → F-008-AC1, F-008-AC4)
  - Goal: Render 30-min rows with working-hours constraint and show tasks for selected date
  - Steps:
    - S1: Maintain `selectedDate` (dayjs) default today
    - S2: Data mode
      - If repo present: start `unsubscribe = tasksRepository.observeListByDate(date, undefined, setTasks)`; on date change: call `unsubscribe()` before starting the next; on unmount: call `unsubscribe()`
      - If repo missing: load stable sample data and annotate EXEC_NOTES that AC1 is partially covered pending repo
    - S3: Render rows 07:00–19:00 using `TimeSlot`; map tasks to `EventBlock`
    - S4: Sequential Thinking MCP REQUIRED: Define data flow (date → query param → observer → view model mapping), lifecycle for `unsubscribe`, and date/time formatting (`YYYY-MM-DD` storage vs `DD-MM-YYYY` display). Note performance tactics (memoization, stable keys)
    - S5: Context7 MCP: Check recommended virtualization/perf notes for long lists in RN and any `react-native-calendars` perf flags
  - Entry criteria: P1 complete
  - Exit criteria: ACs satisfied: [F-008-AC1, F-008-AC4]
  - Step Gate: STOP after P2

- P3: Tap-to-add navigation (D2 → F-008-AC2)
  - Goal: Tapping empty slot opens `NewTaskScreen` pre-filled
  - Steps:
    - S1: Param contract: `{ date: 'YYYY-MM-DD', startAt: 'HH:mm' }`
    - S2: If `NewTaskScreen` route exists (F-004 ready): navigate with params `{ date, startAt }`
    - S3: If not ready: show toast "Taak aanmaken binnenkort beschikbaar" and mark AC2 pending; behind a feature flag `enableTaskCreate`
    - S4: Context7 MCP: Verify expo-router param typing and route construction for nested tab/stack paths (calendar stack) and deep link parity
    - S5: Sequential Thinking MCP: Validate the UX fallback (toast) and how AC2 status is tracked until F-004
  - Entry criteria: P2 complete
  - Exit criteria: AC satisfied: [F-008-AC2]
  - Step Gate: STOP after P3

- P4: Overlap layout and "+N" overflow (D3 → F-008-AC5)
  - Goal: Side-by-side overlapping events with overflow count
  - Steps:
    - S1: Assign columns by scanning tasks sorted by start, pushing overlaps right
    - S2: Cap visible columns (2–3); compute "+N" for overflow
    - S3: Ensure task type → color mapping via tokens
    - S4: Sequential Thinking MCP REQUIRED: Choose overlap strategy (interval partitioning), decide column cap and "+N" threshold, and document edge cases across slot boundaries
    - S5: Context7 MCP: Review interval layout references for RN calendar UIs to confirm a minimal, readable approach
  - Entry criteria: P3 complete
  - Exit criteria: AC satisfied: [F-008-AC5]
  - Step Gate: STOP after P4

## Data & State
- Entities: `tasks` (ownerId, date, startAt, endAt, type)
- State: `selectedDate`; tasks list; derived layout columns
 - Conventions: `date` stored as `YYYY-MM-DD`; `startAt/endAt` as `HH:mm` (local time)
 - Conventions: `date` stored as `YYYY-MM-DD` (ISO for sorting/queries) and passed in params; UI displays dates as `DD-MM-YYYY` (NL/BE) using `dayjs(date).format('DD-MM-YYYY')`. `startAt/endAt` use `HH:mm` (24h local time)

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
- Do not modify `@ui/screens` implementations; create an app-level container (e.g., `CalendarContainer`) that composes library components and wires data/handlers
- No week view/drag-resize/recurrence in this feature
- Use `react-native-calendars` for month grid; always store and call `unsubscribe()` on date change and on unmount
- Keep overlap algorithm simple and documented; consult Context7 for patterns if needed
- Performance: memoize slot rows and event mapping; keep renders stable; avoid heavy recalculation in observers

### Mandatory MCP Checkpoints
- Context7 MCP (P0 S0): expo-router deep links and tab/stack nesting patterns.
- Sequential Thinking MCP (P0 S0): Prereqs → phases mapping and fallback modes.
- Context7 MCP (P1 S4): `react-native-calendars` Calendar setup, theming, and locale.
- Sequential Thinking MCP (P1 S5): Marked dates vs observer refresh.
- Sequential Thinking MCP (P2 S4): Data flow, observer lifecycle, and formatting.
- Context7 MCP (P2 S5): RN perf/virtualization tips and any calendar perf flags.
- Context7 MCP (P3 S4): expo-router param typing for nested routes + deep link parity.
- Sequential Thinking MCP (P3 S5): AC2 fallback UX and status tracking until F-004.
- Sequential Thinking MCP (P4 S4): Overlap strategy and edge-case handling.
- Context7 MCP (P4 S5): References for minimal interval layout patterns.

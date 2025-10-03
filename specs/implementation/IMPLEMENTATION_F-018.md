---
docType: implementation
id: F-018
phases: [P0, P1, P2, P3]
deliverables: [F-018-D1, F-018-D2, F-018-D3]
acCoverage: [F-018-AC1, F-018-AC2, F-018-AC3, F-018-AC4, F-018-AC5]
generatedBy: implementation_planner
---

# Implementation — F-018 (Calendar: Timeline Adoption)

Links:
- Shard: PRD_Shard_F-018.md
- Index: MASTER_INDEX.yaml (F-018)

## Deliverables (trace to ACs)
- F-018-D1 → F-018-AC1, F-018-AC2: Integrate `react-native-calendars` `TimelineList`; ensure overlaps side-by-side and initial focus ~07:00 with smooth scroll.
- F-018-D2 → F-018-AC3: Tap interactions — empty background → NewTask prefilled with date/time; event tap → open details.
- F-018-D3 → F-018-AC4, F-018-AC5: Theme alignment with vakkerUI tokens; map colors by task type; parity QA checklist completed; rollback plan documented (no flag).

## Phases (incremental, reference Deliverables & ACs)
- P0: Dependencies & Setup (S0)
  - Goal: Confirm calendar provider setup
  - Steps:
    - S0: Deps & Setup check
      - Verify `react-native-calendars` present and version compatible with `TimelineList`
      - Confirm `CalendarProvider`/`ExpandableCalendar` scaffold in `CalendarScreen` (or add minimal wrapper)
  - Entry criteria: F-001, F-006, F-008 available per shard deps
  - Exit criteria: Deps ready; otherwise STOP and request update
  - Step Gate: After P0, STOP. Dev agent must ask to proceed before edits.
  - MCP (REQUIRED): Context7 — Review TimelineList docs and provider wiring patterns; save notes to `docs/context7/` before proceeding.

- P1: Integrate TimelineList (D1 → F-018-AC1, F-018-AC2)
  - Goal: Render timeline with correct initial focus and overlaps
  - Includes: [F-018-D1] → [F-018-AC1, F-018-AC2]
  - Steps:
    - S1: Mount `TimelineList` within `CalendarProvider`
    - S2: Map Firestore tasks to events: start/end from `date`, `startAt`, `endAt` (fallback 60 min if `endAt` absent)
    - S3: Ensure overlaps render side-by-side (verify library default behavior; adjust event keys)
    - S4: Set initial visible time ~07:00 and validate smooth scrolling
  - Entry criteria: deps met
  - Exit criteria: Timeline renders with correct layout and initial focus
  - Step Gate: After P1, STOP. Dev agent must ask to proceed.
  - MCP (REQUIRED): Sequential Thinking — Define precise mapping rules for time parsing/formatting and overlap behavior; identify edge cases (missing `endAt`). Attach the micro-plan to the execution notes before coding.
  - MCP (REQUIRED): Context7 — Confirm supported props for initial visible time and overlap behavior in the current `react-native-calendars` version.

- P2: Interactions (D2 → F-018-AC3)
  - Goal: Implement taps for empty slots and events
  - Includes: [F-018-D2] → [F-018-AC3]
  - Steps:
    - S1: Empty background tap → navigate to `NewTaskScreen` with date/time prefilled
    - S2: Event tap → open task details (or EditTask when available; otherwise stub/log)
    - S3: Confirm back behavior returns to `CalendarScreen`
  - Entry criteria: P1 complete
  - Exit criteria: Interactions work per ACs
  - Step Gate: After P2, STOP. Dev agent must ask to proceed.
  - MCP (REQUIRED): Context7 — Consult example handlers for TimelineList taps and navigation param typing with Expo Router; cite links/snippets in `docs/context7/`.
  - MCP (REQUIRED): Sequential Thinking — Draft a quick interaction flow (empty tap → NewTask; event tap → details) and back behavior across nested stacks.

- P3: Theming & Parity QA (D3 → F-018-AC4, F-018-AC5)
  - Goal: Align theme and color mapping; run parity QA
  - Includes: [F-018-D3] → [F-018-AC4, F-018-AC5]
  - Steps:
    - S1: Apply vakkerUI tokens to Timeline (colors/typography spacing where supported)
    - S2: Map task types → colors (Onderhoud=blue, Project=yellow, Bezoek=green, Vrije Taak=gray)
  - Entry criteria: P2 complete
  - Exit criteria: Theme aligned; parity QA complete
  - Step Gate: After P3, STOP. Dev agent must ask to proceed.
  - MCP (REQUIRED): Sequential Thinking — Define parity checklist vs. current custom timeline and sign-off criteria; include measurable checks (overlaps, initial focus, scroll smoothness, colors).
  - MCP (REQUIRED): Context7 — Verify theming hooks/customization points for TimelineList to align with vakkerUI tokens.

## Data & State
- Entities: tasks (start/end, type, description)
- Storage: Firestore via existing repositories (read-only consumption)
- State: Local mapping of tasks → events for TimelineList

## UX Notes
- Maintain existing month header; ensure smooth scroll and readable density
- Empty day should not look broken; background tap still opens NewTask

## Risks / Rollback
- Risks:
  - Library timeline behavior differs from custom timeline (edge rendering)
  - Time parsing errors for locales/timezones
- Rollback Plan:
  - If parity issues arise, revert the integration commit to restore previous timeline; keep previous implementation in VCS history (no runtime flag)

## Definition of Done
- All ACs validated in QA doc
- No unresolved deps
 - Parity QA passed; integration stable without fallback flag

## Execution Guardrails (for Dev Agent)
- Manual step gate enforced; after each phase, STOP and request explicit "proceed" before continuing.
- MCP USAGE IS MANDATORY where marked (REQUIRED). Attach outputs to the run’s notes:
  - Context7: paste key links/snippets and brief takeaways.
  - Sequential Thinking: include a 3–5 bullet micro-plan per required point.



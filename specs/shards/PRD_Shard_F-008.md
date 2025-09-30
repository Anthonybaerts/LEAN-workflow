---
docType: prd_shard
features: [F-008]
deps: [F-001, F-005, F-006]
screens: [CalendarScreen]
anchors: [calendar-day-view]
generatedBy: shard_generator
---

# PRD Shard: Calendar: Day View (F-008)

## Source
- MASTER_PRD.md#calendar-day-view
- Sequence position: 8 of 16 in build order
- Generated: 2025-09-22

## Story & Context
Technicians need to see their daily schedule and available time slots.

## Scope & Requirements
- CalendarScreen timeline with color-coded tasks from Firestore; tap slot to add.

## Acceptance Criteria
- F-008-AC1: Given tasks exist for selected date, when CalendarScreen loads, then tasks display in correct time slots with proper color coding.
- F-008-AC2: Given user taps an empty time slot, when tap occurs, then NewTaskScreen opens with that time pre-selected.
- F-008-AC3: Given user changes date, when date selection changes, then timeline updates to show tasks for the new date.
- F-008-AC4: Given the agenda view is displayed, when time grid renders, then working hours are limited to 07:00–19:00 (MVP default).
- F-008-AC5: Given two or more tasks overlap in time, when rendered, then they are shown side-by-side within the slot; if more tasks overflow, a "+N" indicator is displayed.

## Dependencies & Context
- Depends on F-001 (Auth), F-005 (Navigation), F-006 (Storage & Data Layer).

## Dependencies (Libraries & Setup)
- Libraries referenced in PRD for this feature:
  - `react-native-calendars` for month grid + day agenda
- Config requirements (from PRD context):
  - Theming aligned with vakkerUI tokens
  - Locale: nl-NL; 24-hour format; week starts on Monday
  - Time grid working hours: 07:00–19:00

## Screens & Components (if applicable)
- Screens: [CalendarScreen]
- Components: [Header, TimeSlot, EventBlock, TabButton]

## Build Context
- Position: step 8 of 16
- Next features in pipeline: F-010 (Clients: View Details)

## Out of Scope
- All-day tasks (not supported in MVP).

## Risks & Considerations
- Calendar integration and customization; ensure performance and correct overlap rendering.



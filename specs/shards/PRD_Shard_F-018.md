---
docType: prd_shard
features: [F-018]
deps: [F-001, F-006, F-008]
screens: [CalendarScreen]
anchors: [calendar-timeline-adoption]
generatedBy: shard_generator
---

# PRD Shard: Calendar: Timeline Adoption (F-018)

## Source
- MASTER_PRD.md#calendar-timeline-adoption
- Sequence position: 11 of 16 in build order
- Generated: 2025-10-03

## Story & Context
Adopt the built-in Timeline from `react-native-calendars` to accelerate delivery and reduce custom timeline maintenance while preserving UX parity.

## Scope & Requirements
- Replace custom FlatList day timeline with library `TimelineList` under a feature flag.
- Maintain month header; map `TaskEntity` to timeline events.

## Acceptance Criteria
- F-018-AC1: Overlapping tasks render side-by-side in the day timeline.
- F-018-AC2: Initial view focuses around 07:00; timeline scrolls smoothly through the day.
- F-018-AC3: Tapping empty background opens NewTask prefilled with date/time; tapping an event opens details.
- F-018-AC4: Theming aligns with vakkerUI tokens; colors map to task types.
- F-018-AC5: Feature is gated behind a flag; parity QA passes before enabling by default.

## Dependencies & Context
- Depends on F-001 (Auth), F-006 (Storage & Data Layer), F-008 (Calendar Day View baseline).

## Dependencies (Libraries & Setup)
- Libraries referenced:
  - `react-native-calendars` (CalendarProvider/ExpandableCalendar/TimelineList)
- Config requirements:
  - Ensure proper theming alignment with vakkerUI tokens
  - Confirm gesture/animation libs configured from earlier features

## Screens & Components (if applicable)
- Screens: [CalendarScreen]
- Components: [Header, TimeSlot, EventBlock, Tag]

## Build Context
- Position: step 11 of 16
- Next features in pipeline: F-003 (Clients: Create)

## Out of Scope
- Drag/resize events, week view, recurring rules

## Risks & Considerations
- Parity gaps between custom timeline and library TimelineList (tap targets, overlaps)
- Potential performance differences on large datasets



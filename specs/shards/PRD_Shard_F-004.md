---
docType: prd_shard
features: [F-004]
deps: [F-001, F-005, F-006, F-007, F-008]
screens: [NewTaskScreen]
anchors: [tasks-create]
---

# PRD Shard: Tasks — Create (F-004)

## Source
- MASTER_PRD.md#tasks-create
- Sequence position: 11 of 16 in build order
- Generated: 2025-09-22

## Summary
From Calendar, tapping an empty time slot opens NewTask prefilled with the slot’s date/time. Top time buttons show start = tapped time and end = start + 1h; tapping either button opens the React Native datetime picker to adjust. On save, task is written to Firestore and returns to Calendar.

## Acceptance Criteria
- F-004-AC1: Empty-slot tap → navigate to NewTask with params `{ date: 'YYYY-MM-DD', startAt: 'HH:mm', endAt: 'HH:mm(+1h)' }`.
- F-004-AC2: NewTask shows the two time buttons with those values; tapping a button opens the RN datetime picker (24h; 15–30 min step).
- F-004-AC3: Duration auto-updates when times change; validation blocks save if `endAt <= startAt` or not same day.
- F-004-AC4: On successful save, task is persisted to Firestore and calendar refreshes for that date.
- F-004-AC5: On failure, show toast and keep form state.

## Scope & Data
- Entity: `tasks` { ownerId, clientId, date, startAt, endAt, type, description, createdAt, updatedAt }.
- Set `ownerId = auth.currentUser.uid`; server timestamps on create/update.
- Indices already defined: (ownerId, date, startAt) and (ownerId, clientId, startAt).

## Non-goals
- Editing existing tasks (covered by F-016).
- Drag/resize on the timeline.
- Week view or recurring rules.

## Notes
- Calendar emits empty-slot taps; event-block taps open EditTask in F-016.
- Use `@react-native-community/datetimepicker` (24h).



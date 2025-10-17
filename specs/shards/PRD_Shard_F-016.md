---
docType: prd_shard
features: [F-016]
deps: [F-004, F-008, F-007]
screens: [EditTaskScreen]
anchors: [tasks-edit-basic]
generatedBy: shard_generator
---

# PRD Shard: Tasks: Edit (basic) (F-016)

## Source
- MASTER_PRD.md#tasks-edit-basic
- Sequence position: 17 of 17 in build order
- Generated: 2025-10-10

## Story & Context
Task details may need adjustment after initial creation. Users should be able to edit core fields quickly.

## Scope & Requirements
- Edit time range, client, type, and description in full-screen edit screen.
- Save updates to Firestore and return to CalendarScreen.

## Acceptance Criteria
- F-016-AC1: Given user taps existing task, when EditTaskScreen opens, then current task data pre-fills form fields.
- F-016-AC2: Given user modifies task and saves, when save completes, then Firestore updates and CalendarScreen reflects changes.
- F-016-AC3: Given user changes task time, when saved, then task moves to the new time slot in calendar view.

## Dependencies & Context
- Depends on F-004 (Tasks: Create), F-008 (Calendar: Day View), and F-007 (Form Validation).

## Dependencies (Libraries & Setup)
- Firebase JS SDK (Firestore); React Hook Form + Zod for validation.

## Screens & Components (if applicable)
- Screens: [EditTaskScreen]
- Components: [Header, HourSelector, Input, Button, TabSelection]

## Out of Scope
- Editing or splitting multi-day tasks (not supported in MVP).

## Risks & Considerations
- Ensure `endAt > startAt` and both within the same day; handle overlapping tasks gracefully.





---
docType: prd_shard
features: [F-010]
deps: [F-002, F-005, F-006]
screens: [ClientInfoScreen]
anchors: [clients-view-details]
generatedBy: shard_generator
---

# PRD Shard: Clients: View Details (F-010)

## Source
- MASTER_PRD.md#clients-view-details
- Sequence position: 9 of 16 in build order
- Generated: 2025-09-22

## Story & Context
Technicians need detailed client information including contact details, task history, and notes.

## Scope & Requirements
- ClientInfoScreen with contact, recent tasks, notes pulled from Firestore.

## Acceptance Criteria
- F-010-AC1: Given user taps a client card, when ClientInfoScreen opens, then contact details, recent tasks, and notes display.
- F-010-AC2: Given client has recent tasks, when screen loads, then RecentTasksCard shows last tasks with dates and status.
- F-010-AC3: Given user taps action buttons (Call, Email, Add Task), when tapped, then appropriate action is triggered.

## Dependencies & Context
- Depends on F-002 (Clients: List & Search), F-005 (Navigation Setup), F-006 (Storage & Data Layer).

## Dependencies (Libraries & Setup)
- Libraries referenced in PRD for this feature:
  - Firebase JS SDK (Firestore) for client details and task queries
- Config requirements (from PRD context):
  - Ensure appropriate Firestore indexes for per-client task queries

## Screens & Components (if applicable)
- Screens: [ClientInfoScreen]
- Components: [Header, ClientBanner, Button, ContactDetailsCard, RecentTasksCard, NotesCard]

## Build Context
- Position: step 9 of 16
- Next features in pipeline: F-003 (Clients: Create)

## Out of Scope
- Edit flows (handled by F-015)

## Risks & Considerations
- Data shape consistency across client and task entities; navigation back behavior must align with PRD.



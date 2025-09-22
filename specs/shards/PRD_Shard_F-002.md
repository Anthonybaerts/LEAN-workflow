---
docType: prd_shard
features: [F-002]
deps: [F-001, F-005, F-006]
screens: [ClientsScreen]
anchors: [clients-list-search]
generatedBy: shard_generator
---

# PRD Shard: Clients: List & Search (F-002)

## Source
- MASTER_PRD.md#clients-list-search
- Sequence position: 5 of 16 in build order
- Generated: 2025-09-22

## Story & Context
Technicians need to quickly find and access client information to manage their work.

## Scope & Requirements
- View searchable list of clients using CustomerCard; data sourced from Firebase Firestore.

## Acceptance Criteria
- F-002-AC1: Given clients exist in Firestore, when user opens ClientsScreen, then all clients display in a scrollable list with CustomerCards.
- F-002-AC2: Given user types in the search bar, when input matches part of a name/company, then results filter in real time.
- F-002-AC3: Given no clients match search, when search completes, then an EmptyState card displays with a friendly message.

## Dependencies & Context
- Depends on F-001 (Auth), F-005 (Navigation), F-006 (Storage & Data Layer).

## Dependencies (Libraries & Setup)
- Libraries referenced in PRD for this feature:
  - Firebase JS SDK (Firestore) for clients collection reads
- Config requirements (from PRD context):
  - Firestore indexes for efficient queries (clients: (ownerId, name))
  - Data access goes through storage/data layer established in F-006

## Screens & Components (if applicable)
- Screens: [ClientsScreen]
- Components: [Header, Input, CustomerCard, TabButton, RoundButton]

## Build Context
- Position: step 5 of 16
- Next features in pipeline: F-007 (Form Validation), F-009 (State Management)

## Out of Scope
None specified in feature section.

## Risks & Considerations
None specified in feature section.



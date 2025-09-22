---
docType: prd_shard
features: [F-006]
deps: [F-001]
screens: []
anchors: [storage-data-layer]
generatedBy: shard_generator
---

# PRD Shard: Storage & Data Layer (F-006)

## Source
- MASTER_PRD.md#storage-data-layer
- Sequence position: 4 of 16 in build order
- Generated: 2025-09-21

## Story & Context
App needs persistent data storage for clients and tasks.

## Scope & Requirements
- Firebase Firestore for storage; optional caching via Redux thunks/React Query; local persistence for offline reads.

## Acceptance Criteria
- F-006-AC1: Given user creates/edits data, when saved, then changes persist to Firestore.
- F-006-AC2: Given app is offline, when user views previously loaded data, then cached data displays.
- F-006-AC3: Given app reconnects online, when data sync occurs, then local changes upload to Firestore.

## Dependencies & Context
- Depends on F-001 (Auth) for per-user data isolation and authenticated access.

## Dependencies (Libraries & Setup)
- Libraries referenced in PRD for this feature:
  - Firebase JS SDK: `firebase/app`, `firebase/auth`, `firebase/firestore` (with offline persistence)
  - Optional state tools: Redux Toolkit + React Redux (thunks or RTK Query)
- Config requirements (from PRD context):
  - Firebase project configuration available via app config/env
  - Firestore security rules enforce `request.auth.uid == resource.data.ownerId`
  - Suggested indexes (from PRD Data Model):
    - tasks: (ownerId, date)
    - tasks: (ownerId, clientId, startAt)
    - clients: (ownerId, name)

## Screens & Components (if applicable)
- Screens: []

## Build Context
- Position: step 4 of 16
- Next features in pipeline: F-002 (Clients: List & Search)

## Out of Scope
- UI screens or forms; this feature focuses on data layer and persistence utilities.

## Risks & Considerations
- Firebase setup and data model design; security rules must correctly enforce per-user isolation.



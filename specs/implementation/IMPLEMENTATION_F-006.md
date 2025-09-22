---
docType: implementation
id: F-006
phases: [P0, P1, P2]
deliverables: [F-006-D1, F-006-D2, F-006-D3]
acCoverage: [F-006-AC1, F-006-AC2, F-006-AC3]
generatedBy: implementation_planner
---

# Implementation — F-006 (Storage & Data Layer)

Links:
- Shard: PRD_Shard_F-006.md
- Index: MASTER_INDEX.yaml (F-006)

## Deliverables (trace to ACs)
- F-006-D1 → F-006-AC1: Firestore client and repository utilities for clients/tasks; create/edit writes persist
- F-006-D2 → F-006-AC2: Offline persistence enabled for Firestore in React Native; reads use cached data when offline
- F-006-D3 → F-006-AC3: Reconnect sync behavior validated; pending local changes upload on network restore

## Phases (incremental, reference Deliverables & ACs)
- P0: Dependencies & Setup (S0)
  - Goal: Ensure Firebase Firestore is correctly configured for RN with persistence
  - Steps:
    - S0: Deps & Setup check for data layer
      - Verify `firebase` v9+ modular SDK present (`app`, `auth`, `firestore`)
      - Install `@react-native-async-storage/async-storage` (required for RN Firestore persistence)
      - Confirm Firebase web config from `app.config.ts` is available (Env/ClientEnv)
      - Plan security rules: enforce `request.auth.uid == resource.data.ownerId` (document only)
      - Note required composite indexes (from PRD): tasks (ownerId,date), tasks (ownerId,clientId,startAt), clients (ownerId,name)
  - Entry criteria: F-001 Auth available (dependency)
  - Exit criteria: Deps/config ready; otherwise STOP and request update to Global Pre-flight
  - Step Gate: After S0, STOP and await "proceed" before code edits

- P1: Firestore initialization + repositories (D1 → F-006-AC1)
  - Goal: Initialize Firestore with per-user scoping and implement basic repositories
  - Steps:
    - S1: Update `vakkerUI/src/services/firebase.ts` to initialize Firestore once with RN persistence (plan):
      - Use `initializeApp(...)` (already present) and `initializeFirestore(app, { persistence: getReactNativePersistence(AsyncStorage) })`
      - Export a singleton `firestore()` accessor reusing the initialized instance
    - S2: Create repository utilities (plain functions) for entities:
      - `clientsRepository`: `create`, `update`, `getById`, `listByOwnerId`
      - `tasksRepository`: `create`, `update`, `getById`, `listByDate`, `listByClientId`
      - Ensure `ownerId` is set from `Firebase.auth().currentUser?.uid` on writes
    - S3: Implement basic validation guards (required fields) and return typed results
  - Entry criteria: deps met
  - Exit criteria: AC satisfied: [F-006-AC1]
  - Step Gate: After P1 edits, STOP. Provide quick usage examples and await "proceed" before P2

- P2: Offline persistence and reconnect sync (D2, D3 → F-006-AC2, F-006-AC3)
  - Goal: Enable offline reads and verify automatic sync of local writes on reconnect
  - Steps:
    - S1: Ensure RN persistence is active (via `getReactNativePersistence(AsyncStorage)`) and document behavior
    - S2: Add listeners (`onSnapshot`) in repository read helpers to transparently receive cached data when offline
    - S3: Validate offline flow: disable network → read cached data; create/update queues locally
    - S4: Validate reconnect: re-enable network → queued writes upload; snapshots reflect server state
  - Entry criteria: P1 complete
  - Exit criteria: ACs satisfied: [F-006-AC2, F-006-AC3]
  - Step Gate: After P2 edits, STOP. Provide test instructions and await user validation

## Data & State
- Entities (from PRD):
  - clients: id, ownerId, type, name, email, phone, addressLine, postalCode, city, notes, createdAt, updatedAt
  - tasks: id, ownerId, clientId, date, startAt, endAt, type, description, createdAt, updatedAt
- Storage:
  - Firebase Firestore (RN persistence using AsyncStorage)

## UX Notes
- No UI screens included in this feature; data layer only. Downstream features (F-002, F-008, F-004) will consume repositories.

## Risks / Rollback
- Risks:
  - RN Firestore persistence configuration differences across SDK versions
  - Missing indexes may cause query failures in production
- Rollback Plan:
  - If persistence causes issues, fall back to memory persistence temporarily and document limitation

## Definition of Done
- All ACs validated in QA doc
- No unresolved deps
- Repositories documented with example usage and owner scoping

## Execution Guardrails (for Dev Agent)
- Manual step gate enforced; do not proceed past each gate without explicit user "proceed".
- No new packages beyond those listed; if additional deps are required, STOP and request approval.
- Reuse-first: Keep logic in `src/services/` and simple repository helpers; do not introduce global state (Redux is F-009).
- Context7 usage (when unsure): Firestore RN persistence configuration (`initializeFirestore` + `getReactNativePersistence(AsyncStorage)`), snapshot listeners, and offline behavior. Save any consulted notes under `docs/context7/` and cite in EXEC_NOTES.

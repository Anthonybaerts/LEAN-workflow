---
docType: implementation
id: F-010
phases: [P0, P1, P2, P3]
deliverables: [F-010-D1, F-010-D2, F-010-D3]
acCoverage: [F-010-AC1, F-010-AC2, F-010-AC3]
generatedBy: implementation_planner
---

# Implementation — F-010 (Clients: View Details)

Links:
- Shard: PRD_Shard_F-010.md
- Index: MASTER_INDEX.yaml (F-010)

## Deliverables (trace to ACs)
- F-010-D1 → F-010-AC1: Wire `ClientInfoScreen` to Firestore data (client details, notes, recent tasks) using repositories; replace mock data; params from route.
- F-010-D2 → F-010-AC2: Implement recent tasks section backed by `tasksRepository.listByClientId/observeListByClientId` with basic status/date formatting.
- F-010-D3 → F-010-AC3: Hook up action buttons (Call, Email, Add Task) to platform actions or navigation targets.

## Phases (incremental, reference Deliverables & ACs)
- P0: Dependencies & Setup (S0)
  - Goal: Ensure data and navigation prerequisites exist for this feature
  - Steps:
    - S0: Deps & Setup check
      - Verify `clientsRepository` and `tasksRepository` exist and expose `getById/observeById` and `listByClientId/observeListByClientId` (present).
      - Confirm RN permissions: none required beyond default for tel/mailto intents.
      - Confirm routes exist for Clients stack and `client-info` screen (present);
        typed param `clientId` available via `useLocalSearchParams`.
  - Entry criteria: F-002, F-005, F-006 available per shard deps
  - Exit criteria: All prerequisites confirmed; otherwise STOP and request update to dependencies
  - Step Gate: After P0, STOP. Dev agent must ask to proceed before edits.

- P1: Data wiring for ClientInfoScreen (D1 → F-010-AC1)
  - Goal: Replace sample data with live Firestore-backed data using repositories
  - Includes: [F-010-D1] → [F-010-AC1]
  - Steps:
    - S1: Update `vakkerUI/src/app/(tabs)/clients/[clientId]/index.tsx` to pass `clientId` as prop to `ClientInfoScreen`.
    - S2: In `ClientInfoScreen`, read `clientId` prop; add `useEffect` to subscribe via `clientsRepository.observeById(clientId, ...)` and set local state; ensure cleanup by returning the unsubscribe function on unmount or when `clientId` changes.
    - S3: Map client entity to `ClientBanner` and `ContactDetailsCard` props; handle empty fields with `isEmpty` flags.
    - S4: Load client notes placeholder from `client.notes` (array of strings or text) until dedicated notes entity exists.
  - Entry criteria: deps met
  - Exit criteria: Screen renders live client details from Firestore; no mock data remains
  - Step Gate: After P1, STOP. Dev agent must ask to proceed.

- P2: Recent tasks data wiring (D2 → F-010-AC2)
  - Goal: Show deterministic recent tasks for the client
  - Includes: [F-010-D2] → [F-010-AC2]
  - Steps:
    - S1: Subscribe to `tasksRepository.observeListByClientId(clientId, ...)`; on callback, sort by date/time descending (newest first), limit to max 5; return unsubscribe in `useEffect` cleanup on unmount or `clientId` change.
    - S2: Map tasks to `RecentTasksCard` items with formatted date/time strings; choose `color` by simple heuristic (e.g., default 'blue').
    - S3: Handle empty state by rendering zero items; keep card visible.
  - Entry criteria: P1 complete
  - Exit criteria: Recent tasks display updates in real-time; max 5, newest-first
  - Visual QA (run at phase end):
    - Safe areas respected; spacing via tokens; readable typography; press feedback on tappables
  - Step Gate: After P2, STOP. Dev agent must ask to proceed.

- P3: Quick actions and navigation (D3 → F-010-AC3)
  - Goal: Wire action buttons and list actions to platform/navigation
  - Includes: [F-010-D3] → [F-010-AC3]
  - Steps:
    - S1: Wire Call button using `Linking.openURL('tel:' + phone)`; guard missing `phone`.
    - S2: Wire Email button using `Linking.openURL('mailto:' + email)`; guard missing `email`.
    - S3: Wire Add Task button to navigate to `new-task` route with prefilled `clientId`.
    - S4: Implement `RecentTasksCard.onActionPress` to navigate to a filtered tasks view (e.g., Calendar focused on client/date) or stub with log.
  - Entry criteria: P2 complete
  - Exit criteria: Actions trigger the correct behaviors or stubs as defined
  - Visual QA (run at phase end):
    - Buttons show press feedback; no crashes when data missing (guards)
  - Step Gate: After P3, STOP. Dev agent must ask to proceed.

## Data & State
- Entities:
  - clients: from F-006 `clientsRepository` (fields: name, email, phone, addressLine, city, postalCode, notes)
  - tasks: from F-006 `tasksRepository` (fields: clientId, date, startAt, description)
- Storage: Firebase Firestore with RN persistence (provided by F-006)
- State: Local component state for client and tasks; no Redux required for this feature

## UX Notes
- Screens: Use existing `ClientInfoScreen` layout with `ClientBanner`, `ContactDetailsCard`, `RecentTasksCard`, `NotesCard`
- Edge cases:
  - Missing phone/email/address should render with `isEmpty: true` and subdued style
  - No recent tasks: show empty state in `RecentTasksCard` (render zero items)
  - Invalid `clientId`: show header + empty cards; optionally toast/log

## Risks / Rollback
- Risks:
  - Inconsistent task ordering if `startAt` missing; apply safe defaults
  - Notes model not finalized; using `client.notes` string fallback
- Rollback Plan:
  - Revert to mock data on screen if Firestore unavailable; keep wiring behind a simple feature flag prop if needed

## Definition of Done
- All ACs validated in QA doc
- No unresolved deps
- Mock data removed; screen uses repositories and updates in real-time

## Execution Guardrails (for Dev Agent)
- Manual step gate enforced; after each phase, STOP and request explicit "proceed" before continuing.
- Sequential Thinking MCP: Use at the start of P2 to validate data shaping (sort/limit/newest-first) and listener lifecycle across P1→P2; and before P3 to verify navigation flows across nested stacks/tabs.
- Context7 MCP: Consult when unsure about React Navigation v6 with Expo Router typed params, `Linking.openURL` tel/mailto behavior on iOS/Android, and Firestore `onSnapshot` unsubscribe patterns. Save any consulted notes under `docs/context7/`.



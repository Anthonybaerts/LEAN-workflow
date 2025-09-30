---
docType: implementation
id: F-009
phases: [P0, P1, P2]
deliverables: [F-009-D1, F-009-D2, F-009-D3]
acCoverage: [F-009-AC1, F-009-AC2, F-009-AC3]
generatedBy: implementation_planner
---

# Implementation — F-009 (State Management)

Links:
- Shard: PRD_Shard_F-009.md
- Index: MASTER_INDEX.yaml (F-009)

## Deliverables (trace to ACs)
- F-009-D1 → F-009-AC1: Redux Toolkit store scaffold with slices: auth, ui; entities normalized patterns prepared
- F-009-D2 → F-009-AC2: Persistence middleware for essential state (auth/ui prefs) across foreground/background
- F-009-D3 → F-009-AC3: Firestore sync patterns drafted (listeners → dispatch), ready for features to consume

## Phases (incremental, reference Deliverables & ACs)
- P0: Dependencies & Setup (S0)
  - Goal: Ensure state libraries and base wiring are ready
  - Steps:
    - S0: Deps & Setup check
      - Ensure `@reduxjs/toolkit` and `react-redux` are installed
      - Choose folders: `vakkerUI/src/state/` for store and slices; `vakkerUI/src/state/selectors/`
      - Decide minimal persistence strategy (AsyncStorage) via simple middleware (not Redux Persist for MVP)
  - Entry criteria: None
  - Exit criteria: Ready to scaffold store
  - Step Gate: After S0, STOP. Await "proceed" before P1

- P1: Store scaffold + base slices (D1 → F-009-AC1)
  - Goal: Create store and base slices; provide typed hooks
  - Steps:
    - S1: Create `store.ts` with `configureStore`, export `AppDispatch`, `RootState`, and typed hooks `useAppDispatch`, `useAppSelector`
    - S2: Add `authSlice` (uid, email, status) with actions: `setUser`, `clearUser`
    - S3: Add `uiSlice` (loading flags, toasts placeholder, prefs)
    - S4: Wrap root in `<Provider store={store}>` in `src/app/_layout.tsx`
  - Entry criteria: deps met
  - Exit criteria: AC satisfied: [F-009-AC1]
  - Step Gate: After P1 edits, STOP. Provide usage notes and await "proceed" before P2

- P2: Persistence + Firestore sync patterns (D2, D3 → F-009-AC2, F-009-AC3)
  - Goal: Persist minimal state and define sync conventions with Firestore
  - Steps:
    - S1: Implement lightweight persistence middleware saving selected `ui` prefs to AsyncStorage; rehydrate on init
      - Persisted keys (initial): `ui.prefs.theme`, `ui.prefs.locale` (expand cautiously)
      - Explicitly exclude: transient flags like `ui.loading`, ephemeral toasts/queues, any non-serializable data
    - S2: Connect `onAuthStateChanged` in `_layout.tsx` to dispatch `setUser/clearUser`
    - S3: Document pattern for feature slices to subscribe to Firestore via services and dispatch updates (e.g., tasks/clients listeners)
  - Entry criteria: P1 complete
  - Exit criteria: ACs satisfied: [F-009-AC2, F-009-AC3]

## Data & State
- Slices: `auth`, `ui` initially; `clients`, `tasks` to be added by their features
  - Note (staged delivery): The PRD lists `auth`, `clients`, `tasks`, `ui` as target slices. This implementation intentionally scaffolds `auth` and `ui` first; `clients` and `tasks` slices will be created within their respective features to keep scope focused and avoid premature coupling.
- Persistence: AsyncStorage (MVP-light) for selected UI prefs; auth derives from Firebase

## Usage Examples (for consumers)

Typed hooks usage (selectors kept in `src/state/selectors/`):

```ts
// src/feature/example/SomeComponent.tsx
import React from 'react';
import { useAppDispatch, useAppSelector } from '@ui/state';

export function SomeComponent() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.ui.loading);
  // dispatch(someAction())
  return null;
}
```

Firestore listener pattern (services layer) with unsubscribe safety:

```ts
// src/services/firestore/listeners.ts
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '../services/firebase';
import { AppDispatch } from '../state/store';

export function startTasksListener(dispatch: AppDispatch) {
  const ref = collection(db, 'tasks');
  const unsubscribe = onSnapshot(ref, (snap) => {
    const tasks = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    dispatch({ type: 'tasks/received', payload: tasks });
  });
  return unsubscribe; // caller must invoke on screen unmount/app shutdown
}
```

## UX Notes
- No direct UI; ensure no noticeable jank during rehydrate; keep payloads small

## Risks / Rollback
- Risks:
  - Over-persisting can cause stale state; keep scope tight
  - Event listener duplication; centralize unsubscribe patterns
- Rollback Plan:
  - Disable persistence middleware temporarily if issues arise; keep store volatile

## Definition of Done
- All ACs validated in QA doc
- No unresolved deps
- Store scaffold documented with examples for consumers

## Execution Guardrails (for Dev Agent)
- Keep store minimal; do not add RTK Query in this feature
- Do not refactor existing services; only add dispatch calls where appropriate
- Provide code owners with a short README for patterns and typed hooks

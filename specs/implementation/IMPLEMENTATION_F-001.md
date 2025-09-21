---
docType: implementation
id: F-001
phases: [P0, P1, P2]
deliverables: [F-001-D1, F-001-D2, F-001-D3]
acCoverage: [F-001-AC1, F-001-AC2, F-001-AC3]
generatedBy: implementation_planner
---

# Implementation — F-001 (Auth: Login)

Links:
- Shard: PRD_Shard_F-001.md
- Index: MASTER_INDEX.yaml (F-001)

## Deliverables (trace to ACs)
- F-001-D1 → F-001-AC1: Email/password login flow wired to Firebase Auth; navigate to `CalendarScreen` on success
- F-001-D2 → F-001-AC2: Invalid-credentials handling showing copy "Ongeldige inloggegevens" and staying on `LoginScreen`
- F-001-D3 → F-001-AC3: Session persistence with `onAuthStateChanged` to auto-navigate to `CalendarScreen` when already authenticated

## Phases (incremental, reference Deliverables & ACs)
- P0: Dependencies & Setup (S0)
  - Goal: Ensure all libraries/config required for this feature exist and are correctly set up
  - Steps:
    - S0: Deps & Setup check for this feature (verify installs, peers, Babel/Metro config, entry/root wrappers, permissions, env)
      - Verify JS SDKs: `firebase` v9 modular; no `@react-native-firebase/*` (MVP)
      - Verify app entry has `GestureHandlerRootView` and `SafeAreaProvider` wrappers (exists in `src/app/_layout.tsx`)
      - Verify Babel includes `react-native-worklets/plugin` (present via project config)
      - Verify `app.config.ts` exposes `extra.firebase` values via `Env/ClientEnv`; `.env` or config values set
      - Verify `src/services/firebase.ts` initializes app via `getApps()` and exposes `auth()`
  - Entry criteria: Global Pre-flight complete
  - Exit criteria: All required deps present; otherwise STOP and request MASTER_PRD/sequence update

- P1: Implement Login UI wiring and sign-in (D1 → F-001-AC1)
  - Goal: User can input email/password and sign in; on success navigate to `CalendarScreen`
  - Steps:
    - S1: Reuse `@ui/screens/LoginScreen` in app-level route `auth_flow/Login`
    - S2: Add state handlers to pass `email`, `password`, `onEmailChange`, `onPasswordChange`, `onLogin`
    - S3: Implement `onLogin` using `signInWithEmailAndPassword(Firebase.auth(), email, password)`
    - S4: On success, navigate to `CalendarScreen` per nav spec
    - S5: Disable "Inloggen" button while submitting; prevent double submit
  - Entry criteria: deps met
  - Exit criteria: AC satisfied: [F-001-AC1]

- P2: Error handling + session persistence (D2, D3 → F-001-AC2, F-001-AC3)
  - Goal: Show proper error on invalid credentials; auto-route authenticated users
  - Steps:
    - S1: On auth error `auth/invalid-credential`, show message: "Ongeldige inloggegevens"
    - S2: Keep user on `LoginScreen` after error; re-enable submit
    - S3: Add `onAuthStateChanged(Firebase.auth(), cb)` at app root to redirect authenticated users to `CalendarScreen`
    - S4: Ensure session persists across app restarts (Firebase default persistence in Expo web runtime)
  - Entry criteria: P1 complete
  - Exit criteria: ACs satisfied: [F-001-AC2, F-001-AC3]

## Data & State
- Entities:
  - Auth user (Firebase `User`): uid, email
- Storage:
  - Firebase Auth persistence (default); no additional local storage required for MVP

## UX Notes
- Screens:
  - Reuse `LoginScreen` from `@ui/screens` (props: `email`, `password`, handlers)
- Edge cases:
  - Network errors: show generic error toast/message
  - Button disabled while submitting to avoid duplicate calls

## Risks / Rollback
- Risks:
  - Misconfigured Firebase env values cause login failures
  - Navigation dependency (F-005) not yet implemented could block routing
- Rollback Plan:
  - Feature flag route to bypass auth for local development if needed

## Definition of Done
- All ACs validated in QA doc
- No unresolved deps
- Reuse-first: No new UI introduced; using `@ui/screens/LoginScreen`, `@ui/components/Input`, `Button`, and icons `Email`, `Lock`

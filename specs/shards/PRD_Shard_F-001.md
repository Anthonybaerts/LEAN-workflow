---
docType: prd_shard
features: [F-001]
deps: []
screens: [LoginScreen]
anchors: [auth-login]
generatedBy: shard_generator
---

# PRD Shard: Auth: Login (F-001)

## Source
- MASTER_PRD.md#auth-login
- Sequence position: 1 of 16 in build order
- Generated: 2025-09-20

## Story & Context
Users need secure authentication to access their personal client and task data.

## Scope & Requirements
- Email/password sign-in using Firebase Auth
- Secure session persistence

## Acceptance Criteria
- F-001-AC1: Given valid email/password, when user taps "Inloggen", then Firebase Auth logs them in and app navigates to CalendarScreen.
- F-001-AC2: Given invalid credentials, when login is attempted, then error message displays "Ongeldige inloggegevens" and user stays on LoginScreen.
- F-001-AC3: Given successful login, when user reopens app, then session persists and user is auto-navigated to CalendarScreen without re-entering credentials.

## Dependencies & Context
None.

## Dependencies (Libraries & Setup)
- Libraries referenced in PRD for this feature: Firebase JS SDK (Auth)
- Config requirements (if mentioned): (none specified in feature section)
- Linking & wrappers (if mentioned): (none specified)

## Implementation Notes
- Auth stack: Firebase JS SDK v9 (modular). Use `signInWithEmailAndPassword(auth, email, password)` and `onAuthStateChanged(auth, cb)` to manage session and navigation on login.
- Env/config: Web config is injected via `app.config.ts → extra.firebase` and read on the client via `@env`; initialize the app once and reuse the instance.
- UI/Validation: Implement the LoginScreen form with React Hook Form + Zod; disable the submit button while submitting; on invalid credentials, show the PRD copy: "Ongeldige inloggegevens".
- Navigation: On successful sign-in, navigate to `CalendarScreen`.
- Expo Go: Do not use `@react-native-firebase/*` modules for Auth in this MVP; JS SDK works in Expo Go without native files.

## Screens & Components (if applicable)
- Screens: [LoginScreen]
- Components: [Header, Input, Button, Email, Lock]

## Build Context
- Position: step 1 of 16
- Previous features completed: none
- Next features in pipeline: F-005 (Navigation Setup)

## Out of Scope
None specified in feature section.

## Risks & Considerations
None specified in feature section.



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



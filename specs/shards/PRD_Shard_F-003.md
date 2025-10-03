---
docType: prd_shard
features: [F-003]
deps: [F-001, F-005, F-006, F-007]
screens: [NewClientScreen, ClientInfoScreen]
anchors: [clients-create]
generatedBy: shard_generator
---

# PRD Shard: Clients: Create (F-003)

## Source
- MASTER_PRD.md#clients-create
- Sequence position: 10 of 16 in build order
- Generated: 2025-09-22

## Story & Context
Technicians need to add new clients when acquiring new business.

## Scope & Requirements
- Full-screen NewClientScreen with validated form (includes client type Zakelijk|Particulier); saves to Firestore; navigate directly to ClientInfoScreen after create.

## Acceptance Criteria
- F-003-AC1: Given all required fields are filled in (type, name, email, phone, address), when user taps "Opslaan", then a new client document is created in Firestore and the app navigates directly to ClientInfoScreen for that new client.
- F-003-AC2: Given required fields are missing or invalid, when user taps "Opslaan", then form validation errors display under respective fields.
- F-003-AC3: Given successful client creation, when ClientInfoScreen loads, then the new client's data is visible immediately (name, email, phone, address, notes).

## Dependencies & Context
- Depends on F-001 (Auth), F-005 (Navigation Setup), F-006 (Storage & Data Layer), F-007 (Form Validation).

## Dependencies (Libraries & Setup)
- Libraries referenced in PRD for this feature:
  - Firebase JS SDK (Firestore) for client create
  - `zod`, `react-hook-form` for validation
- Config requirements (from PRD context):
  - Firestore rules must enforce per-user isolation; ensure correct collection schema per PRD Data Model

## Screens & Components (if applicable)
- Screens: [NewClientScreen, ClientInfoScreen]
- Components: [Header, Input, Button, TabSelection, Email, Call, Location, User, Close]

## Build Context
- Position: step 10 of 16
- Next features in pipeline: F-004 (Tasks: Create)

## Out of Scope
- Edit flows (covered by F-015)

## Risks & Considerations
- Validation coverage and error copy must align with PRD; navigation should push to details on success.




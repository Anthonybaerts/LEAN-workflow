---
docType: prd_shard
features: [F-015]
deps: [F-003, F-010, F-007]
screens: [EditClientScreen]
anchors: [clients-edit-basic]
generatedBy: shard_generator
---

# PRD Shard: Clients: Edit (basic) (F-015)

## Source
- MASTER_PRD.md#clients-edit-basic
- Sequence position: 16 of 17 in build order
- Generated: 2025-10-10

## Story & Context
Client information changes over time and needs to be updatable within a simple, full-screen flow.

## Scope & Requirements
- Edit core fields (name, phone, email, address) in full-screen edit screen.
- Save updates to Firestore and return to ClientInfoScreen.
 - Provide a Delete button with confirmation; on delete, remove client and navigate back to ClientsScreen.
 - Expose Edit and Delete actions on ClientInfoScreen; Edit navigates to EditClientScreen; Delete confirms, deletes, navigates back, and shows success toast.

## Acceptance Criteria
- F-015-AC1: Given user taps edit on ClientInfoScreen, when EditClientScreen opens, then current data pre-fills form fields.
- F-015-AC2: Given user modifies fields and taps save, when save completes, then Firestore updates and user returns to ClientInfoScreen with updated data.
- F-015-AC3: Given user taps cancel, when cancel pressed, then changes are discarded and user returns to ClientInfoScreen.
 - F-015-AC4: Given user taps Delete, when confirmation is accepted, then the client is deleted from Firestore, user is navigated back to ClientsScreen, and a success toast is shown (e.g., "Klant verwijderd").
 - F-015-AC5: Given user saves changes, when save completes, then a success toast is shown (e.g., "Klant bijgewerkt").
 - F-015-AC6: Given user is on ClientInfoScreen, when Delete is confirmed, then the client is deleted from Firestore, a success toast is shown, and the app navigates back to ClientsScreen.

## Dependencies & Context
- Depends on F-003 (Clients: Create), F-010 (Clients: View Details), and F-007 (Form Validation).

## Dependencies (Libraries & Setup)
- Firebase JS SDK (Firestore); React Hook Form + Zod for validation.
 - Toast mechanism per F-013 (e.g., app ToastProvider) for success messages.

## Screens & Components (if applicable)
- Screens: [EditClientScreen]
- Components: [Header, Input, Button]

## Out of Scope
- Editing client type, task history, or notes beyond core fields.

## Risks & Considerations
- Ensure atomic update to Firestore and optimistic UI refresh on return.
 - Deleting a client with related tasks: confirm behavior (block delete, cascade, or warn). For MVP, prevent delete if tasks exist or show clear error toast.



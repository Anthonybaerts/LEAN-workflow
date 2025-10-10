---
docType: implementation
id: F-015
phases: [P0, P1, P2]
deliverables: [F-015-D1, F-015-D2, F-015-D3]
acCoverage: [F-015-AC1, F-015-AC2, F-015-AC3, F-015-AC4, F-015-AC5, F-015-AC6]
generatedBy: implementation_planner
---

# Implementation — F-015 (Clients: Edit — basic)

Links:
- Shard: PRD_Shard_F-015.md
- Index: MASTER_INDEX.yaml (F-015)

## Summary
Add an `EditClientScreen` to edit core fields (name, phone, email, address), persist to Firestore, and wire Edit/Delete actions from `ClientInfoScreen`. The edit entry point is the pencil icon inside the Contact Details card on `ClientInfoScreen`. Use existing RHF+Zod validation (F-007) and Toasts (F-013).

## Deliverables (trace to ACs)
- F-015-D1 → F-015-AC1, F-015-AC3: `EditClientScreen` with prefilled form and cancel navigation
- F-015-D2 → F-015-AC2, F-015-AC5: Save updates to Firestore and show success toast
- F-015-D3 → F-015-AC4, F-015-AC6: Delete with confirmation, success toast, and navigation back to ClientsScreen

## Phases (incremental, reference Deliverables & ACs)
- P0: Route + screen scaffold
  - Goal: Create route and screen shell; wire navigation from `ClientInfoScreen`
  - Steps:
    - S0: Add route `vakkerUI/src/app/(tabs)/clients/edit-client.tsx` pointing to `@/ui/screens/EditClientScreen`
      - Sequential Thinking MCP (run now): Confirm route naming/params (e.g., `clientId`).
      - Micro Gate: After S0, STOP. Provide route map and await "proceed".
    - S1: Create `EditClientScreen` with basic layout (Header, Inputs, Buttons)
      - Location: `vakkerUI/src/ui/screens/EditClientScreen/EditClientScreen.tsx`
      - Props: `clientId` via route params
      - Use tokens for styling; reuse `Input` and `Button` components
      - Context7 MCP (docs lookup): expo-router pattern for reading params safely.
      - Micro Gate: After S1, STOP. Share component skeleton and await "proceed".
    - S2: Wire pencil icon on ClientInfoScreen (Contact Details card) to navigate to Edit
      - File: `vakkerUI/src/ui/screens/ClientInfoScreen/ClientInfoScreen.tsx`
      - If needed, expose optional `onEditPress` prop on `ContactDetailsCard` to render a small top-right pencil button
      - On press: navigate to `/(tabs)/clients/edit-client?clientId=<id>`
      - Sequential Thinking MCP (run now): Decide whether to add the prop to `ContactDetailsCard` vs overlaying an IconButton in the screen.
      - Micro Gate: After S2, STOP. Post a short note and await "proceed".
  - Entry criteria: F-010 present (ClientInfo)
  - Exit criteria: Navigable Edit screen stub present

- P1: Prefill + validation + save
  - Goal: Load client, prefill form, validate, and save updates
  - Steps:
    - S1: Fetch client by id using existing repository (`clientsRepository.getById`)
      - Sequential Thinking MCP (run now): Ensure loading/error states handled; define prefill mapping.
    - S2: Build RHF form with Zod schema (reuse from F-007 or define minimal schema)
      - Context7 MCP (docs lookup): RHF with Zod in React Native best practices for blur/onChange validation.
    - S3: Implement Save
      - Call `clientsRepository.update` with changed fields; on success:
        - Navigate back to `ClientInfoScreen`
        - Call `useToast().success('Klant bijgewerkt')`
      - Sequential Thinking MCP (run now): Decide optimistic UI vs wait-for-write; choose wait-for-write for MVP.
      - Micro Gate: After S3, STOP. Provide short diff/flow and await "proceed".
    - S4: Implement Cancel
      - Discard changes and navigate back to `ClientInfoScreen`
  - Entry criteria: P0 complete
  - Exit criteria: ACs [F-015-AC1, F-015-AC2, F-015-AC3, F-015-AC5] met

- P2: Delete flow
  - Goal: Confirm and delete client, handle related tasks constraint, and navigate back
  - Steps:
    - S1: Add Delete button on `ClientInfoScreen` (not on `EditClientScreen`)
      - Show confirm dialog: "Weet je zeker dat je deze klant wilt verwijderen?"
      - Sequential Thinking MCP (run now): Decide confirm UI (system Alert vs custom modal). Use system Alert for MVP.
    - S2: On confirm, check for linked tasks and block if present (MVP)
      - Query `tasksRepository.listByClientId(id)` to get count
      - If count > 0: abort deletion and show toast `useToast().error('Klant heeft ' + count + ' gekoppelde taken. Verwijder of verplaats taken eerst.')`
      - If count === 0: delete client directly, then `useToast().success('Klant verwijderd')` and navigate back to ClientsScreen
      - Note (Future, after EditTaskScreen): Optional force delete with cascade (second confirm + batched deletes)
      - Micro Gate: After S2, STOP. Provide flow notes and await "proceed".
  - Entry criteria: P1 complete
  - Exit criteria: ACs [F-015-AC4, F-015-AC6] met

## Data & Compatibility
- Entities: `clients` (id, ownerId, name, email, phone, address, ...)
- Repositories: reuse `clientsRepository` for get/update/delete; ensure owner scoping per F-006

## UX & Accessibility
- Full-screen edit with clear primary (Save) and secondary (Cancel) actions
- Confirmation dialog for Delete; success/error toasts per F-013

## Risks / Rollback
- Risk: Deleting clients with related tasks. MVP mitigation: block delete when related tasks exist and show clear toast.
- Rollback: Disable delete action; leave edit/save functional.

## Definition of Done
- EditClientScreen navigable from ClientInfoScreen
- Prefilled form; Save updates Firestore and shows success toast
- Cancel returns without changes
- Delete confirms and either blocks with error toast (related tasks) or deletes with success toast and navigates back

## Execution Guardrails (for Dev Agent)
- Respect micro STOP gates; await explicit "proceed" at each gate
- No new packages; reuse existing repositories, forms, and tokens
- Keep edits localized to routes/screens and repositories



---
docType: implementation
id: F-00X-ICS
phases: [P0a, P0b, P1a, P1b, P1c, P2a, P2b, P2c, P2d, P3a, P3b]
deliverables: [F-00X-ICS-D1, F-00X-ICS-D2, F-00X-ICS-D3]
acCoverage: [F-00X-ICS-AC1, F-00X-ICS-AC2, F-00X-ICS-AC3, F-00X-ICS-AC4]
generatedBy: dev_executor
---

# Implementation — F-00X (Inline Client Search on New Task)

Links:
- Index: MASTER_INDEX.yaml (F-00X)
- Related: `vakkerUI/src/app/(tabs)/calendar/new-task.tsx`, `vakkerUI/src/ui/screens/NewTaskScreen/NewTaskScreen.tsx`

## Objective
Replace the modal-based client picker with an inline client search field and results list inside the New Task screen. Data comes from Firestore via Redux selector, with debounced local fuzzy filtering, clear empty/loading states, first-tap selection, and robust keyboard behavior on iOS/Android with dark-mode styling.

## Deliverables (trace to ACs)
- F-00X-ICS-D1 → F-00X-ICS-AC1: Inline client search under “Klant” with debounced filter and real data (Firestore→Redux)
- F-00X-ICS-D2 → F-00X-ICS-AC2: UX states (hidden by default; loading, results, empty + “Nieuwe klant” CTA) with correct keyboard handling
- F-00X-ICS-D3 → F-00X-ICS-AC3/AC4: First-tap selection sets `clientId`, populates field, collapses consistently, and no nested VirtualizedList warnings

## Phases (incremental)

- P0a: Objectives & UX Policies (Plan)
  - Define UX policies and constraints:
    - Results visibility: hidden until `query.length ≥ 2`
    - Selection policy: collapse on selection; input shows selected label
    - Max rows: 5; avoid nested VirtualizedLists; prefer mapped rows
    - Keyboard: `keyboardShouldPersistTaps="handled"`, `keyboardDismissMode="on-drag"`
  - MCP Required — Sequential Thinking: Enumerate UX trade-offs (visibility threshold, collapse policy, max rows) and record rationale. Output decisions in this doc before proceeding.
  - Step Gate: STOP — Ask to proceed to P0b.

- P0b: Data Flow Decision (Plan)
  - Confirm Firestore snapshot → Redux slice → selector used in New Task container
  - Confirm CTA route: `/(tabs)/clients/new-client`; optional post-create preselect
  - MCP Required — Sequential Thinking: Compare Redux subscription vs local component state; decide per requirement and document why Redux is chosen.
  - Step Gate: STOP — Ask to proceed to P1a.
  - Decision (Sequential Thinking):
    - Choose Redux subscription (Firestore → `clientsSlice` → selectors). Rationale: requirement specifies Redux selector; enables reuse across screens, unified loading/error state, and future offline/caching improvements. Local-only state would diverge from requirement and duplicate logic.

- P1a: Redux Slice Scaffolding (Data Wiring)
  - Create `clientsSlice.ts` with state `{ items: ClientEntity[]; status: 'idle'|'loading'|'ready'|'error'; error?: string }`
  - Add actions: `clientsLoading`, `clientsLoaded`, `clientsError`, `clientsCleared`
  - MCP Required — Context7: Consult Redux Toolkit best practices for slice structure and action naming; ensure selectors approach aligns with RTK guidance.
  - Step Gate: STOP — Ask to proceed to P1b.

- P1b: Store Registration & Selectors (Data Wiring)
  - Register reducer in `vakkerUI/src/state/store.ts`
  - Add selectors: `selectClients` and optional `selectClientsByOwnerId(ownerId)`
  - MCP Required — Context7: Verify selector definitions using RTK slice `selectors` or `getSelectors` patterns; capture chosen approach.
  - Step Gate: STOP — Ask to proceed to P1c.

- P1c: Firestore Subscription (Data Wiring)
  - In `new-task.tsx`, on mount subscribe via `clientsRepository.observeListByOwnerId(currentUserId)`
  - Dispatch `clientsLoading` before first emission; `clientsLoaded(items)` on each snapshot; unsubscribe on unmount; guard auth-ready
  - MCP Required — Context7: Review RTK async logic patterns (thunks/side-effects) to ensure subscription lifecycle and error handling follow best practices.
  - Step Gate: STOP — Ask to proceed to P2a.

- P2a: Input & Value Model (UI Integration)
  - Model input with `clientQuery` and `clientDisplay = query.length ? query : clientLabel`
  - Wire props from container to `NewTaskScreen.tsx`; ensure no results render by default
  - MCP Required — Sequential Thinking: Validate the display model vs alternatives (single value vs split query/label); record why split model is chosen.
  - Step Gate: STOP — Ask to proceed to P2b.
  - Decision (Sequential Thinking):
    - Choose split model (`clientQuery` vs `clientDisplay`). Rationale: keeps typing responsive while ensuring selected label persists when query clears; prevents stale results; simplifies collapse-on-selection behavior.

- P2b: Inline Results Rendering & States (UI Integration)
  - Under the “Klant” field, render inline results container
  - States:
    - Loading: small “Laden...” row when status === 'loading' and query visible
    - Results: up to 5 tappable rows with name and optional subtitle
    - Empty: “Geen klanten gevonden” + “Nieuwe klant toevoegen” CTA
  - MCP Required — Context7: Check RN docs for ScrollView keyboard/tap handling and nested scroll guidance to avoid VirtualizedList warnings.
  - Step Gate: STOP — Ask to proceed to P2c.

- P2c: Selection Handling & CTA Navigation (UI Integration)
  - On tap: set form `clientId`, set `clientLabel`, clear `clientQuery`, dismiss keyboard; rely on visibility rule to collapse
  - CTA navigates to `/(tabs)/clients/new-client`; optional post-create preselect
  - MCP Required — Sequential Thinking: Confirm collapse-on-selection vs keep-open; document final policy and implications.
  - Step Gate: STOP — Ask to proceed to P2d.
  - Decision (Sequential Thinking):
    - Choose collapse-on-selection. Rationale: prevents “stuck” lists, gives immediate confirmation, and aligns with input/value model where clearing `clientQuery` hides results while `clientLabel` remains visible.

- P2d: Keyboard & Layout Adjustments (UI Integration)
  - Add `keyboardShouldPersistTaps="handled"`, `keyboardDismissMode="on-drag"`; consider `KeyboardAvoidingView` on iOS
  - Ensure rows ≥ 44 px, theme tokens, dark contrast; bottom padding for visibility
  - MCP Required — Context7: Validate keyboard props and `KeyboardAvoidingView` usage across iOS/Android per RN docs; capture any platform-specific notes.
  - Step Gate: STOP — Ask to proceed to P3a.

- P3a: QA — On-Device Validation
  - iOS + Android checks: typing threshold, fast results (≤ 5), first-tap selection, empty + CTA, no nested list warnings, no double-tap, keyboard visibility
  - MCP Required — Sequential Thinking: Create and run a short test checklist; note outcomes and any issues before acceptance.
  - Step Gate: STOP — Ask to proceed to P3b.

- P3b: Acceptance Review
  - Validate all ACs and finalize; capture any follow-ups
  - Step Gate: STOP — Await sign-off.

## Data & State
- Entities: `ClientEntity { id, ownerId, name, email?, phone?, addressLine?, postalCode?, city?, ... }`
- Source: `clientsRepository.observeListByOwnerId(ownerId)` (Firestore) → Redux `clientsSlice`
- UI state (container): `clientQuery`, `clientLabel`, `selectedClientId`, `debouncedQuery`

## UX Policies (final)
- Visibility: results hidden until `clientQuery.length ≥ 2`
- Selection: collapse on selection; input shows selected label (via `clientDisplay` model)
- Max rows: 5; avoid nested VirtualizedList; prefer simple mapped `View` or tiny `ScrollView` with `maxHeight`
- Keyboard: `keyboardShouldPersistTaps="handled"`, `keyboardDismissMode="on-drag"`; iOS may use `KeyboardAvoidingView`

## Alternatives & Trade-offs
- Data flow
  - A) Redux subscription (chosen): centralizes data, supports reuse/offline; aligns with requirement
  - B) Local component state: faster to wire, but contradicts Redux-selector requirement
- Results scrolling
  - A) Cap to 5 (chosen): no inner scroll, fewer gesture conflicts
  - B) Small inner `ScrollView` (`maxHeight`): allows more results but introduces two scroll regions (tune carefully)
- Collapse policy
  - A) Collapse on selection (chosen): prevents “stuck” or accidental reselection
  - B) Keep open until blur: allows exploration but risks inconsistency

## Risks / Mitigations
- Keyboard obscures results on small screens → Use bottom padding / `KeyboardAvoidingView` on iOS; verify with both platforms
- Auth not ready → Delay subscription until user present; surface `loading` state; handle errors gracefully
- Large client lists → Debounce filter; cap visible rows; consider precomputed search keys later if needed
- Double-tap selection → Ensure `keyboardShouldPersistTaps="handled"`; dismiss keyboard on selection; avoid nested VirtualizedLists

## Acceptance Criteria
- F-00X-ICS-AC1: New Task shows a “Klant” input with no results by default; typing ≥ 2 chars triggers debounced filtering of real client data (Firestore→Redux)
- F-00X-ICS-AC2: Loading/empty states render correctly; empty shows “Geen klanten gevonden” and “Nieuwe klant toevoegen” CTA
- F-00X-ICS-AC3: First tap on a result sets form `clientId`, updates input to show client’s name, collapses results, and dismisses keyboard
- F-00X-ICS-AC4: No VirtualizedList-nesting warnings; works on iOS/Android; dark theme; rows ≥ 44 px

## Execution Guardrails
- Do not introduce a second major scroll container for the screen
- Avoid nested VirtualizedLists; prefer simple mapped rows (≤ 5 visible)
- Use theme tokens for spacing/contrast; keep dark mode parity
- Implement in small edits; run lints after changes; QA on-device

## MCP Usage Notes
- Sequential Thinking (used to define plan and decisions):
  - Clarified data flow, visibility policy, collapse policy, and keyboard behavior sequencing
- Context7 (best practices and docs references):
  - React Native ScrollView keyboard handling:
    - `keyboardShouldPersistTaps` and `keyboardDismissMode` props [docs](https://reactnative.dev/docs/scrollview)
  - Redux Toolkit slice/selector patterns and async thunks:
    - `createSlice` selectors and async thunk examples [docs](https://redux-toolkit.js.org/)

## Change Log / Step Gates
- After P1 (Data Wiring) — STOP: verify slice registered and subscription delivering items
- After P2 (UI Integration) — STOP: verify UX states and selection flow before QA
- After P3 (QA) — STOP: validate ACs and capture any follow-ups



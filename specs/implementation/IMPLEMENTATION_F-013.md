---
docType: implementation
id: F-013
phases: [P0, P1, P2]
deliverables: [F-013-D1, F-013-D2, F-013-D3]
acCoverage: [F-013-AC1, F-013-AC2, F-013-AC3]
generatedBy: implementation_planner
---

# Implementation — F-013 (Error & Empty States)

Links:
- Shard: PRD_Shard_F-013.md
- Index: MASTER_INDEX.yaml (F-013)

## Summary
Introduce a reusable `EmptyState` pattern for Clients and lightweight Toast notifications for errors and success events (create/update clients and tasks). Prefer existing vakkerUI tokens and dark theme defaults.

## Deliverables (trace to ACs)
- F-013-D1 → F-013-AC1: Reusable `EmptyState` component and integration on Clients when the list is empty
- F-013-D2 → F-013-AC3: Toast notifications surfaced on error events with clear copy; success toasts on create/update of clients and tasks
- F-013-D3 → (supports all ACs): Copy and visuals aligned to PRD; tokens-based styling

## Phases (incremental, reference Deliverables & ACs)
- P0: Patterns and decisions (D1/D2 foundation)
  - Goal: Decide toast implementation approach and define `EmptyState` API using tokens
  - Steps:
    - S0: Define in-house Toast approach (no external library)
      - Minimal Toast using a context + portal mounted in `vakkerUI/src/app/_layout.tsx`
      - Provide `useToast()` hook with helpers: `success(message)`, `error(message)`, `info(message)`
      - Style with tokens; default dark theme visuals
      - Sequential Thinking MCP (run now): Outline provider placement, hook API, and dismissal/auto-timeout behavior.
      - Micro Gate: After S0, STOP. Post the approach summary and await "proceed".
    - S1: Define `EmptyState` component API
      - Location: `vakkerUI/src/ui/components/EmptyState/EmptyState.tsx`
      - Props: `title`, `description?`, `actionLabel?`, `onAction?`, `iconName?`
      - Styling: use `theme.colors`, `theme.typography`, `theme.radius`, `theme.spacing` (dark-first)
      - Sequential Thinking MCP (run now): Map AC copy to props and decide defaults for each target screen.
      - Micro Gate: After S1, STOP. Share the props/interface and a sketch, await "proceed".
  - Entry criteria: None
  - Exit criteria: Decision on toast approach; `EmptyState` API defined with tokens
  - Step Gate: After P0, STOP. Provide brief summary and await approval before edits.

- P1: Empty state in Clients (D1)
  - Goal: Implement `EmptyState` and integrate in Clients only
  - Steps:
    - S1: Build `EmptyState` component and export via `@/ui/components`
      - Use `Button` from `@/ui/components/Button`; tokens for colors/typography/radius
      - Sequential Thinking MCP (run now): Sanity-check contrast and spacing on dark background.
      - Micro Gate: After S1, STOP. Provide a short diff and await "proceed".
    - S2: Integrate in Clients screen
      - File: `vakkerUI/src/ui/screens/ClientsScreen/ClientsScreen.tsx`
      - When client list is empty, render `EmptyState` with PRD copy and CTA to add first client
      - Sequential Thinking MCP (run now): Verify empty-state detection logic and navigation target for CTA.
      - Micro Gate: After S2, STOP. Provide notes and await "proceed".
    - S3: [Removed] Calendar empty state is out of scope per user direction
  - Entry criteria: P0 approved
  - Exit criteria: ACs [F-013-AC1, F-013-AC2] met; tokens used; dark theme consistent
  - Step Gate (Mid): After S3, STOP. Provide screenshots and await approval before P2.

- P2: Toasts for errors and success (D2)
  - Goal: Surface clear toast notifications on errors and success toasts on create/update flows
  - Steps:
    - S1: Wire in-house toast provider/root
      - Add `ToastProvider` at `vakkerUI/src/app/_layout.tsx` and export `useToast()` under `vakkerUI/src/ui/components/Toast`
      - Sequential Thinking MCP (run now): Enumerate top 3 error sources to hook first (e.g., repository create/update failures, network fetch failures, form validation edge cases)
      - Micro Gate: After S1, STOP. Share hook signature and await "proceed".
    - S2: Trigger toasts from errors and success
      - Update targeted screens/actions to call `useToast().error(message)` on catch paths with PRD copy
      - Add `useToast().success(message)` on successful client/task create/update flows
      - Ensure no API changes to shared components; keep changes localized
      - Sequential Thinking MCP (run now): Validate copy consistency and avoid duplicate toasts on rapid failures.
  - Entry criteria: P1 approved
  - Exit criteria: AC [F-013-AC3] met; consistent copy; tokens styling where applicable
  - Step Gate: After P2, STOP. Provide validation notes; request approval to close feature.

## Data & Compatibility
- No changes to persisted data; presentation-layer only.

## UX & Accessibility
- Keep copy aligned with PRD; ensure contrast and focus order of CTAs in empty states.
- Toasters should auto-dismiss and be screen-reader polite where feasible (MVP note).

## Risks / Rollback
- Risk: Adding a toast library may require native configuration. Mitigate by preferring in-house minimal approach unless approved.
- Rollback: Disable toast triggers and leave `EmptyState` integrations; no functional regression risk.

## Definition of Done
- Empty state renders correctly on Clients when empty
- Toasts appear on defined error events and on successful client/task create/update
- Dark theme default remains consistent; styling via tokens

## Execution Guardrails (for Dev Agent)
- Respect micro and phase STOP gates; await explicit "proceed" at each gate.
- No new packages; implement in-house toast only.
- Reuse tokens from `@/ui/tokens`; do not introduce custom inline colors.



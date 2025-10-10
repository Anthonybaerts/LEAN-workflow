---
docType: implementation
id: F-012
phases: [P0, P1]
deliverables: [F-012-D1, F-012-D2]
acCoverage: [F-012-AC1, F-012-AC2, F-012-AC3]
generatedBy: implementation_planner
---

# Implementation — F-012 (Theming & Tokens)

Links:
- Shard: PRD_Shard_F-012.md
- Index: MASTER_INDEX.yaml (F-012)

## Summary
Extend and normalize vakkerUI tokens, remove remaining inline RGBA/hex usages, and ensure components/screens consume tokens consistently with dark theme as default. Token updates should propagate without local edits.

## Deliverables (trace to ACs)
- F-012-D1 → F-012-AC1, F-012-AC3: Extended color tokens to cover required "20/40/60" shades for primary/warning/success/gray; text and border tokens confirmed
- F-012-D2 → F-012-AC1, F-012-AC2, F-012-AC3: Refactor components to replace inline RGBA/hex, adopt typography/radius tokens, and verify dark theme default

## Phases (incremental, reference Deliverables & ACs)
- P0: Token extensions and audit (D1)
  - Goal: Provide complete token coverage to eliminate RGBA fallbacks
  - Steps:
    - S0: Update `vakkerUI/src/ui/tokens/colors.ts` to include:
      - `primary`: ensure `'20'`, `'40'`, and add `'60'`
      - `warning`: add `'20'`, `'40'`, `'60'`
      - `success`: ensure `'20'` and add `'40'`, `'60'`
      - `gray`: add `'20'` if missing for subtle backgrounds
      - Sequential Thinking MCP (run now): Evaluate needed shades, validate dark-theme contrast, and confirm naming consistency for new keys.
      - Micro Gate: After S0, STOP. Provide token diffs and await "proceed".
    - S1: Confirm `theme.ts` exports updated tokens and no breaking changes to downstream imports
    - S2: Add or confirm `theme.colors.text.*` and `theme.border.*` usage guidelines
      - Sequential Thinking MCP (run now): Decide which text/border tokens to standardize on for dark theme and define fallback rules.
      - Micro Gate: After S2, STOP. Share chosen text/border tokens and await "proceed".
  - Entry criteria: None
  - Exit criteria: Tokens compile; `theme.ts` exports updated map; test import in one component
  - Step Gate: After P0, STOP. Provide a brief summary and await "proceed" before starting P1. FORCED : use Sequential Thinking MCP to validate shade selections for contrast in dark mode and to agree on naming consistency.

- P1: Token adoption in UI (D2)
  - Goal: Replace inline RGBA/hex and adopt typography/radius tokens in key components
  - Steps:
    - S1: `Tag.tsx` — replace RGBA bg with `theme.colors.*['20'|'40']` equivalents; prefer `theme.colors.text.*` for text
      - Sequential Thinking MCP (run now): Inventory all inline RGBA/hex in Tag and map each to token shades.
      - Micro Gate: After S1, STOP. Provide a short diff and await "proceed".
    - S2: `TabSelection.tsx` — replace RGBA bg/border; ensure selected/unselected states derive from tokens
      - Sequential Thinking MCP (run now): Plan selected/unselected state tokens to ensure adequate contrast and visual hierarchy.
      - Micro Gate: After S2, STOP. Provide a short diff and await "proceed".
    - S3: `HourSelector.tsx` — replace selected border RGBA with a token border color
      - Sequential Thinking MCP (run now): Choose border token consistent with selection patterns used elsewhere.
    - S4: `EventBlock.tsx` — remove inline RGBA fallbacks; use token shades for bg/border; align with F-011 mapping
      - Sequential Thinking MCP (run now): Cross-check F-011 variant→token mapping and pick matching background/border shades.
      - Micro Gate: After S4, STOP. Provide screenshots/notes and await "proceed".
    - S5: Promote `theme.typography.*` in frequently touched files (e.g., `NewTaskScreen.tsx`) where raw font sizes/weights appear
      - Sequential Thinking MCP (run now): Map current font sizes/weights to `theme.typography.*` and note any gaps.
      - Micro Gate: After S5, STOP. Provide a short diff and await "proceed".
    - S6: Normalize any remaining hardcoded radii to `theme.radius.*`
      - Sequential Thinking MCP (run now): Scan for non-token radii across modified files and define replacements.
      - Micro Gate: After S6, STOP. Provide a short diff and await "proceed".
  - Entry criteria: P0 complete
  - Exit criteria: Listed components free of inline RGBA/hex; typography/radius tokens adopted; dark theme remains default and consistent
  - Step Gate (Mid): After S3 edits, STOP. Share diffs/notes and await "proceed" before S4–S6. FORCED: run Sequential Thinking MCP to plan the remainder and double-check for any missed inline colors.
  - Step Gate: After P1, STOP. Provide validation notes; request approval before closing feature.

## Data & Compatibility
- This feature does not modify persisted data. It changes presentation tokens and usage only.

## UX & Accessibility
- Validate color contrast for text on background token shades in dark theme. If a shade fails contrast, use the stronger shade already defined.

## Risks / Rollback
- Risk: Token name additions could break imports if misspelled; mitigate with a compile check in a sample consumer before refactors.
- Rollback: Revert component refactors while keeping tokens extended; no functional impact.

## Definition of Done
- No inline RGBA/hex in targeted components; all colors derive from tokens
- Typography and radius tokens used in targeted components
- Dark theme is default and visually consistent across screens
- Changing a token (e.g., `warning['20']`) visibly affects chips/tags/event blocks without local changes

## Execution Guardrails (for Dev Agent)
- Manual step gate is enforced. Do not proceed past each gate without explicit user "proceed".
- No new packages. Modify tokens only in `@/ui/tokens` and keep theme API stable.
- Keep edits scoped to files listed in this plan and obvious follow-ons revealed during the audit.



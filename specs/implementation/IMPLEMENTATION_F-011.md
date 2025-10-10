---
docType: implementation
id: F-011
phases: [P0, P1]
deliverables: [F-011-D1, F-011-D2]
acCoverage: [F-011-AC1, F-011-AC2, F-011-AC3, F-011-AC4]
generatedBy: implementation_planner
---

# Implementation — F-011 (Color Coding System)

Links:
- Shard: PRD_Shard_F-011.md
- Index: MASTER_INDEX.yaml (F-011)

## Summary
Centralize and enforce a single source of truth for task-type color variants and theme tokens, and refactor call sites to consume the mapping. Ensure persisted `TaskEntity.type` aligns with variants and that all surfaces render the correct color per Acceptance Criteria.
Priority: P5 (safe to proceed now). No packages. Keep edits localized.

## Deliverables (trace to ACs)
- F-011-D1 → F-011-AC1..F-011-AC4: Shared color mapping utility exporting `workTypeToVariant`, `variantToToken`, and types (`WorkType`, `TaskColorVariant`)
- F-011-D2 → F-011-AC1..F-011-AC4: Refactors to consume mapping across Timeline, EventBlock, RecentTasksCard, Tag, ClientInfoScreen, and New Task flow; safe fallback handling

## Phases (incremental, reference Deliverables & ACs)
- P0: Central mapping utility (D1)
  - Goal: Establish single source of truth for mapping and tokens
  - Steps:
    - S0: Create `vakkerUI/src/ui/theme/taskColors.ts` exporting:
      - `WorkType = 'maintenance' | 'project' | 'client_visit' | 'free_task'`
      - `TaskColorVariant = 'blue' | 'yellow' | 'green' | 'gray'`
      - `workTypeToVariant: Record<WorkType, TaskColorVariant>` with:
        - maintenance → blue (Onderhoud)
        - project → yellow (Project)
        - client_visit → green (Klantenbezoek)
        - free_task → gray (Vrije Taak)
      - `variantToToken: Record<TaskColorVariant, { text: string; bg: string; border: string }>` mapping to vakker theme tokens (primary/warning/success/gray)
      - `resolveVariant(input: string | undefined): TaskColorVariant` — guards unknowns with a safe default (blue) and supports legacy values
    - S1: Add README note under `vakkerUI/src/ui/theme/README.md` describing usage and rationale (centralization, accessibility)
  - Entry criteria: None
  - Exit criteria: Utility compiles; tokens map to existing theme values; basic unit import check passes in consumers
  - Step Gate: After P0, STOP. Provide a brief summary and await "proceed" before starting P1. Recommended: run Sequential Thinking MCP to validate token choices (especially gray shades), confirm mapping coverage, and agree on fallback behavior.

- P1: Refactors to use mapping (D2)
  - Goal: Remove ad-hoc maps; ensure all surfaces consume shared mapping and render correct tokens
  - Steps:
    - S1: New Task route (`vakkerUI/src/app/(tabs)/calendar/new-task.tsx`)
      - Replace any inline `workTypeToColor` with shared `workTypeToVariant`.
      - Ensure `form.setValue('type', ...)` writes the shared variant and defaults align via `resolveVariant`.
      - MCP (run now): Verify all entry points to persistence set `type` consistently and decide safe default.
    - S2: Timeline EventsLayer (`vakkerUI/src/ui/components/Timeline/EventsLayer.tsx`)
      - Replace `mapTypeToColor(task.type)` with `resolveVariant(task.type)`.
      - Pass the resulting variant to `EventBlock` (or compute tokens via `variantToToken` if needed).
      - Keep fallback safe via `resolveVariant`.
      - MCP (run now): Identify and remove any remaining local color maps in timeline code.
    - S3: EventBlock (`vakkerUI/src/ui/components/EventBlock/EventBlock.tsx`)
      - Add explicit gray styling:
        - Border: `theme.colors.gray['500']`
        - Background: 20% gray tint. If `gray['20']` is not yet available, use existing safe RGBA fallback until F-012 adds tokens.
      - Continue using `variantToToken` for other variants.
      - MCP (run now): Validate gray contrast against text in dark theme and choose the correct background shade or fallback.
    - Step Gate (Mid): After S3 edits, STOP. Provide screenshots/notes and await "proceed" before S4–S6. Recommended: use Sequential Thinking MCP to plan the sequence for S4–S6, identify any remaining ad‑hoc color maps, and assess impact on consumer APIs.
    - S4: Tag (`vakkerUI/src/ui/components/Tag/Tag.tsx`) [Optional]
      - Remove hardcoded RGBA for yellow/gray backgrounds; prefer tokens.
      - If `warning['20']` and `gray['20']` are not present yet, keep safe RGBA fallbacks and note for F-012.
      - MCP (run now): Map current RGBA uses to intended token shades and log any token gaps.
    - S5: ClientInfoScreen (`vakkerUI/src/ui/screens/ClientInfoScreen/ClientInfoScreen.tsx`)
      - Do not force blue. Derive variant from entity type:
        - `const variant = resolveVariant(t.type)` and use it for `RecentTasksCard` color.
      - Support legacy domain values via `resolveVariant`.
    - S6: Validation guard
      - Where form values flow into persistence, guard unknown/empty with `resolveVariant`
  - Entry criteria: P0 complete
  - Exit criteria: All mentioned call sites rely on shared mapping; UI reflects correct colors for all four types
  - Step Gate: After P1 edits, STOP. Provide validation notes and await user approval.

## Data & Compatibility
- Persistence: `TaskEntity.type?: string` stores the color variant. If mixed historical values are present (domain or variant), rendering uses `resolveVariant` to normalize at view-time. Optional data migration can be considered later but is out of scope.

## UX & Accessibility
- Verify color contrast for text on background "20" shades in both light and dark themes. If contrast fails, switch to stronger shade tokens already available in theme. No new tokens introduced in this feature.

## Risks / Rollback
- Risk: Inconsistent historical `type` values causing unexpected colors. Mitigation: `resolveVariant` fallback and unit import checks in consumers.
- Rollback: Revert consumers to previous local maps; keep shared util for future consolidation when ready.

## Definition of Done
- All ACs validated on: chips, tags, timeline events, recent tasks lists
- No ad-hoc color maps remain in modified files; all use the shared util
- Status updated in `specs/PROGRESS_LEDGER.yaml` from pending → in_progress → done

## Execution Guardrails (for Dev Agent)
- Manual step gate is enforced. Do not proceed past each gate without explicit user "proceed".
- No new packages. Reuse theme tokens under `vakkerUI/src/ui/tokens/theme.ts`.
- Keep changes localized to files listed above; avoid API changes to components.
- If uncertainty about token names arises, inspect `@/ui/tokens/theme.ts` and align mappings.

## MCP Sequential Thinking Checkpoints
- After P0 gate: Validate `variantToToken` selections (contrast in light/dark), confirm gray mapping, and agree on `resolveVariant` fallback rules.
- At P1 mid-gate (after S3): Plan S4–S6 refactors, list remaining ad‑hoc maps to remove, and verify no behavior regressions in Tag/RecentTasksCard.
- Data compatibility decision: If historical `TaskEntity.type` values are mixed (domain vs variant), weigh render‑time normalization against migration; decide scope using MCP before proceeding.

## Acceptance Criteria Mapping
- Onderhoud → blue (variant: `blue`) → `primary` tokens → satisfied when rendered blue
- Project → yellow (variant: `yellow`) → `warning` tokens → satisfied when rendered yellow
- Klantenbezoek → green (variant: `green`) → `success` tokens → satisfied when rendered green
- Vrije Taak → gray (variant: `gray`) → `gray` tokens → satisfied when rendered gray

## QA Exit Criteria (alignment)
- Gray renders correctly across timeline and cards.
- All surfaces (Timeline/EventBlock, ClientInfo recent tasks, New Task persisted type) rely on the shared mapping.
- No ad-hoc color maps remain in touched files.



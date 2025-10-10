---
docType: prd_shard
features: [F-011]
deps: []
screens: []
anchors: [color-coding-system]
generatedBy: shard_generator
---

# PRD Shard: Color Coding System (Klantenbezoek) (F-011)

## Source
- MASTER_PRD.md#color-coding-system
- Sequence position: 13 of 17 in build order
- Generated: 2025-10-10

## Story & Context
Technicians benefit from consistent visual cues to quickly identify task types at a glance across calendar and lists.

## Scope & Requirements
- Establish a consistent color mapping for task types using vakkerUI theme tokens.
- Apply mapping wherever task type is presented (calendar items, tags, lists).
- Keep usage centralized so components consume the same mapping.

## Acceptance Criteria
- F-011-AC1: Given task type is Onderhoud, when displayed, then uses blue color coding.
- F-011-AC2: Given task type is Project, when displayed, then uses yellow color coding.
- F-011-AC3: Given task type is Klantenbezoek, when displayed, then uses green color coding.
- F-011-AC4: Given task type is Vrije Taak, when displayed, then uses gray color coding.

## Token Mapping
- Onderhoud → `theme.colors.primary.main`
- Project → `theme.colors.warning.main`
- Klantenbezoek → `theme.colors.success.main`
- Vrije Taak → `theme.colors.gray[500]`

## Dependencies & Context
- None required per PRD; relies on existing vakkerUI theme tokens.
- Complements F-008 (Calendar: Day View) and F-004 (Tasks: Create) where colors are visible.

## Dependencies (Libraries & Setup)
- vakkerUI theme tokens for color values.

## Screens & Components (if applicable)
- Screens: []
- Components: [Tag, EventBlock]

## Out of Scope
- Introducing new theme tokens (handled by F-012 Theming & Tokens).
- User-customizable color palettes.

## Risks & Considerations
- Ensure sufficient color contrast for accessibility and readability on dark theme.
- Keep mapping in a single source to avoid divergence across components.



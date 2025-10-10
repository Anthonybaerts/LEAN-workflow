---
docType: prd_shard
features: [F-012]
deps: []
screens: []
anchors: [theming-tokens]
generatedBy: shard_generator
---

# PRD Shard: Theming & Tokens (F-012)

## Source
- MASTER_PRD.md#theming-tokens
- Sequence position: 14 of 17 in build order
- Generated: 2025-10-10

## Story & Context
A consistent design system using vakkerUI tokens ensures a professional appearance and easier maintenance across screens.

## Scope & Requirements
- Define and apply vakkerUI design tokens for colors, spacing, typography.
- Default to dark theme across the app in MVP.
- Ensure components consume tokens via theme without hard-coded styles.

## Acceptance Criteria
- F-012-AC1: Given any screen, when rendered, then vakkerUI design tokens are used for colors, spacing, typography.
- F-012-AC2: Given app launches, when UI loads, then dark theme is applied by default.
- F-012-AC3: Given design tokens are updated, when app rebuilds, then changes apply consistently across all screens.

## Dependencies & Context
- Complements F-011 (Color Coding System) and informs overall app styling.

## Dependencies (Libraries & Setup)
- vakkerUI tokens and theming mechanisms.

## Screens & Components (if applicable)
- Screens: []
- Components: [Header, Button, Input, Tag, EventBlock, Card]

## Out of Scope
- Advanced theming (user theme switching, custom palettes) beyond MVP defaults.

## Risks & Considerations
- Ensure contrast ratios are acceptable on dark theme; avoid hard-coded inline colors.



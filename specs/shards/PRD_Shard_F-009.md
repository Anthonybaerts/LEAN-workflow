---
docType: prd_shard
features: [F-009]
deps: []
screens: []
anchors: [state-management]
generatedBy: shard_generator
---

# PRD Shard: State Management (F-009)

## Source
- MASTER_PRD.md#state-management
- Sequence position: 7 of 16 in build order
- Generated: 2025-09-22

## Story & Context
App needs coordinated state across screens and features.

## Scope & Requirements
- Redux Toolkit slices: auth, clients, tasks, ui; normalized entities synced with Firestore.
  - Delivery note: Initial implementation scaffolds `auth` and `ui` slices first; `clients` and `tasks` slices will be introduced within their respective features to align with staged delivery and minimize premature coupling.

## Acceptance Criteria
- F-009-AC1: Given user data changes on one screen, when navigating elsewhere, then updated data is reflected.
- F-009-AC2: Given app state exists, when app backgrounded/foregrounded, then state persists appropriately.
- F-009-AC3: Given Firestore data updates, when sync occurs, then Redux state updates to match.

## Dependencies & Context
Independent infra, but will be consumed by data features and screens.

## Dependencies (Libraries & Setup)
- Libraries referenced in PRD for this feature:
  - `@reduxjs/toolkit`, `react-redux`
- Config requirements (from PRD context):
  - Store scaffolding and conventions established

## Screens & Components (if applicable)
- Screens: []

## Build Context
- Position: step 7 of 16
- Next features in pipeline: F-008 (Calendar: Day View)

## Out of Scope
- Feature-specific UI; focus is on store structure and sync patterns.

## Risks & Considerations
- Ensure efficient selectors and normalized entities to avoid unnecessary re-renders.



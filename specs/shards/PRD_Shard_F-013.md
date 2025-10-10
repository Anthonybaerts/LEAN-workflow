---
docType: prd_shard
features: [F-013]
deps: []
screens: []
anchors: [error-empty-states]
generatedBy: shard_generator
---

# PRD Shard: Error & Empty States (F-013)

## Source
- MASTER_PRD.md#error-empty-states
- Sequence position: 15 of 17 in build order
- Generated: 2025-10-10

## Story & Context
Users need clear, consistent feedback when errors occur or when no data is available, so they understand what to do next.

## Scope & Requirements
- Provide reusable EmptyState and Toast patterns across screens.
- Implement copy and behavior specified in PRD for Clients only (Calendar empty state removed).

## Acceptance Criteria
- F-013-AC1: Given no clients exist, when ClientsScreen loads, then EmptyState shows with a message to add the first client.
- F-013-AC2: Removed (out of scope): Calendar empty state is deferred from MVP.
- F-013-AC3: Given an error occurs, when error happens, then a Toast notification displays with a clear error message.

## Dependencies & Context
- Leverage app-level primitives or a simple toast library for MVP (see PRD notes).

## Dependencies (Libraries & Setup)
- Optionally `react-native-toast-message` for toasts; minimal internal EmptyState component/pattern.

## Screens & Components (if applicable)
- Screens: []
- Components: [Header, EmptyState (pattern), Button]

## Out of Scope
- Advanced error handling workflows; global error boundary UX beyond MVP.
- Calendar empty state (deferred).

## Risks & Considerations
- Ensure messages are localized and consistent with PRD copy guidelines.



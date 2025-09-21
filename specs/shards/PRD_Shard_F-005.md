---
docType: prd_shard
features: [F-005]
deps: []
screens: []
anchors: [navigation-setup]
generatedBy: shard_generator
---

# PRD Shard: Navigation Setup (F-005)

## Source
- MASTER_PRD.md#navigation-setup
- Sequence position: 2 of 16 in build order
- Generated: 2025-09-21

## Story & Context
App needs structured navigation between Calendar and Clients sections.

## Scope & Requirements
- Bottom tabs (Calendar, Clients) + native stacks; full-screen drill-ins; hidden tab bar on drill-in routes.

## Acceptance Criteria
- F-005-AC1: Given app is loaded, when user sees bottom tabs, then Calendar and Clients tabs are visible with proper icons.
- F-005-AC2: Given user opens drill-in screens (NewTask, NewClient, ClientInfo), when screen opens, then tab bar is hidden.
- F-005-AC3: Given user is on a drill-in screen, when back is pressed, then app returns to the respective tab root.
- F-005-AC4: Given a deep link `vakker://calendar/:date`, when invoked, then the app opens CalendarScreen focused on that date.
- F-005-AC5: Given a deep link `vakker://calendar/:date/new`, when invoked, then the app opens NewTaskScreen with that date pre-selected.
- F-005-AC6: Given a deep link `vakker://client/:clientId`, when invoked, then the app opens ClientInfoScreen for that client ID in the Clients tab.

## Dependencies & Context
None.

## Dependencies (Libraries & Setup)
- Libraries referenced in PRD for this feature:
  - `react-native-screens`, `react-native-safe-area-context`, `react-native-gesture-handler`, `react-native-reanimated`.
- Config requirements (from PRD Implementation Notes):
  - App entry: `import 'react-native-gesture-handler';` must be at the very top of the entry file.
  - Root: Wrap the app in `GestureHandlerRootView` and `SafeAreaProvider`.
  - Babel: Add `react-native-worklets/plugin` to the app's Babel config (Expo SDK 54+/Reanimated v3+; vakkerUI already includes it).
  - Screens: `enableScreens()` is recommended historically; using `@react-navigation/native-stack` enables screens by default.
  - Expo: No manual linking required; rebuild Dev Client when adding new native modules.

## Screens & Components (if applicable)
- Screens: []

## Build Context
- Position: step 2 of 16
- Next features in pipeline: F-014 (Analytics (MVP-light))

## Out of Scope
None specified in feature section.

## Risks & Considerations
None specified in feature section.



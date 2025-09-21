---
docType: implementation
id: F-005
phases: [P0, P1, P2]
deliverables: [F-005-D1, F-005-D2, F-005-D3]
acCoverage: [F-005-AC1, F-005-AC2, F-005-AC3, F-005-AC4, F-005-AC5, F-005-AC6]
generatedBy: implementation_planner
---

# Implementation — F-005 (Navigation Setup)

Links:
- Shard: PRD_Shard_F-005.md
- Index: MASTER_INDEX.yaml (F-005)

## Deliverables (trace to ACs)
- F-005-D1 → F-005-AC1, F-005-AC2, F-005-AC3: Root navigation with bottom tabs (Calendar, Clients) + native stacks; hide tab bar on drill-in
- F-005-D2 → F-005-AC4, F-005-AC5, F-005-AC6: Deep linking patterns configured for calendar date, new task, and client detail
- F-005-D3 → (supports all ACs): Gesture/animation deps configured and app entry/root wrappers ready

## Phases (incremental, reference Deliverables & ACs)
- P0: Dependencies & Setup (S0)
  - Goal: Ensure navigation libraries and config are set up
  - Steps:
    - S0: Deps & Setup check for navigation
      - Ensure `react-native-gesture-handler`, `react-native-screens`, `react-native-safe-area-context`, `react-native-reanimated` are installed per BUILD_SEQUENCE
      - Confirm entry imports: `import 'react-native-gesture-handler';` in `vakkerUI/index.js` (present)
      - Confirm root wrappers exist in `src/app/_layout.tsx` (GestureHandlerRootView, SafeAreaProvider present)
      - Confirm Babel plugin: `react-native-worklets/plugin` (configured)
      - Confirm expo-router is used; plan route structure to match NAVIGATION_FLOW.md
  - Entry criteria: Global Pre-flight complete
  - Exit criteria: All required deps/config present; otherwise STOP and request update
  - Step Gate: After S0, STOP and wait for "proceed" from user before making any code changes.

- P1: Tabs + stacks route structure (D1 → F-005-AC1, F-005-AC2, F-005-AC3)
  - Goal: Implement bottom tabs for Calendar/Clients with native stacks; hide tab bar on drill-in
  - Steps:
    - S1: Define expo-router folder layout to mirror NAVIGATION_FLOW.md:
      - Tabs: `(tabs)/calendar/`, `(tabs)/clients/`
      - Stacks: add routes `Calendar`, `NewTask`, `EditTask` under calendar; `Clients`, `ClientInfo`, `NewClient`, `EditClient` under clients
    - S2: Configure tab options with icons `Calendar` and `Group` (reuse `@ui/icons`)
    - S3: Ensure drill-in screens set `tabBarStyle: { display: 'none' }`
    - S4: Set initial route to Calendar tab
    - S5: Wire `@ui/screens/*` components to routes
  - Entry criteria: deps met
  - Exit criteria: ACs satisfied: [F-005-AC1, F-005-AC2, F-005-AC3]
  - Step Gate: After P1 edits, STOP. Provide build notes and route map for user testing in Expo Go. Await "proceed" before starting P2.

- P2: Deep linking (D2 → F-005-AC4, F-005-AC5, F-005-AC6)
  - Goal: Configure deep links for calendar date, new task creation, and client detail
  - Steps:
    - S1: Define linking config in expo-router (scheme from `app.config.ts` → `extra.scheme` or `Env.SCHEME`)
    - S2: Map `vakker://calendar/:date` → `calendar/Calendar` with date param
    - S3: Map `vakker://calendar/:date/new` → `calendar/NewTask` with date param
    - S4: Map `vakker://client/:clientId` → `clients/ClientInfo` with `clientId`
    - S5: Verify navigation to correct stacks and params handling
  - Entry criteria: P1 complete
  - Exit criteria: ACs satisfied: [F-005-AC4, F-005-AC5, F-005-AC6]
  - Step Gate: After P2 edits, STOP. Provide test instructions (deep link examples) and await user validation.

## Data & State
- No data entities introduced. Navigation state managed by expo-router/React Navigation.

## UX Notes
- Bottom tabs show icons: `Calendar` and `Group` from `@ui/icons`.
- Drill-in screens hide tab bar per spec.

## Risks / Rollback
- Risks:
  - Misaligned folder structure with expo-router could break deep links
  - Missing native module rebuilds for Reanimated on EAS when needed
- Rollback Plan:
  - Disable deep link handling temporarily and use standard navigation until config is verified

## Definition of Done
- All ACs validated in QA doc
- No unresolved deps
- Reuse-first: All screens imported from `@ui/screens`; icons from `@ui/icons`

## Execution Guardrails (for Dev Agent)
- Manual step gate is enforced. Do not proceed past each gate without explicit user "proceed".
- No new packages unless the plan explicitly requires them.
- Use reuse-first approach: wire `@ui/screens` and `@ui/icons`; do not create custom UI.
- Context7 usage (when unsure):
  - expo-router v6 deep linking configuration (prefixes, params) and Tabs + Stack nesting patterns.
  - Cite any consulted notes to `docs/context7/` and list paths in EXEC_NOTES.
- Sequential Thinking MCP: before edits, map `NAVIGATION_FLOW.md` → folder/route structure and verify against `UI_MAP.yaml`. Include the short mapping in EXEC_NOTES.
- Build notes: if Metro cache issues arise after route layout changes, suggest `expo start -c` in EXEC_NOTES.

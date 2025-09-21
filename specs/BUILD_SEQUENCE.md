sequence: [F-001, F-005, F-014, F-006, F-002, F-007, F-009, F-008, F-010, F-003, F-004, F-011, F-012, F-013, F-015, F-016]
---

# Build Sequence

## Global Pre-flight Setup
Why now: Prevent mid-stream rebuilds and config churn; establish stable baseline.
Deliverables:
- Base dependency install per MASTER_PRD (React Navigation core + `react-native-screens`, `react-native-safe-area-context`, `react-native-gesture-handler`, `react-native-reanimated`; calendar: `react-native-calendars`; time: `@react-native-community/datetimepicker`; Firebase SDKs as needed; `expo-linking`; `expo-dev-client`; NativeWind/Tailwind packages; SVG: `react-native-svg`; Forms: `react-hook-form`, `zod`, `@hookform/resolvers`; State: `@reduxjs/toolkit`, `react-redux`; Date/Time utils: `dayjs`; Localization: `expo-localization`; Storage: `@react-native-async-storage/async-storage` (optional))
- Config: add Reanimated Babel plugin (`react-native-worklets/plugin` for Expo SDK 54+/Reanimated v3+); confirm Metro; set TS `paths` alias `@ui/*`; deep link scheme in app config (if used)
- App entry/wrappers: `import 'react-native-gesture-handler'`; wrap root with `GestureHandlerRootView` and `SafeAreaProvider`
- Native readiness: iOS pods (if bare)/Expo Dev Client/EAS rebuild plan when native deps change
- Permissions/secrets scaffolding: Firebase keys/env, platform permissions (if applicable)

## F-001 Auth: Login
Why now: Unblocks auth-dependent infra and all user flows (p1; no deps).
Deliverables:
- Login screen wired to chosen auth provider
- Auth/session state available to app layers

## F-005 Navigation Setup
Why now: Foundation for all screens and flows (p1; no deps).
Deliverables:
- Navigation container and root stacks/tabs configured
- Initial route and deep link patterns established
- Gesture/animation deps configured (`react-native-gesture-handler`, `react-native-reanimated`)
- Entry and root wrappers updated (`import 'react-native-gesture-handler'`, `GestureHandlerRootView`, `SafeAreaProvider`); Reanimated Babel plugin added (`react-native-worklets/plugin`)

## F-014 Analytics (MVP-light)
Why now: Measure adoption; only needs auth/nav (p7).
Deliverables:
- Event schema and minimal instrumentation
- Basic screen/view events and key actions

## F-006 Storage & Data Layer
Why now: Required by clients, calendar, and tasks features (p1; depends on auth).
Deliverables:
- Data client and storage abstraction ready (API/DB wiring)
- Persistence utilities (e.g., caching/secure storage) available

## F-002 Clients: List & Search
Why now: First user-facing data screen to validate infra (p2; screens; deps ready).
Deliverables:
- `ClientsScreen` with list, search, and loading/empty states
- Data integration via storage/data layer

## F-007 Form Validation
Why now: Prerequisite for create/edit flows; independent and reusable (p2).
Deliverables:
- Validation utilities configured (schema + helpers)
- Form components integrated with validation

## F-009 State Management
Why now: Cross-screen state patterns reduce rework later (p2).
Deliverables:
- App state store scaffolding and conventions
- Basic selectors/actions for auth and UI state

## F-008 Calendar: Day View
Why now: Core planner view; prerequisite for tasks create (p3; screens).
Deliverables:
- `CalendarScreen` day view with basic interactions
- Data hook-up to storage/data layer

## F-010 Clients: View Details
Why now: Detail view supports edit and workflows (p4; screens).
Deliverables:
- `ClientInfoScreen` showing client profile and actions
- Route from list/search to details

## F-003 Clients: Create
Why now: Enables basic CRUD; required before edit (p3; screens).
Deliverables:
- `NewClientScreen` form with validation and submit
- Navigate to `ClientInfoScreen` on success

## F-004 Tasks: Create
Why now: Key workflow depending on clients and calendar (p4; screens).
Deliverables:
- `NewTaskScreen` form with validation and calendar/client linkage
- Task persistence wired to data layer

## F-011 Color Coding System (Klantenbezoek)
Why now: Improves UX clarity; decoupled from core flows (p5).
Deliverables:
- Color token mapping and usage guidelines
- Applied to calendar/list items where applicable

## F-012 Theming & Tokens
Why now: Consistent UI foundation; safe after core flows (p5).
Deliverables:
- Design tokens and themes defined
- Components consuming tokens via theme

## F-013 Error & Empty States
Why now: Quality and resilience; independent (p6).
Deliverables:
- Standard error/empty components and patterns
- Integrated into list, details, and forms

## F-015 Clients: Edit (basic)
Why now: Builds on create + details; completes basic client CRUD (p8).
Deliverables:
- `EditClientScreen` with validation and submit
- Update flow from `ClientInfoScreen`

## F-016 Tasks: Edit (basic)
Why now: Completes core task workflow following create (p9).
Deliverables:
- `EditTaskScreen` with validation and submit
- Persistence updates and navigation back to context



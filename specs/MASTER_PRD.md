# Vakker - Service Technician Planning App

## Product Overview

**One-liner:** Vakker is a mobile-first planning app that helps solo service technicians manage clients, schedule jobs, and keep their daily agenda organized.

**Target Users:** Independent service technicians (e.g., plumbers, electricians, installers).

**Primary Workflows:**
- Add and manage client information (contacts, addresses, notes)
- Create and schedule jobs linked to clients
- View daily/weekly calendar with clear task color-coding
- Keep track of upcoming appointments in a simple agenda view

**Non-Goals (MVP):**
- No job reporting or work completion tracking by technicians
- No invoicing, payments, or quoting features
- No team or multi-user functionality in MVP (planner/technician roles not included yet)
- No integrations with external calendars or accounting tools

**Constraints:**
- Technology: React Native (Expo + NativeWind) mobile app
- UI Library: vakkerUI component library available for reuse
- Scope: lightweight MVP focused on planning and client/job management
- Compliance: must comply with GDPR for customer data storage
- Timeline: MVP should be delivered fast enough for early solo-user testing and feedback

**Success Signals/KPIs:**
- Number of jobs created per user per week
- Daily active usage of the calendar screen
- User retention after 4+ weeks
- Positive qualitative feedback from solo technician testers

## Tech Stack & Core Dependencies

- Frontend: Expo (React Native, TypeScript), NativeWind/Tailwind (`nativewind`, `tailwindcss`)
- Navigation: React Navigation (`@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`, `react-native-screens`, `react-native-safe-area-context`)
- Gestures & Animations: `react-native-gesture-handler`, `react-native-reanimated` (Babel plugin configured; wrap app root in `GestureHandlerRootView`)
- Linking: `expo-linking` (navigation linking with Expo)
- UI Library: vakkerUI (`@ui/*`) tokens, icons, components, screens
- Forms & Validation: React Hook Form, Zod
- State: Redux Toolkit, React Redux (optional: RTK Query or thunks for Firestore ops)
- Data & Auth: Firebase JS SDK (Auth, Firestore with offline persistence)
- Analytics: Firebase Analytics (via `@react-native-firebase/analytics` on EAS build)
- Dev Client: `expo-dev-client` (required for native Firebase Analytics during development)
- Calendar: `react-native-calendars` (month grid + agenda)
- Time Picker: `@react-native-community/datetimepicker`
- Date/Time Utils: `dayjs` (nl locale, parsing/formatting), optional `dayjs/plugin/utc`/`timezone`
- Localization: `expo-localization` (set `nl-NL` 24h format)
- Storage (optional): `@react-native-async-storage/async-storage` (local cache/user prefs)
- SVG: `react-native-svg` (icons already provided by vakkerUI)

Notes
- Use Context7 MCP to consult docs for `react-native-calendars` and `@react-native-community/datetimepicker` during setup.
- Expo Go is sufficient during MVP development; EAS Build/Dev Client required for native Firebase Analytics.

## UI Conventions

**Import Aliases:** `@ui/*` for vakkerUI components, screens, icons, and tokens
**Root Folders:** `src/ui/components/`, `src/ui/screens/`, `src/ui/icons/`
**Screen/Component Naming:** PascalCase (consistent with existing vakkerUI library)
**Reuse-First Approach:** Leverage existing vakkerUI screens and components where possible
**UI Consistency Goal:** Prevent ad-hoc UI and keep NewTask/NewClient flows visually identical

**Must-Reuse Core Components:**
- All existing screen templates: LoginScreen, ClientsScreen, ClientInfoScreen, NewClientScreen, CalendarScreen, NewTaskScreen
- Core components: Header, Button, Input, TabButton, CustomerCard, ContactDetailsCard, RecentTasksCard, NotesCard
- Additional components to reuse explicitly: RoundButton, TabSelection, TimeSlot, HourSelector, InfoCard, ClientBanner, Tag, EventBlock
- Form patterns: bordered Input style for forms, consistent action button placement
- Design tokens: colors, spacing, radius, typography from vakkerUI theme

## Navigation Architecture

**Library:** React Navigation with Expo
- `createBottomTabNavigator` for Calendar and Clients tabs
- `createNativeStackNavigator` inside each tab for drill-in screens
- `tabBarStyle: { display: 'none' }` on drill-in routes to hide tab bar

**Top-Level Tabs:**
- Calendar (Kalender) → CalendarScreen
- Clients (Klanten) → ClientsScreen

**Deep Linking Patterns:**
- `vakker://calendar/:date` → opens CalendarScreen at that date
- `vakker://calendar/:date/new` → jumps directly to NewTaskScreen for that date
- `vakker://client/:clientId` → opens ClientInfoScreen in the Clients tab

**Back Behavior:**
- From NewTaskScreen or NewClientScreen → back returns to respective root
- From ClientInfoScreen → back returns to ClientsScreen
- From tab roots → Android back button exits app (double-tap with toast confirmation)

Icon usage in calendar/nav
- Use `ArrowLeft` for back navigation and `ChevronRight` for forward navigation (verify `ChevronLeft` availability in icons; if missing, use `ArrowLeft` consistently).

---

## Epics

**E-100: Client Management** - Core client lifecycle management features
*Epic: client-management*

**E-200: Task Management** - Task scheduling and calendar functionality  
*Epic: task-management*

**E-300: App Foundation** - Core infrastructure and technical foundation
*Epic: app-foundation*

**E-400: User Experience** - Polish, theming, and user experience enhancements
*Epic: user-experience*

---

## Features

## [F-001] Auth: Login
<a id="auth-login"></a>
Slug: auth-login
Epic: E-300
Type: infra
Priority: 1
Deps: []
Screens: [LoginScreen]
Why: Users need secure authentication to access their personal client and task data.
Scope: Email/password sign-in using Firebase Auth; secure session persistence.
Acceptance Criteria
- F-001-AC1: Given valid email/password, when user taps "Inloggen", then Firebase Auth logs them in and app navigates to CalendarScreen.
- F-001-AC2: Given invalid credentials, when login is attempted, then error message displays "Ongeldige inloggegevens" and user stays on LoginScreen.
- F-001-AC3: Given successful login, when user reopens app, then session persists and user is auto-navigated to CalendarScreen without re-entering credentials.
UI Reuse: LoginScreen, Input, Button, Header

## [F-002] Clients: List & Search
<a id="clients-list-search"></a>
Slug: clients-list-search
Epic: E-100
Type: feature
Priority: 2
Deps: [F-001, F-005, F-006]
Screens: [ClientsScreen]
Why: Technicians need to quickly find and access client information to manage their work.
Scope: View searchable list of clients using CustomerCard; data sourced from Firebase Firestore.
Acceptance Criteria
- F-002-AC1: Given clients exist in Firestore, when user opens ClientsScreen, then all clients display in a scrollable list with CustomerCards.
- F-002-AC2: Given user types in the search bar, when input matches part of a name/company, then results filter in real time.
- F-002-AC3: Given no clients match search, when search completes, then an EmptyState card displays with a friendly message.
UI Reuse: ClientsScreen, Header, Input, CustomerCard, TabButton, RoundButton

## [F-003] Clients: Create
<a id="clients-create"></a>
Slug: clients-create
Epic: E-100
Type: feature
Priority: 3
Deps: [F-001, F-005, F-006, F-007]
Screens: [NewClientScreen, ClientInfoScreen]
Why: Technicians need to add new clients when acquiring new business.
Scope: Full-screen NewClientScreen with validated form (includes client type Zakelijk|Particulier); saves to Firestore; navigate directly to ClientInfoScreen after create.
Acceptance Criteria
- F-003-AC1: Given all required fields are filled in (type, name, email, phone, address), when user taps "Opslaan", then a new client document is created in Firestore and the app navigates directly to ClientInfoScreen for that new client.
- F-003-AC2: Given required fields are missing or invalid, when user taps "Opslaan", then form validation errors display under respective fields.
- F-003-AC3: Given successful client creation, when ClientInfoScreen loads, then the new client's data is visible immediately (name, email, phone, address, notes).
UI Reuse: NewClientScreen, Header, Input, Button, TabSelection

## [F-004] Tasks: Create
<a id="tasks-create"></a>
Slug: tasks-create
Epic: E-200
Type: feature
Priority: 4
Deps: [F-001, F-002, F-005, F-006, F-007, F-008]
Screens: [NewTaskScreen]
Why: Technicians need to schedule jobs and link them to clients for organized work planning.
Scope: NewTaskScreen full-screen (time range, client picker, type, notes); writes to Firestore.
Acceptance Criteria
- F-004-AC1: Given user taps an empty time slot in CalendarScreen, when NewTaskScreen opens and required fields are completed, then tapping "Taak Opslaan" creates a new task in Firestore and shows it in the timeline.
- F-004-AC2: Given user leaves required fields empty (e.g., time, client), when attempting to save, then form validation blocks submission and shows inline errors.
- F-004-AC3: Given a task is successfully created, when returning to CalendarScreen, then the new task displays at the correct time slot with proper color coding.
UI Reuse: NewTaskScreen, Header, HourSelector, InfoCard, Input, TabSelection, Button

Implementation Notes (Time Picker)
- Component: `NewTaskTime`
- Library: `@react-native-community/datetimepicker` (package: `react-native-datetimepicker/datetimepicker`). Use Context7 MCP for setup and examples.
- Format: 24-hour, increments of 15 or 30 minutes.
- Pre-fill: If created via calendar tap, default to that slot.
- Validation: `endAt > startAt` and both within the same day.
 - Note: `NewTaskTime` is a screen helper (not exported from `@ui/components`).

## [F-005] Navigation Setup
<a id="navigation-setup"></a>
Slug: navigation-setup
Epic: E-300
Type: infra
Priority: 1
Deps: []
Screens: []
Why: App needs structured navigation between Calendar and Clients sections.
Scope: Bottom tabs (Calendar, Clients) + native stacks; full-screen drill-ins; hidden tab bar on drill-in routes.
Acceptance Criteria
- F-005-AC1: Given app is loaded, when user sees bottom tabs, then Calendar and Clients tabs are visible with proper icons.
- F-005-AC2: Given user opens drill-in screens (NewTask, NewClient, ClientInfo), when screen opens, then tab bar is hidden.
- F-005-AC3: Given user is on a drill-in screen, when back is pressed, then app returns to the respective tab root.
 - F-005-AC4: Given a deep link `vakker://calendar/:date`, when invoked, then the app opens CalendarScreen focused on that date.
 - F-005-AC5: Given a deep link `vakker://calendar/:date/new`, when invoked, then the app opens NewTaskScreen with that date pre-selected.
 - F-005-AC6: Given a deep link `vakker://client/:clientId`, when invoked, then the app opens ClientInfoScreen for that client ID in the Clients tab.

Implementation Notes (Navigation Setup)
- Install: `react-native-screens`, `react-native-safe-area-context`, `react-native-gesture-handler`, `react-native-reanimated`.
- App entry: `import 'react-native-gesture-handler';` must be at the very top of the entry file.
- Root: Wrap the app in `GestureHandlerRootView` and `SafeAreaProvider`.
- Babel: Add `react-native-worklets/plugin` to the app's Babel config (Expo SDK 54+/Reanimated v3+; vakkerUI already includes it in its own Babel).
- Screens: `enableScreens()` is recommended historically; using `@react-navigation/native-stack` enables screens by default.
- Expo: No manual linking required; rebuild Dev Client when adding new native modules.

## [F-006] Storage & Data Layer
<a id="storage-data-layer"></a>
Slug: storage-data-layer
Epic: E-300
Type: infra
Priority: 1
Deps: [F-001]
Screens: []
Why: App needs persistent data storage for clients and tasks.
Scope: Firebase Firestore for storage; optional caching via Redux thunks/React Query; local persistence for offline reads.
Acceptance Criteria
- F-006-AC1: Given user creates/edits data, when saved, then changes persist to Firestore.
- F-006-AC2: Given app is offline, when user views previously loaded data, then cached data displays.
- F-006-AC3: Given app reconnects online, when data sync occurs, then local changes upload to Firestore.

## [F-007] Form Validation
<a id="form-validation"></a>
Slug: form-validation
Epic: E-300
Type: infra
Priority: 2
Deps: []
Screens: []
Why: Forms need validation to ensure data quality and prevent errors.
Scope: Zod/React-Hook-Form schemas; inline errors; disabled submit until valid.
Acceptance Criteria
- F-007-AC1: Given invalid form data, when user attempts submit, then inline errors show under respective fields.
- F-007-AC2: Given form has errors, when submit button is shown, then the button is disabled until all errors are resolved.
- F-007-AC3: Given valid form data, when user submits, then form processes successfully without client-side errors.

## [F-008] Calendar: Day View
<a id="calendar-day-view"></a>
Slug: calendar-day-view
Epic: E-200
Type: feature
Priority: 3
Deps: [F-001, F-005, F-006]
Screens: [CalendarScreen]
Why: Technicians need to see their daily schedule and available time slots.
Scope: CalendarScreen timeline with color-coded tasks from Firestore; tap slot to add.
Acceptance Criteria
- F-008-AC1: Given tasks exist for selected date, when CalendarScreen loads, then tasks display in correct time slots with proper color coding.
- F-008-AC2: Given user taps an empty time slot, when tap occurs, then NewTaskScreen opens with that time pre-selected.
- F-008-AC3: Given user changes date, when date selection changes, then timeline updates to show tasks for the new date.
 - F-008-AC4: Given the agenda view is displayed, when time grid renders, then working hours are limited to 07:00–19:00 (MVP default).
 - F-008-AC5: Given two or more tasks overlap in time, when rendered, then they are shown side-by-side within the slot; if more tasks overflow, a "+N" indicator is displayed.
UI Reuse: CalendarScreen, Header, TimeSlot, EventBlock, TabButton
Note: Integrate `react-native-calendars` and align theming with vakkerUI tokens.

Implementation Notes (Libraries)
- Calendar library: `react-native-calendars` (month grid + day agenda as in reference screenshot). Use Context7 MCP for setup guidance and best practices.
- Agenda bottom: custom `TimeSlot` component with 30-minute rows. Tapping an empty slot opens `NewTaskScreen` pre-filled with tapped time.
- Overlaps: show side-by-side blocks in the slot; if overflow, display "+N" indicator.
 - Working hours: 07:00–19:00 (MVP). Future: editable via `Pencil` icon in header.
 - Week start: Monday (Ma); locale: nl-NL; 24-hour format.
 - All-day tasks: Not supported in MVP.

## [F-009] State Management
<a id="state-management"></a>
Slug: state-management
Epic: E-300
Type: infra
Priority: 2
Deps: []
Screens: []
Why: App needs coordinated state across screens and features.
Scope: Redux Toolkit slices: auth, clients, tasks, ui; normalized entities synced with Firestore.
Acceptance Criteria
- F-009-AC1: Given user data changes on one screen, when navigating elsewhere, then updated data is reflected.
- F-009-AC2: Given app state exists, when app backgrounded/foregrounded, then state persists appropriately.
- F-009-AC3: Given Firestore data updates, when sync occurs, then Redux state updates to match.

## [F-010] Clients: View Details
<a id="clients-view-details"></a>
Slug: clients-view-details
Epic: E-100
Type: feature
Priority: 4
Deps: [F-002, F-005, F-006]
Screens: [ClientInfoScreen]
Why: Technicians need detailed client information including contact details, task history, and notes.
Scope: ClientInfoScreen with contact, recent tasks, notes pulled from Firestore.
Acceptance Criteria
- F-010-AC1: Given user taps a client card, when ClientInfoScreen opens, then contact details, recent tasks, and notes display.
- F-010-AC2: Given client has recent tasks, when screen loads, then RecentTasksCard shows last tasks with dates and status.
- F-010-AC3: Given user taps action buttons (Call, Email, Add Task), when tapped, then appropriate action is triggered.
UI Reuse: ClientInfoScreen, Header, ClientBanner, Button, ContactDetailsCard, RecentTasksCard, NotesCard

## [F-011] Color Coding System (Klantenbezoek)
<a id="color-coding-system"></a>
Slug: color-coding-system
Epic: E-400
Type: nfr
Priority: 5
Deps: []
Screens: []
Why: Consistent visual coding helps technicians quickly identify task types.
Scope: Consistent badges/tokens for task types (Onderhoud, Project, Bezoek, Vrije Taak).
Acceptance Criteria
- F-011-AC1: Given task type is Onderhoud, when displayed, then uses blue color coding.
- F-011-AC2: Given task type is Project, when displayed, then uses yellow color coding.
- F-011-AC3: Given task type is Klantenbezoek, when displayed, then uses green color coding.
- F-011-AC4: Given task type is Vrije Taak, when displayed, then uses gray color coding.
UI Reuse: Tag
Token Mapping
- Onderhoud → `theme.colors.primary.main`
- Project → `theme.colors.warning.main`
- Klantenbezoek → `theme.colors.success.main`
- Vrije Taak → `theme.colors.gray[500]` (shade can be adjusted if needed)

## [F-012] Theming & Tokens
<a id="theming-tokens"></a>
Slug: theming-tokens
Epic: E-400
Type: nfr
Priority: 5
Deps: []
Screens: []
Why: Consistent design system ensures professional appearance and maintainability.
Scope: Consistent colors/spacing/typography via vakkerUI tokens; dark default.
Acceptance Criteria
- F-012-AC1: Given any screen, when rendered, then vakkerUI design tokens are used for colors, spacing, typography.
- F-012-AC2: Given app launches, when UI loads, then dark theme is applied by default.
- F-012-AC3: Given design tokens are updated, when app rebuilds, then changes apply consistently across all screens.

## [F-013] Error & Empty States
<a id="error-empty-states"></a>
Slug: error-empty-states
Epic: E-400
Type: nfr
Priority: 6
Deps: []
Screens: []
Why: Users need clear feedback when errors occur or no data is available.
Scope: Reusable EmptyState + Toast patterns across screens.
Notes
- Use app-level primitives or an external library (e.g., `react-native-toast-message`) for toasts and empty messaging in MVP; do not extend `@ui` for these yet.
Acceptance Criteria
- F-013-AC1: Given no clients exist, when ClientsScreen loads, then EmptyState shows with a message to add the first client.
- F-013-AC2: Given no tasks for selected date, when CalendarScreen loads, then EmptyState shows appropriate message.
- F-013-AC3: Given an error occurs, when error happens, then a Toast notification displays with a clear error message.

## [F-014] Analytics (MVP-light)
<a id="analytics-mvp-light"></a>
Slug: analytics-mvp-light
Epic: E-400
Type: enhancement
Priority: 7
Deps: [F-001, F-005]
Screens: []
Why: Basic usage analytics help understand user behavior and app adoption.
Scope: Screen views & key events (create client/task) tracked via Firebase Analytics.
Acceptance Criteria
- F-014-AC1: Given user navigates between screens, when screen changes, then screen view events are logged to Firebase Analytics.
- F-014-AC2: Given user creates client or task, when creation completes, then a custom event is logged with relevant metadata.
- F-014-AC3: Given analytics data is collected, when viewed in Firebase console, then events show user engagement patterns.

## [F-015] Clients: Edit (basic)
<a id="clients-edit-basic"></a>
Slug: clients-edit-basic
Epic: E-100
Type: enhancement
Priority: 8
Deps: [F-003, F-010, F-007]
Screens: [EditClientScreen]
Why: Client information changes over time and needs to be updatable.
Scope: Edit core fields (name, phone, email, address) in full-screen flow; updates Firestore.
Acceptance Criteria
- F-015-AC1: Given user taps edit on ClientInfoScreen, when EditClientScreen opens, then current data pre-fills form fields.
- F-015-AC2: Given user modifies fields and taps save, when save completes, then Firestore updates and user returns to ClientInfoScreen with updated data.
- F-015-AC3: Given user taps cancel, when cancel pressed, then changes are discarded and user returns to ClientInfoScreen.

## [F-016] Tasks: Edit (basic)
<a id="tasks-edit-basic"></a>
Slug: tasks-edit-basic
Epic: E-200
Type: enhancement
Priority: 9
Deps: [F-004, F-008, F-007]
Screens: [EditTaskScreen]
Why: Task details may need adjustment after initial creation.
Scope: Edit time/client/type/description in full-screen edit screen; updates Firestore.
Acceptance Criteria
- F-016-AC1: Given user taps existing task, when EditTaskScreen opens, then current task data pre-fills form fields.
- F-016-AC2: Given user modifies task and saves, when save completes, then Firestore updates and CalendarScreen reflects changes.
- F-016-AC3: Given user changes task time, when saved, then task moves to the new time slot in calendar view.

---

## Dependencies & Screens per Feature

- Global: F-001 Auth is required for all user-facing features.
- F-005 Navigation must exist before any drill-in flows can be tested.
- F-006 Storage is required for Clients and Tasks features (Firestore).
- F-002 Clients: List is a prerequisite for Tasks (tasks link to existing clients).
- Create → Edit flows: Edit features depend on their corresponding Create features.
- F-014 Analytics depends on F-001 (Auth) and F-005 (Navigation).

Screens Map
- F-001 → LoginScreen
- F-002 → ClientsScreen
- F-003 → NewClientScreen → navigates to ClientInfoScreen
- F-010 → ClientInfoScreen
- F-015 → EditClientScreen (future)
- F-008 → CalendarScreen (integrate react-native-calendars)
- F-004 → NewTaskScreen
- F-016 → EditTaskScreen (future)

Additional Notes
- CalendarScreen requires `react-native-calendars` setup and theming aligned with vakkerUI tokens.
- Task docs in Firestore must reference Client docs for linkage.

---

## Prioritization

Priority 1 (Foundation)
- F-001, F-005, F-006

Priority 2 (Core MVP)
- F-007, F-009, F-002

Priority 3 (Main Features)
- F-003, F-008

Priority 4+ (Build-out)
- F-004, F-010, F-011, F-012, F-013, F-014, F-015, F-016

---

## Risks & Non-Functional Requirements

Major Risks
- Calendar integration and customization with `react-native-calendars` — confirm requirements before building.
- Firebase setup and data model design (clients vs tasks), auth security rules.
- Offline functionality scope (read-only vs full sync).

Performance / Reliability / Security
- GDPR compliance for all client personal data.
- Offline caching via Firestore persistence; robust retry logic for Redux sync.
- Validation (Zod + RHF) to prevent malformed data in Firestore.
- Firebase security rules must enforce per-user isolation.

Additional NFRs
- Consistency: Use vakkerUI tokens/components across all flows.
- Scalability: Firestore model should support later team features (planners/technicians).
- Accessibility: Calendar and forms must be usable with screen readers (basic compliance).

---

## Data Model (Firestore)

Collections
- clients: id, ownerId, type, name, email, phone, addressLine, postalCode, city, notes, createdAt, updatedAt
- tasks: id, ownerId, clientId, date, startAt, endAt, type, description, createdAt, updatedAt

Indexes
- tasks: (ownerId, date)
- tasks: (ownerId, clientId, startAt)
- clients: (ownerId, name)

Security Rules (conceptual)
- `request.auth.uid == resource.data.ownerId`

Client Types (MVP)
- `Zakelijk`, `Particulier`

---

## Validation Rules (Forms)

NewClientScreen
- Required: type (Zakelijk|Particulier), name, email, phone, addressLine
- Optional: postalCode, city, notes
- On save: Firestore create → navigate to ClientInfoScreen

NewTaskScreen
- Required: clientId, date, startAt, endAt, type
- Optional: description
- On save: Firestore create → return to CalendarScreen

Copy (Dutch)
- Invalid login: "Ongeldige inloggegevens"
- Empty client search: "Geen klanten gevonden"
- Empty day: "Geen taken"

---

## Analytics Events (Firebase Analytics)
- login_success
- client_created
- task_created
- calendar_day_viewed
- task_create_opened
- search_clients

# Navigation Flow Specification

```yaml
# Vakker Navigation Architecture
tabs:
  - id: calendar
    name: "Kalender"
    icon: "Calendar"
    component: "CalendarScreen"
    
  - id: clients
    name: "Klanten" 
    icon: "Group"
    component: "ClientsScreen"

stacks:
  calendar:
    - route: "Calendar"
      component: "CalendarScreen"
      title: "Kalender"
      tab_bar_visible: true
      
    - route: "NewTask"
      component: "NewTaskScreen"
      title: "Nieuwe Taak"
      tab_bar_visible: false
      presentation: "fullScreen"
      
    - route: "EditTask"
      component: "EditTaskScreen"
      title: "Taak Bewerken"
      tab_bar_visible: false
      presentation: "fullScreen"
      
  clients:
    - route: "Clients"
      component: "ClientsScreen"
      title: "Klanten"
      tab_bar_visible: true
      
    - route: "ClientInfo"
      component: "ClientInfoScreen"
      title: "Client Details"
      tab_bar_visible: false
      presentation: "fullScreen"
      
    - route: "NewClient"
      component: "NewClientScreen"
      title: "Nieuwe Klant"
      tab_bar_visible: false
      presentation: "fullScreen"
      
    - route: "EditClient"
      component: "EditClientScreen"
      title: "Klant Bewerken"
      tab_bar_visible: false
      presentation: "fullScreen"

auth_flow:
  - route: "Login"
    component: "LoginScreen"
    title: "Login"
    auth_required: false

deep_links:
  - pattern: "vakker://calendar/:date"
    target: "calendar/Calendar"
    params: ["date"]
    
  - pattern: "vakker://calendar/:date/new"
    target: "calendar/NewTask"
    params: ["date"]
    
  - pattern: "vakker://client/:clientId"
    target: "clients/ClientInfo"
    params: ["clientId"]

rules:
  back_behavior:
    - from: "NewTask|NewClient"
      to: "respective_tab_root"
      
    - from: "ClientInfo|EditTask|EditClient"
      to: "previous_screen_in_stack"
      
    - from: "tab_roots"
      to: "exit_app"
      android_confirmation: true

navigation_library: "React Navigation"
tab_navigator: "createBottomTabNavigator"
stack_navigator: "createNativeStackNavigator"
```

## Screen Component Mapping

**Auth Flow:**
- `LoginScreen` → Authentication before tab access

**Calendar Stack:**
- `CalendarScreen` → Calendar root with agenda/timeline view
- `NewTaskScreen` → Full screen task creation
- `EditTaskScreen` → Full screen task editing (future)

**Clients Stack:**  
- `ClientsScreen` → Client list root view
- `ClientInfoScreen` → Client detail with contact info, tasks, notes
- `NewClientScreen` → Full screen client creation
- `EditClientScreen` → Full screen client editing (future)

## UI Reuse Strategy

All screens leverage existing vakkerUI components:
- Reuse existing screen implementations where possible
- Follow established component patterns and prop interfaces
- Maintain design consistency through vakkerUI design tokens

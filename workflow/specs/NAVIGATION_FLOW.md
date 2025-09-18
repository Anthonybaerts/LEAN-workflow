# Navigation Flow — Single Source of Truth

## Rules (when to use what)
- Stack: hierarchical drill-in flows.
- Tabs: top-level parallel sections.
- Modals: transient or task-focused interruptions.
- Deep Links: canonical URIs for major screens.
- Back behavior: define per-platform expectations.

## Declarative Spec (YAML)
```yaml
app:
  auth:
    - route: LoginScreen

  tabs:
    - key: Calendar
      stack:
        - route: CalendarScreen
        - route: NewTaskScreen
        - route: EditTaskScreen

    - key: Clients
      stack:
        - route: ClientsScreen
        - route: NewClientScreen
        - route: ClientInfoScreen
        - route: EditClientScreen

  modals: []

deep_links:
  - route: CalendarScreen
    pattern: vakker://calendar/:date
  - route: NewTaskScreen
    pattern: vakker://calendar/:date/new
  - route: ClientInfoScreen
    pattern: vakker://client/:clientId

rules:
  unique_routes: true
  hide_tab_bar_on_drill_in: true
  back_behavior:
    stacks: pop
    tabs_root:
      android_exit_app_on_back: true
      require_double_tap_with_toast: true
```

## Conventions
- Route names are unique.
- All navigable targets should be listed in Index `screens` when applicable.


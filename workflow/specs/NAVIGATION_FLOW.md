# Navigation Flow — Single Source of Truth

## Rules (when to use what)
- Stack: hierarchical drill-in flows.
- Tabs: top-level parallel sections.
- Modals: transient or task-focused interruptions.
- Deep Links: canonical URIs for major screens.
- Back behavior: define per-platform expectations.

## Declarative Spec (YAML) — see canonical `NAVIGATION_FLOW.yaml`
```yaml
app:
  tabs:
    - key: Home
      stack:
        - route: ItemList
        - route: ItemDetail
    - key: Settings
      stack:
        - route: SettingsHome
  modals:
    - route: AddItemModal
  deep_links:
    - route: ItemDetail
      pattern: app://item/:id
rules:
  use_modal_for_creation: true
  back_button_closes_modals: true
```

## Conventions
- Route names are unique.
- All navigable targets should be listed in Index `screens` when applicable.


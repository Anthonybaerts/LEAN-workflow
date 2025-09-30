---
docType: prd_shard
features: [F-007]
deps: []
screens: []
anchors: [form-validation]
generatedBy: shard_generator
---

# PRD Shard: Form Validation (F-007)

## Source
- MASTER_PRD.md#form-validation
- Sequence position: 6 of 16 in build order
- Generated: 2025-09-22

## Story & Context
Forms need validation to ensure data quality and prevent errors.

## Scope & Requirements
- Zod/React-Hook-Form schemas; inline errors; disabled submit until valid.

## Acceptance Criteria
- F-007-AC1: Given invalid form data, when user attempts submit, then inline errors show under respective fields.
- F-007-AC2: Given form has errors, when submit button is shown, then the button is disabled until all errors are resolved.
- F-007-AC3: Given valid form data, when user submits, then form processes successfully without client-side errors.

## Dependencies & Context
Independent; consumed by create/edit flows (e.g., F-003, F-004, F-015, F-016).

## Dependencies (Libraries & Setup)
- Libraries referenced in PRD for this feature:
  - `zod`, `react-hook-form`, `@hookform/resolvers/zod`
- Config requirements (from PRD context):
  - None beyond standard library setup

## Screens & Components (if applicable)
- Screens: []
- Components: []

## Build Context
- Position: step 6 of 16
- Next features in pipeline: F-009 (State Management)

## Out of Scope
- Styling/polish beyond error messages and disabled states.

## Risks & Considerations
- Ensure consistent validation messages and i18n where applicable.



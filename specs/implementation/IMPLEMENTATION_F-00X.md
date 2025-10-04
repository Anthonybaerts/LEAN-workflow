---
docType: implementation
id: F-00X
phases: [P1, P2, P3, P4, P5, P6]
deliverables: [F-00X-D1, F-00X-D2, F-00X-D3, F-00X-D4, F-00X-D5]
acCoverage: [F-00X-AC1, F-00X-AC2, F-00X-AC3, F-00X-AC4, F-00X-AC5]
generatedBy: implementation_planner
---

# Implementation — F-00X (Variable-Height Tasks in Calendar Day View)

Links:
- Index: MASTER_INDEX.yaml (F-00X)

## Problem Definition
- Current issue: Tasks render as fixed-height blocks inside 30-minute rows, so duration is not visually encoded, minute-level start times cannot be aligned, and overlaps may clip each other.
- Goal: Render tasks with heights proportional to duration and positions accurate to the minute. Keep the visible day window parametric (e.g., 07:00→19:00) and display overlaps side-by-side.

## Deliverables (trace to ACs)
- F-00X-D1 → F-00X-AC1: Timeline container with parametric start/end and grid overlay.
- F-00X-D2 → F-00X-AC2: Minute-precise y-position and height calculation with clamping.
- F-00X-D3 → F-00X-AC3: Absolutely positioned `EventBlock`s over the grid (single layer), with accessible touch targets.
- F-00X-D4 → F-00X-AC4: Overlap grouping and column layout (no clipping, equal widths, gaps).
- F-00X-D5 → F-00X-AC5: Edge-case handling (outside window, very short tasks), dark theme compatibility, and QA checklist.

## Phases (incremental)

- P1: Timeline container and parametric window (D1 → F-00X-AC1)
  - Goal: Replace row-based layout with a continuous, minute-addressable timeline.
  - Steps:
    - S1: Add `timelineConfig`: `{ startHour=7, endHour=19, slotMinutes=30 }` (configurable).
    - S2: Compute `windowMinutes = (endHour - startHour) * 60` and `pxPerMinute` from a design baseline (e.g., 30 minutes ≈ 56 px).
    - S3: Render a `TimelineContainer` with height `windowMinutes * pxPerMinute` and a memoized grid overlay (hour lines emphasized, slot lines subtle).
  - MCP:
    - Sequential Thinking (REQUIRED): Confirm inputs and derived values; note rendering order (grid below, events above).
    - Context7 (OPTIONAL): Validate absolute-positioned layers and scroll container best practices.
  - Gate: STOP. Verify window renders correctly with no tasks.
  - Manual Step Gate: Ask user to say 'proceed' before continuing to P2.

- P2: Minute-precise positioning and sizing (D2 → F-00X-AC2)
  - Goal: Convert task times to pixel y/heights with device-pixel rounding and clamps.
  - Steps:
    - S1: Parse HH:mm → minutes from midnight for `startAt`/`endAt`.
    - S2: Convert to minutes from window start: `startMin = max(0, start - windowStart)`, `endMin = min(windowMinutes, end - windowStart)`.
    - S3: `y = startMin * pxPerMinute`; `h = max(minTouchPx, (endMin - startMin) * pxPerMinute)`; round to device pixel ratio.
  - MCP:
    - Sequential Thinking (REQUIRED): List clamp cases and rounding policy.
  - Gate: STOP. Validate with sample times (07:15, 08:10, 09:45).
  - Manual Step Gate: Ask user to say 'proceed' before continuing to P3.

- P3: Absolute rendering layer over grid (D3 → F-00X-AC3)
  - Goal: Draw events as a single absolutely positioned layer atop the timeline.
  - Steps:
    - S1: Add `EventsLayer` with `position: 'absolute'` inside the `TimelineContainer`.
    - S2: Render `EventBlock` components with `top=y`, `height=h`, full width by default.
    - S3: Ensure accessibility (label, role, onPress) and maintain `minTouchPx ≥ 44` while indicating very-short durations with an inner bar if needed.
    - S4: Memoize `EventBlock` and styles; avoid inline allocations in render loops.
  - MCP:
    - Context7 (REQUIRED): Check RN performance tips for absolute layers, shadow/overdraw budget, and memoization.
  - Gate: STOP. Compare 1h vs 2h blocks (exact 2× ratio).
  - Manual Step Gate: Ask user to say 'proceed' before continuing to P4.

- P4: Overlap detection and column layout (D4 → F-00X-AC4)
  - Goal: Place overlapping tasks side-by-side with equal widths and consistent gaps.
  - Steps:
    - S1: Sweep-line grouping: sort tasks by start; track an active set; create groups until the active set empties.
    - S2: Column assignment within each group: greedy placement into the leftmost non-intersecting column; create new columns as needed.
    - S3: Horizontal layout: `gap = theme.spacing[2]`; `colWidth = (containerWidth - gap*(cols-1)) / cols`; `x = colIndex * (colWidth + gap)`.
    - S4: Truncation and z-order: ensure label legibility; avoid clipping.
  - MCP:
    - Sequential Thinking (REQUIRED): Define intersection criteria (minute-based) and validate with 2–4 overlapping tasks.
  - Gate: STOP. Side-by-side verified; no clipping.
  - Manual Step Gate: Ask user to say 'proceed' before continuing to P5.

- P5: Edge cases, clamping, and configuration (D5 → F-00X-AC5)
  - Goal: Robust behavior under unusual inputs and configurable windows.
  - Steps:
    - S1: Clamp tasks starting before window start and ending after window end.
    - S2: Zero/negative durations → render `minTouchPx` with a visual indicator; log for data QA (non-blocking).
    - S3: Keep `slotMinutes` only for grid density; calculations stay minute-precise regardless of grid.
    - S4: Changing `{ startHour, endHour }` reflows without code edits.
    - S5: Dark theme and RTL checks; contrast and hit areas.
  - Gate: STOP. Run edge-case checklist.
  - Manual Step Gate: Ask user to say 'proceed' before continuing to P6.

- P6: QA & performance
  - Goal: Ensure smooth scroll and interaction on target devices.
  - Steps:
    - S1: Memoize computed layouts; `React.memo` leaf components.
    - S2: Avoid heavy shadow/elevation; use borders and solid backgrounds to reduce overdraw.
    - S3: Verify smoothness on mid-tier Android; confirm no unnecessary re-renders from prop identity changes.
    - S4: Accessibility: focus states, TalkBack/VoiceOver labels.
  - MCP:
    - Context7 (REQUIRED): Re-check RN best practices for list virtualization and absolute overlays.
  - Gate: STOP. Sign off on ACs.
  - Manual Step Gate: Ask user to say 'proceed' to close out implementation.

## Acceptance Criteria
- F-00X-AC1: Timeline container respects parametric window; grid renders correctly for hours and slots.
- F-00X-AC2: Minute precision: 07:15, 07:45, 08:10 start positions align at the correct vertical pixel offsets; 2h task height is exactly 2× a 1h task (±1 px rounding).
- F-00X-AC3: Events render absolutely over the grid with accessible touch targets (≥44 px) and correct dark theme visuals.
- F-00X-AC4: Overlapping tasks display side-by-side with equal column widths and consistent horizontal gaps; no clipping.
- F-00X-AC5: Tasks outside the visible window are clamped, very short tasks remain tappable, and changing the window (e.g., 07:00→17:00) requires no code edits.

## Data & State
- Inputs: `tasks[]` with `{ startAt, endAt, description, type(color) }`.
- Derived per task: `{ y, height, overlapGroupId, columnIndex, columnCount, x, width }`.
- Config: `{ startHour, endHour, slotMinutes, pxPerMinute, minTouchPx }`.

## UX Notes
- Keep `EventBlock` visuals consistent with current design (rounded corners, subtle borders, dark theme).
- Hour lines emphasized; slot lines subtle; labels truncate gracefully when columns reduce width.

## Risks / Rollback
- Risk: Overlap computation causing jank with large datasets.
  - Mitigation: Sweep-line O(n log n), memoization; test with 100+ tasks.
- Risk: Tiny durations become untappable.
  - Mitigation: Enforce `minTouchPx` and provide a micro-duration marker.
- Rollback: Fall back to fixed-height slots with improved labels if necessary (feature flag).

## Definition of Done
- All ACs validated on iOS and Android with dark theme; smooth interactions on mid-tier devices; no regressions to month view.

## Execution Guardrails (for Dev Agent)
- Localize edits to `/(tabs)/calendar/index.tsx`, `ui/components/EventBlock`, and a new `calendar/timeline` utility.
- No new heavy dependencies; pure TypeScript math and absolute layout.
- Batch per phase (≤150 LOC / ≤3 files per gate); STOP after each gate for manual QA.

## Context7 Best-Practices Notes (summary)
- Absolute overlay over a single scroll container is appropriate; memoize leaf components; keep static StyleSheet objects; avoid keys that break recycling; minimize shadows/elevations; preserve 44 px touch targets.



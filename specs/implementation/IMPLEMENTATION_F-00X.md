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
 - Grid density vs precision: `slotMinutes` controls only the visual grid (lines). Event placement is minute-precise (e.g., 07:15, 08:10) and must not snap to rows.

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
    - S3: Render a `TimelineContainer` with height `windowMinutes * pxPerMinute` and a memoized grid overlay (hour lines emphasized, slot lines subtle). `slotMinutes` affects the grid only; events remain minute-precise.
    - S4: Scroll interplay: day view uses a single vertical scroll for the timeline container. Keep the calendar header static (no second scroll).
    - S5: When switching days/months, keep the timeline mounted and only update data to avoid remount jank.
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
    - S4: Grid density vs precision: do not snap event positions to grid lines; placement remains minute-precise regardless of `slotMinutes`.
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
    - S5: Confirm single vertical scroll remains (events layer inside the timeline scroll container).
  - MCP:
    - Context7 (REQUIRED): Check RN performance tips for absolute layers, shadow/overdraw budget, and memoization.
  - Gate: STOP. Compare 1h vs 2h blocks (exact 2× ratio).
  - Manual Step Gate: Ask user to say 'proceed' before continuing to P4.

- P4: Overlap detection and basic column layout (D4 → F-00X-AC4)
  - Goal: Provide stable side-by-side for 2 concurrent tasks; avoid blocking user taps.
  - Steps:
    - S1: Simple overlap grouping (sweep-line) to detect concurrent intervals.
    - S2: Basic column policy: when exactly 2 tasks overlap, render them side-by-side (equal widths, gap). If >2 overlap, allow visual overlap but ensure each block remains tappable.
    - S3: Horizontal layout for 2-way overlaps: `gap = theme.spacing[2]`; `width = (containerWidth - gap) / 2`; `x = 0` or `width + gap`.
    - S4: Tappability guard: ensure hit areas remain ≥44 px in width/height where feasible; prioritize press handling.
    - S5: Hit-testing note (MVP): guarantee taps for stacked >2 overlaps via `zIndex` ordering (topmost receives press) and a small `hitSlop` (≈6–8 px) on `EventBlock`. Do not over-engineer packing.
  - MCP:
    - Sequential Thinking (REQUIRED): Define intersection criteria (minute-based) and validate with 2 overlapping tasks; document >2 policy.
  - Gate: STOP. Side-by-side for 2-way verified; >2 remains tappable.
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
    - S3: Accessibility: focus states, TalkBack/VoiceOver labels.
    - S4: QA Checklist (executed by Product Owner; dev provides checklist only):
      - short tasks (15–30m), 1h, 2h; verify 2h ≈ 2× 1h height (±1 px).
      - starts at 07:15 and 08:10 align correctly.
      - tasks partially outside window are clamped.
      - at least 2 overlapping tasks render side-by-side and are tappable.
  - MCP:
    - Context7 (REQUIRED): Re-check RN best practices for list virtualization and absolute overlays.
  - Gate: STOP. Sign off on ACs.
  - Manual Step Gate: Ask user to say 'proceed' to close out implementation.

## Acceptance Criteria
- F-00X-AC1: Parametric window renders correctly; grid is visual-only (controls lines), not event placement. Note: events may appear between slot lines and that’s expected.
- F-00X-AC2: Minute precision positions/heights: 07:15/08:10 align correctly; 2h = 2× 1h (±1 px).
- F-00X-AC3: Events render absolutely; dark theme respected; touch targets ≥44 px.
- F-00X-AC4 (MVP): At least 2 overlapping tasks appear side-by-side and are tappable; if >2, visual overlap is allowed but all remain tappable.
- F-00X-AC5: Window changes (e.g., 07:00→17:00) require no code edits; clamp behavior is correct for outside-window tasks.

## Data & State
- Inputs: `tasks[]` with `{ startAt, endAt, description, type(color) }`.
- Derived per task: `{ y, height, overlapGroupId, columnIndex, columnCount, x, width }`.
- Config: `{ startHour, endHour, slotMinutes, pxPerMinute, minTouchPx }`.

## UX Notes
- Keep `EventBlock` visuals consistent with current design (rounded corners, subtle borders, dark theme).
- Hour lines emphasized; slot lines subtle; labels truncate gracefully when columns reduce width.
- Grid density vs precision: `slotMinutes` sets only line density; events may appear between 30-min lines and must not snap to rows. Optional (non-blocking): minor 15-min ticks if it improves readability; do not couple placement to ticks.
- Scroll interplay: one vertical scroll for the timeline; keep header static; keep timeline mounted on day/month changes to avoid jank.
- Overlap hit-testing: for >2 stacked events, use `zIndex` layering and small `hitSlop` to ensure each event is tappable without perfect packing.

## Risks / Rollback
- Risk: Overlap computation causing jank with large datasets.
  - Mitigation: Sweep-line O(n log n), memoization; ensure no visible jank on realistic workloads.
- Risk: Tiny durations become untappable.
  - Mitigation: Enforce `minTouchPx` and provide a micro-duration marker.
- Rollback: Fall back to fixed-height slots with improved labels if necessary (feature flag).
 - Complexity risk (plain terms): Absolute positioning with overlaps is non-trivial because we compute rectangles, detect intersections, and place columns without visual jitter. MVP constraint: implement basic, stable side-by-side for simple (2-task) overlaps and time-box any advanced packing. Fallback: if layout gets jittery, keep minute-precise durations correct and accept visual overlap for >2 tasks as long as taps still work.

## Definition of Done
- All ACs validated on iOS and Android with dark theme; PO executes QA via the provided checklist; smooth interactions; no regressions to month view.

## Execution Guardrails (for Dev Agent)
- Localize edits to `/(tabs)/calendar/index.tsx`, `ui/components/EventBlock`, and a new `calendar/timeline` utility.
- No new heavy dependencies; pure TypeScript math and absolute layout.
- Batch per phase (≤150 LOC / ≤3 files per gate); STOP after each gate for manual QA.

## Context7 Best-Practices Notes (summary)
- Absolute overlay over a single scroll container is appropriate; memoize leaf components; keep static StyleSheet objects; avoid keys that break recycling; minimize shadows/elevations; preserve 44 px touch targets.



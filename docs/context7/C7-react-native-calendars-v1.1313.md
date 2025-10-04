# Context7 Notes: react-native-calendars v1.1313.x

**Generated:** 2025-10-03  
**Library:** react-native-calendars ^1.1313.0  
**Components:** ExpandableCalendar, Timeline  
**Source:** Context7 + Web Research

---

## ExpandableCalendar API (v1.1313.x)

### Key Props for Behavior Control

| Prop | Type | Default | Description | Current File Value |
|------|------|---------|-------------|-------------------|
| `initialPosition` | string | `'closed'` | Sets initial calendar position: `'open'` (month grid) or `'closed'` (week view) | `OPEN` (line 177) |
| `closeOnDayPress` | boolean | `false` | If `true`, calendar collapses to week view when day is tapped | `true` (line 178) ⚠️ |
| `disablePan` | boolean | `false` | Disables pan/swipe gesture to expand/collapse | `true` (line 179) |
| `disableWeekScroll` | boolean | `false` | Disables horizontal week scrolling in collapsed mode | `true` (line 180) |
| `hideKnob` | boolean | `false` | Hides the knob/handle for manual expand/collapse | `true` (line 182) ⚠️ |
| `allowShadow` | boolean | `true` | Shows shadow effect on calendar | `false` (line 181) |

### Identified Issues

1. **`closeOnDayPress={true}`** (line 178)
   - **Problem:** Calendar collapses to week view when user taps any day
   - **Desired:** Day tap should only update selection, NOT collapse calendar
   - **Fix:** Set to `false` or remove prop

2. **`hideKnob={true}`** (line 182)
   - **Problem:** No knob/handle visible, preventing manual expand/collapse
   - **Desired:** User should be able to manually expand/collapse via knob/header gesture
   - **Fix:** Set to `false` or remove prop

3. **`disablePan={true}`** (line 179)
   - **Problem:** Pan gesture disabled, limiting manual expand options
   - **Consider:** May want to enable pan for smoother UX
   - **Decision:** Test with `false` to allow gesture-based expand

### Recommended Configuration for Goals

```javascript
<ExpandableCalendar
  initialPosition={ExpandableCalendar.positions.OPEN} // Month visible by default
  closeOnDayPress={false}  // Day tap = selection change only
  disablePan={false}       // Allow pan gesture to expand/collapse
  hideKnob={false}         // Show knob for manual expand
  // ... other props
/>
```

---

## Timeline API (v1.1313.x)

### Props for Display Control

| Prop | Type | Default | Description | Current File Value |
|------|------|---------|-------------|-------------------|
| `date` | string | required | Date to display events for (`YYYY-MM-DD`) | `selectedDate` (line 218) ✓ |
| `events` | array | `[]` | Array of event objects for the day | `eventsByDate[selectedDate]` (line 219) ✓ |
| `format24h` | boolean | `false` | Use 24-hour time format | `true` (line 220) ✓ |
| `initialTime` | string | `'07:00'` | Initial scroll position time | `'07:00'` (line 221) ✓ |
| `scrollToNow` | boolean | `false` | Auto-scroll to current time | `true` (line 225) ✓ |
| `showNowIndicator` | boolean | `false` | Show current time line indicator | `true` (line 224) ✓ |

### Event Handlers

| Prop | Description | Current File Value |
|------|-------------|-------------------|
| `onEventPress` | Callback when event tapped | `onEventPress` (line 222) ✓ |
| `onBackgroundLongPress` | Callback when empty timeline area long-pressed | `onBackgroundTap` (line 223) ✓ |

### Theming / Styles Object

The `styles` prop accepts an object with these keys (lines 226-235):

| Style Key | Description | Current Value | Notes |
|-----------|-------------|---------------|-------|
| `container` | Main timeline container | `backgroundColor: gray[900]` | ✓ Dark |
| `line` | Hour separator lines | `backgroundColor: gray[700]` | ✓ Dark, may need contrast check |
| `timeLabel` | Hour label text (left side) | `color: gray[500]` | ✓ Dark, readable |
| `nowIndicatorLine` | Current time horizontal line | `backgroundColor: primary.main` | ✓ Accent color |
| `nowIndicatorKnob` | Current time knob/dot | `backgroundColor: primary.main` | ✓ Accent color |
| `event` | Event block styling | `backgroundColor: gray[800]`, `borderColor: gray[600]`, `borderWidth: 1` | ✓ Dark with border |
| `eventTitle` | Event title text | `color: white` | ✓ Readable |
| `eventSummary` | Event summary text | `color: gray[300]` | ✓ Secondary text |

### Potential Missing Style Keys

Based on general Timeline components, these keys might also be supported (need testing):

- `timelineBackground` - Overall background (may be same as `container`)
- `verticalLine` - Vertical line on left side
- `hourText` - Alternative to `timeLabel`
- `eventBackground` - Alternative to `event.backgroundColor`

### Timeline Layout Notes

- Timeline renders inside a `<View style={{ flex: 1 }}>` (line 264-267)
- This gives Timeline most vertical space
- Layout appears correct, but actual rendered height depends on:
  - ExpandableCalendar height above it
  - Header height
  - Date selection bar height

---

## Version-Specific Concerns (v1.1313.x)

### Known Limitations

1. **React 19 + Reanimated Warnings**
   - ExpandableCalendar uses react-native-reanimated internally
   - May trigger `useInsertionEffect` warnings with React 19
   - **Mitigation:** These are library warnings, not user errors; may be unavoidable
   - **Future:** Monitor library updates; may require pinning to specific minor version

2. **Timeline Start/End Window**
   - Not clear if `start` and `end` hour props are supported in this version
   - Current approach uses `initialTime` + `scrollToNow`
   - **Recommendation:** Stick with current approach; seems to work

3. **Event Overlap Rendering**
   - Library should handle side-by-side overlaps automatically
   - Events need unique `id` keys
   - Current implementation provides `id: t.id` (line 121) ✓

---

## Current Implementation Status

### ✅ What's Working

- Dark theme applied to Timeline styles
- CalendarProvider single-source date management
- Event mapping from Firestore tasks
- Task type → color mapping
- Event and background tap handlers
- 24h format
- Initial scroll to 07:00

### ⚠️ Issues Identified

1. **closeOnDayPress={true}** - Causing unwanted collapse on day tap
2. **hideKnob={true}** - Preventing manual expand/collapse
3. **disablePan={true}** - Limiting interaction options

### 🔍 Needs Testing

- Actual vertical space allocation for Timeline (may be cramped)
- Visibility of hour lines (gray[700] on gray[900])
- All Timeline style keys actually applying
- React 19 warnings in console

---

## P1 Recommended Changes

```diff
<ExpandableCalendar
  current={selectedDate}
  firstDay={1}
  hideExtraDays
  onDayPress={onDayPress}
- initialPosition={(ExpandableCalendar as any).positions?.OPEN}
+ initialPosition={ExpandableCalendar.positions.OPEN}
- closeOnDayPress
+ closeOnDayPress={false}
- disablePan
+ disablePan={false}
- disableWeekScroll
- allowShadow={false}
- hideKnob
+ hideKnob={false}
  markedDates={{ [selectedDate]: { selected: true, disableTouchEvent: true } }}
  // ... rest of props
/>
```

**Rationale:**
- `closeOnDayPress={false}` - Day tap only changes selection
- `hideKnob={false}` - User can manually expand/collapse
- `disablePan={false}` - Smoother gesture-based expand
- Remove `disableWeekScroll` - Not needed if calendar stays open
- Remove `allowShadow={false}` - Visual polish

---

## References

- Context7 Library ID: `/wix/react-native-calendars`
- Documentation: https://wix.github.io/react-native-calendars/
- GitHub: https://github.com/wix/react-native-calendars
- Trust Score: 9.1/10
- Code Snippets Available: 34

---

**Next Steps (P1):** Apply ExpandableCalendar prop changes and test behavior


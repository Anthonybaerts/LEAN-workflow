<!-- dd68734e-0325-4ece-8da0-93fb53bdff9d 113be3aa-1c0d-429f-a66f-145ff4052e74 -->
# IMPLEMENTATION F-016 — Migrate to react-native-safe-area-context (Incremental)

Target file: `specs/implementation/IMPLEMENTATION_F-016.md`

### Scope and constraints

- Replace deprecated `SafeAreaView` from `react-native` with `react-native-safe-area-context`.
- Keep changes incremental; avoid restructuring.
- Do not add libraries besides `react-native-safe-area-context`.
- Preserve visuals/behavior on iOS & Android (tabs, modals, bottom sheets).

### Decision gates (stop-and-ask checkpoints)

- Gate A — After Baseline: confirm to proceed with import swaps.
- Gate B — After Import Swap: confirm to proceed with edges/insets. Option to proceed per-screen.
- Gate C — After First Screen Edges/Insets: review screenshots; confirm to continue with remaining screens.
- Gate D — Before Bottom Sheet Changes: approve adding `bottomInset` (and `topInset` if needed).
- Gate E — Before Final Cleanup/Verification: confirm to run final grep and visual checks; approve PR prep.

Context window guardrails
- Change limit per commit: ≤4 files, ≤150 total changed lines. If exceeded, pause and ask before proceeding.
- If a step touches multiple screens, process 1–2 screens, then pause for approval (Gate C).
- Avoid running long-lived commands or simulators without explicit approval.

### Baseline and setup (confirmed)

- Dependency present in `vakkerUI/package.json`: `react-native-safe-area-context`.
- Single `SafeAreaProvider` already at `src/app/_layout.tsx`:
```36:44:vakkerUI/src/app/_layout.tsx
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <ToastProvider>
            <Slot />
          </ToastProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
```
- No additional providers required.

Stop here (Gate A): Confirm to proceed to Import Swap.

### Commit plan (small, verifiable diffs)

1) Baseline verification (no-op)
- Confirm provider and dependency; no code changes.
- Commit: `chore(safe-area): baseline verified provider and dependency`

2) Import swap only (mechanical)
- Replace RN `SafeAreaView` imports with safe-area-context in these files:
  - `src/ui/screens/ClientsScreen/ClientsScreen.tsx`
  - `src/ui/screens/NewClientScreen/NewClientScreen.tsx`
  - `src/ui/screens/EditClientScreen/EditClientScreen.tsx`
  - `src/ui/screens/ClientInfoScreen/ClientInfoScreen.tsx`
- Example change:
```diff
- import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
\+ import { View, Text, StyleSheet, ScrollView } from 'react-native';
\+ import { SafeAreaView } from 'react-native-safe-area-context';
```
- Commit: `feat(safe-area): swap RN SafeAreaView → safe-area-context`

Stop here (Gate B): Confirm to proceed to Edges/Insets. Optionally choose: all screens vs one-by-one.

3) Edges and insets for screens (explicit + minimal)
- Add `edges={['top','bottom']}` to the root `SafeAreaView` on full-screen pages:
  - `ClientsScreen.tsx`
  - `NewClientScreen.tsx`
  - `EditClientScreen.tsx`
  - `ClientInfoScreen.tsx`
- `EditClientScreen.tsx`: ensure bottom action area remains above home/nav area:
  - Add `useSafeAreaInsets()` and set `paddingBottom = theme.spacing[5] + insets.bottom` for the action bar.
- `NewClientScreen.tsx`: keep existing `contentContainerStyle={{ paddingBottom: theme.spacing[10] + insets.bottom }}`.
- Commit: `feat(safe-area): add explicit edges and bottom inset padding where needed`

Stop here (Gate C): After updating the first screen, share quick screenshots for notch/home areas; confirm to continue with remaining screens.

4) Bottom sheet safe-area handling
- File: `src/app/(tabs)/clients/new-client.tsx`
  - Use `useSafeAreaInsets()` and pass `bottomInset={insets.bottom}` to `<BottomSheet />`.
  - Only pass `topInset={insets.top}` if we observe status/handle overlap (skip initially to keep diffs minimal).
- The inner `NewClientScreen` already pads bottom via insets; do not add duplicate padding.
- Commit: `feat(safe-area): apply bottomInset to bottom sheet and preserve scroll padding`

Stop here (Gate D): Confirm visual behavior of the sheet on iOS/Android; approve adding `topInset` if needed.

5) Cleanup and verify
- Ensure zero imports of `SafeAreaView` from `react-native` remain (grep check).
- Manual QA on iOS and Android (gesture and 3‑button nav):
  - No content under status/notch.
  - Bottom buttons and FABs fully tappable above home/nav areas.
  - Bottom sheet actions not clipped.
- Commit: `chore(safe-area): cleanup remaining imports and verify cross-platform visuals`

Stop here (Gate E): Approve final PR prep and summary.

### File-by-file edits (concise)

- `src/ui/screens/ClientsScreen/ClientsScreen.tsx`
  - Swap import to safe-area-context.
  - Root: `<SafeAreaView style={styles.container} edges={['top','bottom']}>`.
  - Already uses `useSafeAreaInsets()` for FAB positioning; retain.

- `src/ui/screens/NewClientScreen/NewClientScreen.tsx`
  - Swap import to safe-area-context.
  - Root: `<SafeAreaView style={styles.container} edges={['top','bottom']}>`.
  - Keep `BottomSheetScrollView` bottom padding with `insets.bottom`.

- `src/ui/screens/EditClientScreen/EditClientScreen.tsx`
  - Swap import to safe-area-context.
  - Root: `<SafeAreaView style={styles.container} edges={['top','bottom']}>`.
  - Add `useSafeAreaInsets()` and update action bar `paddingBottom = theme.spacing[5] + insets.bottom`.

- `src/ui/screens/ClientInfoScreen/ClientInfoScreen.tsx`
  - Swap import to safe-area-context.
  - Root: `<SafeAreaView style={styles.container} edges={['top','bottom']}>`.

- `src/app/(tabs)/clients/new-client.tsx`
  - Add `useSafeAreaInsets()`; pass `<BottomSheet bottomInset={insets.bottom} ... />`.
  - Do not add duplicate padding inside `BottomSheetView`.

### Verification checklist

- RN `SafeAreaView` no longer imported anywhere.
- Tabs/pages render without notch/status overlap.
- Action bars/FABs sit above home indicator and Android nav.
- Bottom sheet content remains fully tappable; no clipping.

### Deliverables

- 3–5 small commits per plan above.
- Short PR summary:
  - Where `edges` and `insets` applied (screens, bottom sheet).
  - Any places where insets replaced hardcoded spacers (EditClient action bar).

### Notes

- Limit code comments to spots where `useSafeAreaInsets()` is used to compute dynamic padding.
- Avoid adding extra providers or changing component hierarchy.

### To-dos

- [ ] Confirm provider/dependency; no code changes; prepare baseline commit
- [ ] Swap RN SafeAreaView imports to safe-area-context in 4 screens
- [ ] Add edges on SafeAreaView; add insets.bottom padding for action bar(s)
- [ ] Pass bottomInset on @gorhom/bottom-sheet new-client route
- [ ] Remove leftover RN imports and verify on iOS/Android



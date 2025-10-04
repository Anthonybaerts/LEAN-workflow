React Native DateTimePicker (Context notes)

- Library: `@react-native-community/datetimepicker` (React Native DateTimePicker)
- 24h mode: `is24Hour` works on Android/Windows. On iOS, set `locale` and use system settings; we prefer `display="spinner"` + `locale="nl-NL"` for consistent look.
- Rounding: No built-in minute step on Android; implement rounding in controller after selection. On iOS, `minuteInterval` works when `display="spinner"`.
- Imperative API (Android): Use `DateTimePickerAndroid.open({ mode: 'time', value, is24Hour: true, onChange })`.
- Component API (iOS): Render `<DateTimePicker mode="time" value={date} display="spinner" minuteInterval={15} locale="nl-NL" onChange={...} />`.
- onChange: Inspect `event.type === 'set'` vs `dismissed`. Selected time provided as `Date`.
- Expo managed: No native rebuild needed; install package and use. Optional Android styling via plugin in `app.config`.

Policy used in app (P2b): When user changes start time, we round to 15 minutes and keep duration stable by shifting end time by the existing duration, clamped within the same day.



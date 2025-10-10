import React from 'react';
import { NewTaskScreen } from '@/ui/screens';
import { useLocalSearchParams, useRouter, useNavigation, useFocusEffect } from 'expo-router';
import dayjs from 'dayjs';
import 'dayjs/locale/nl';
import { Platform, Alert, ToastAndroid } from 'react-native';
import DateTimePicker, { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useZodForm } from '@/services/forms/useZodForm';
import { taskSchema } from '@/services/validation/taskSchema';
import { workTypeToVariant, resolveVariant } from '@/ui/theme/taskColors';
import { ClientsScreen } from '@/ui/screens';
import { tasksRepository } from '@/services/tasksRepository';
import { clientsRepository } from '@/services/clientsRepository';
import { theme } from '@/ui/tokens';
import { useAppDispatch, useAppSelector } from '@/state/store';
import { clientsLoading, clientsLoaded, clientsError } from '@/state/slices/clientsSlice';

function capitalize(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatDurationLabel(start: dayjs.Dayjs, end: dayjs.Dayjs): string {
  const minutes = Math.max(0, end.diff(start, 'minute'));
  const hoursPart = Math.floor(minutes / 60);
  const minutesPart = minutes % 60;
  if (hoursPart > 0 && minutesPart > 0) return `Duur: ${hoursPart} uur ${minutesPart} min`;
  if (hoursPart > 0) return `Duur: ${hoursPart} uur`;
  return `Duur: ${minutesPart} min`;
}

export default function NewTaskRoute() {
  const dispatch = useAppDispatch();
  const uid = useAppSelector((s) => s.auth.uid);
  const clientsItems = useAppSelector((s) => s.clients.items);
  const clientsStatus = useAppSelector((s) => s.clients.status);
  const router = useRouter();
  const navigation = useNavigation();
  const params = useLocalSearchParams<{ date?: string; startAt?: string }>();

  // Initialize state from params with sensible defaults
  const initialDateStr =
    typeof params.date === 'string' && params.date ? params.date : dayjs().format('YYYY-MM-DD');
  const initialStartStr =
    typeof params.startAt === 'string' && params.startAt ? params.startAt : '08:00';

  const [dateStr] = React.useState<string>(initialDateStr);
  const [startTime, setStartTime] = React.useState<string>(initialStartStr);

  // Compute default end time = min(start + 60m, 23:59) with same-day clamp
  const computeDefaultEnd = React.useCallback(
    (dateISO: string, startHHmm: string) => {
      const start = dayjs(`${dateISO}T${startHHmm}:00`);
      const endOfDay = dayjs(dateISO).hour(23).minute(59).second(0);
      const proposedEnd = start.add(60, 'minute');
      const end = proposedEnd.isAfter(endOfDay) ? endOfDay : proposedEnd;
      return end.format('HH:mm');
    },
    []
  );

  const [endTime, setEndTime] = React.useState<string>(computeDefaultEnd(initialDateStr, initialStartStr));

  // Derive duration label from current start/end
  const duration = React.useMemo(() => {
    const start = dayjs(`${dateStr}T${startTime}:00`);
    const end = dayjs(`${dateStr}T${endTime}:00`);
    return formatDurationLabel(start, end);
  }, [dateStr, startTime, endTime]);

  const selectedDateLabel = React.useMemo(
    () => capitalize(dayjs(dateStr).locale('nl').format('dddd, D MMMM')),
    [dateStr]
  );

  // Rounding helper to nearest 15 minutes
  const roundToStep = React.useCallback((date: dayjs.Dayjs, stepMinutes = 15) => {
    const minutes = date.minute();
    const rounded = Math.round(minutes / stepMinutes) * stepMinutes;
    return date.minute(rounded).second(0);
  }, []);

  const clampSameDay = React.useCallback((candidate: dayjs.Dayjs) => {
    const startOfDay = dayjs(dateStr).hour(0).minute(0).second(0);
    const endOfDay = dayjs(dateStr).hour(23).minute(59).second(0);
    if (candidate.isBefore(startOfDay)) return startOfDay;
    if (candidate.isAfter(endOfDay)) return endOfDay;
    return candidate;
  }, [dateStr]);

  const showBriefMessage = React.useCallback((message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert(message);
    }
  }, []);

  // Policy: keep duration stable when changing start time
  const handleStartTimePicked = React.useCallback((picked: Date | undefined) => {
    if (!picked) return;
    const currentStart = dayjs(`${dateStr}T${startTime}:00`);
    const currentEnd = dayjs(`${dateStr}T${endTime}:00`);
    const durationMinutes = Math.max(0, currentEnd.diff(currentStart, 'minute'));

    const pickedRounded = roundToStep(dayjs(picked));
    const pickedClamped = clampSameDay(pickedRounded);

    const newStartStr = pickedClamped.format('HH:mm');
    const desiredEnd = pickedClamped.add(durationMinutes, 'minute');
    const endOfDay = dayjs(dateStr).hour(23).minute(59).second(0);
    const newEnd = clampSameDay(desiredEnd);
    if (desiredEnd.isAfter(endOfDay)) {
      showBriefMessage('Eindtijd is aangepast naar 23:59');
    }
    const newEndStr = newEnd.format('HH:mm');
    setStartTime(newStartStr);
    setEndTime(newEndStr);
  }, [clampSameDay, endTime, roundToStep, startTime, dateStr, showBriefMessage]);

  const onStartTimePress = React.useCallback(() => {
    const base = dayjs(`${dateStr}T${startTime}:00`).toDate();
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        mode: 'time',
        value: base,
        is24Hour: true,
        onChange: (event: DateTimePickerEvent, date?: Date) => {
          if (event.type === 'set') {
            handleStartTimePicked(date);
          }
        },
      });
    } else {
      // iOS: show inline picker via a temporary stateful inline component approach
      // For P2b scope, we use the component inline render controlled by a boolean
      setShowStartPicker(true);
    }
  }, [dateStr, startTime, handleStartTimePicked]);

  const [showStartPicker, setShowStartPicker] = React.useState(false);
  const onStartPickerChange = React.useCallback((event: DateTimePickerEvent, date?: Date) => {
    if (event.type === 'set') {
      handleStartTimePicked(date);
    }
    setShowStartPicker(false);
  }, [handleStartTimePicked]);

  // P2c: End time picker — clamp to same day and >= start time
  const handleEndTimePicked = React.useCallback((picked: Date | undefined) => {
    if (!picked) return;
    const pickedRounded = roundToStep(dayjs(picked));
    const pickedClamped = clampSameDay(pickedRounded);
    const currentStart = dayjs(`${dateStr}T${startTime}:00`);
    const endOfDay = dayjs(dateStr).hour(23).minute(59).second(0);
    if (pickedClamped.isAfter(endOfDay)) {
      showBriefMessage('Eindtijd is aangepast naar 23:59');
    }
    if (pickedClamped.isBefore(currentStart)) {
      showBriefMessage('Eindtijd kan niet vóór starttijd zijn');
    }
    const final = pickedClamped.isBefore(currentStart) ? currentStart : pickedClamped;
    setEndTime(final.format('HH:mm'));
  }, [clampSameDay, roundToStep, dateStr, startTime, showBriefMessage]);

  const onEndTimePress = React.useCallback(() => {
    const base = dayjs(`${dateStr}T${endTime}:00`).toDate();
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        mode: 'time',
        value: base,
        is24Hour: true,
        onChange: (event: DateTimePickerEvent, date?: Date) => {
          if (event.type === 'set') {
            handleEndTimePicked(date);
          }
        },
      });
    } else {
      setShowEndPicker(true);
    }
  }, [dateStr, endTime, handleEndTimePicked]);

  const [showEndPicker, setShowEndPicker] = React.useState(false);
  const onEndPickerChange = React.useCallback((event: DateTimePickerEvent, date?: Date) => {
    if (event.type === 'set') {
      handleEndTimePicked(date);
    }
    setShowEndPicker(false);
  }, [handleEndTimePicked]);

  // Hide tab bar while on this screen; restore on blur
  useFocusEffect(
    React.useCallback(() => {
      const parent = navigation.getParent?.();
      parent?.setOptions({ tabBarStyle: { display: 'none' } });
      return () => {
        parent?.setOptions({
          tabBarStyle: {
            backgroundColor: theme.colors.gray[900],
            borderTopColor: theme.colors.gray[700],
          },
        });
      };
    }, [navigation])
  );

  // P2e: Validation and Save disabled state
  const form = useZodForm(taskSchema, { defaultValues: {
    clientId: '',
    date: dateStr,
    startAt: startTime,
    endAt: endTime,
    type: 'blue',
    description: '',
  }});

  // Keep form values in sync as times change
  React.useEffect(() => {
    form.setValue('date', dateStr, { shouldValidate: true, shouldDirty: true });
  }, [dateStr]);
  React.useEffect(() => {
    form.setValue('startAt', startTime, { shouldValidate: true, shouldDirty: true });
  }, [startTime]);
  React.useEffect(() => {
    form.setValue('endAt', endTime, { shouldValidate: true, shouldDirty: true });
  }, [endTime]);

  const saveDisabled = !form.isValid;

  // Description binding
  const [description, setDescription] = React.useState('');
  const onDescriptionChange = React.useCallback((text: string) => {
    setDescription(text);
    form.setValue('description', text, { shouldValidate: true, shouldDirty: true });
  }, [form]);

  // Work type mapping (domain → shared color variant)
  type WorkType = 'maintenance' | 'project' | 'client_visit' | 'free_task';
  const [selectedWorkType, setSelectedWorkType] = React.useState<WorkType>('maintenance');
  const onWorkTypeSelect = React.useCallback((wt: WorkType) => {
    setSelectedWorkType(wt);
    form.setValue('type', workTypeToVariant[wt], { shouldValidate: true, shouldDirty: true });
  }, [form]);
  // Initialize type
  React.useEffect(() => {
    form.setValue('type', workTypeToVariant[selectedWorkType], { shouldValidate: true });
  }, []);

  // Inline clients: observe list (Redux) and debounce local filter
  const [clientQuery, setClientQuery] = React.useState('');
  const [clientLabel, setClientLabel] = React.useState('');
  React.useEffect(() => {
    if (!uid) return;
    let unsub: undefined | (() => void);
    dispatch(clientsLoading());
    try {
      unsub = clientsRepository.observeListByOwnerId(uid, (list) => {
        const sanitized = list.map((c) => ({
          ...c,
          createdAt: (c as any).createdAt && typeof (c as any).createdAt.toDate === 'function'
            ? (c as any).createdAt.toDate().toISOString()
            : (c as any).createdAt,
          updatedAt: (c as any).updatedAt && typeof (c as any).updatedAt.toDate === 'function'
            ? (c as any).updatedAt.toDate().toISOString()
            : (c as any).updatedAt,
        }));
        dispatch(clientsLoaded(sanitized as any));
      });
    } catch (e: any) {
      dispatch(clientsError(e?.message ?? 'Failed to subscribe clients'));
    }
    return () => {
      try { unsub && unsub(); } catch {}
    };
  }, [uid, dispatch]);
  const [debouncedQuery, setDebouncedQuery] = React.useState('');
  React.useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(clientQuery.trim().toLowerCase()), 250);
    return () => clearTimeout(id);
  }, [clientQuery]);
  const filteredClients = React.useMemo(() => {
    if (debouncedQuery.length === 0) return clientsItems;
    return clientsItems.filter((c: { name: string; email?: string; phone?: string; addressLine?: string; city?: string }) =>
      [c.name, c.email, c.phone, c.addressLine, c.city]
        .filter((v): v is string => Boolean(v))
        .some((v) => v.toLowerCase().includes(debouncedQuery))
    );
  }, [clientsItems, debouncedQuery]);
  const inlineClients = React.useMemo(
    () => filteredClients.map((c: any) => ({ id: c.id as string, label: c.name as string, subtitle: (c.city || c.email || c.phone) as string | undefined })),
    [filteredClients]
  );
  const handleClientSelected = React.useCallback((clientId: string, label: string) => {
    form.setValue('clientId', clientId, { shouldValidate: true, shouldDirty: true });
    setClientLabel(label);
    // Clear query so the field shows the selected label and results collapse
    setClientQuery('');
  }, [form]);

  // P3b: Save flow + error handling
  const [isSaving, setIsSaving] = React.useState(false);
  const showError = React.useCallback((msg: string) => {
    if (Platform.OS === 'android') ToastAndroid.show(msg, ToastAndroid.SHORT);
    else Alert.alert(msg);
  }, []);
  const onSave = React.useMemo(() => form.handleSubmit(
    async (values) => {
      if (isSaving) return;
      try {
        setIsSaving(true);
        await tasksRepository.create({
          clientId: values.clientId,
          date: values.date,
          startAt: values.startAt,
          endAt: values.endAt,
          type: resolveVariant(values.type),
          description: values.description || undefined,
        });
        router.back();
      } catch (_err) {
        showError('Opslaan mislukt. Controleer je verbinding en probeer opnieuw.');
        setIsSaving(false);
      }
    },
    () => {
      showError('Formulier onvolledig of ongeldig. Vul verplichte velden in.');
    }
  ), [form, isSaving, router, showError]);

  return (
    <>
      <NewTaskScreen
        selectedDate={selectedDateLabel}
        startTime={startTime}
        endTime={endTime}
        duration={duration}
        startActive={showStartPicker}
        endActive={showEndPicker}
        onStartTimePress={onStartTimePress}
        onEndTimePress={onEndTimePress}
        selectedWorkType={selectedWorkType}
        onWorkTypeSelect={onWorkTypeSelect as any}
        clientQuery={clientQuery}
        clientDisplay={clientQuery.length > 0 ? clientQuery : clientLabel}
        onClientFocus={undefined as any}
        onClientChange={(q: string) => {
          setClientQuery(q);
          // If the user starts typing, clear previous selection
          setClientLabel('');
          form.setValue('clientId', '', { shouldDirty: true, shouldValidate: true });
        }}
        inlineClients={inlineClients}
        onInlineClientPress={(id, label) => handleClientSelected(id, label)}
        onInlineAddClient={() => router.push('/(tabs)/clients/new-client')}
        isClientsLoading={clientsStatus === 'loading'}
        description={description}
        onDescriptionChange={onDescriptionChange}
        saveDisabled={saveDisabled || isSaving}
        onSave={onSave}
        onBack={() => router.back()}
        onCancel={() => router.back()}
      />
      {Platform.OS === 'ios' && showStartPicker && (
        <DateTimePicker
          mode="time"
          value={dayjs(`${dateStr}T${startTime}:00`).toDate()}
          display="spinner"
          minuteInterval={15}
          locale="nl-NL"
          onChange={onStartPickerChange}
        />
      )}
      {Platform.OS === 'ios' && showEndPicker && (
        <DateTimePicker
          mode="time"
          value={dayjs(`${dateStr}T${endTime}:00`).toDate()}
          display="spinner"
          minuteInterval={15}
          locale="nl-NL"
          onChange={onEndPickerChange}
        />
      )}
      {/* Inline clients list is rendered inside NewTaskScreen via clientQuery/clientLabel props */}
    </>
  );
}



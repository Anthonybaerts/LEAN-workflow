// @ts-nocheck
/**
 * NewTaskScreen Component
 * @description New task creation screen with time selection, client selection, work type, and description
 * @example
 * ```tsx
 * import { NewTaskScreen } from '@ui/screens';
 * <NewTaskScreen />
 * ```
 */

import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, Platform, ScrollView } from 'react-native';
import {
  Header,
  HourSelector,
  InfoCard,
  Input,
  TabSelection,
  Button,
} from '../../components';
import { ArrowLeft, User, Close, Pencil } from '../../icons';
import { theme } from '../../tokens';

type WorkType = 'maintenance' | 'project' | 'client_visit' | 'free_task';

type Props = {
  selectedDate?: string;
  startTime?: string;
  endTime?: string;
  duration?: string;
  startActive?: boolean;
  endActive?: boolean;
  selectedWorkType?: WorkType;
  clientQuery?: string;
  clientDisplay?: string;
  description?: string;
  onBack?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
  onStartTimePress?: () => void;
  onEndTimePress?: () => void;
  onWorkTypeSelect?: (type: WorkType) => void;
  onClientChange?: (query: string) => void;
  onClientFocus?: () => void;
  onDescriptionChange?: (description: string) => void;
  saveDisabled?: boolean;
  // Inline clients props
  inlineClients?: { id: string; label: string; subtitle?: string }[];
  onInlineClientPress?: (clientId: string, label: string) => void;
  onInlineAddClient?: () => void;
  isClientsLoading?: boolean;
};

export function NewTaskScreen({
  selectedDate = 'Donderdag, 2 November 2023',
  startTime = '08:00',
  endTime = '09:00|',
  duration = 'Duur: 1 uur',
  startActive = false,
  endActive = false,
  selectedWorkType = 'maintenance',
  clientQuery = '',
  clientDisplay = '',
  description = '',
  onBack,
  onSave,
  onCancel,
  onStartTimePress,
  onEndTimePress,
  onWorkTypeSelect,
  onClientChange,
  onClientFocus,
  onDescriptionChange,
  saveDisabled = false,
  inlineClients,
  onInlineClientPress,
  onInlineAddClient,
  isClientsLoading = false,
}: Props) {
  
  const workTypes = [
    { id: 'maintenance', label: 'Onderhoud', color: 'blue' as const },
    { id: 'project', label: 'Project', color: 'yellow' as const },
    { id: 'client_visit', label: 'Klantenbezoek', color: 'green' as const },
    { id: 'free_task', label: 'Vrije Taak', color: 'gray' as const },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <View style={styles.content}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Header
              title="Nieuwe Taak"
              leftIcon={<ArrowLeft width={28} height={28} color="white" />}
              rightText="Opslaan"
              rightTextColor={theme.colors.primary.main}
              onLeftPress={onBack}
              onRightPress={onSave}
            />

            {/* Date Header */}
            <View style={styles.dateHeader}>
              <Text style={styles.dateText}>{selectedDate}</Text>
            </View>
          </View>

          {/* Time Selection Section */}
          <View style={styles.timeSection}>
            <View style={styles.timeSelectorContainer}>
              <View style={styles.timeSelectors}>
                <HourSelector
                  label="Starttijd"
                  time={startTime}
                selected={startActive}
                  onPress={onStartTimePress}
                />

                <View style={styles.timeDivider} />

                <HourSelector
                  label="Eindtijd"
                  time={endTime}
                selected={endActive}
                  onPress={onEndTimePress}
                />
              </View>

              <InfoCard text={duration} />
            </View>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            {/* Client Selection */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Klant</Text>
              <Input
                placeholder="Zoek of selecteer een klant"
                leftIcon={<User width={16} height={16} color="#2774F1" />}
                rightIcon={
                  <Close
                    width={20}
                    height={20}
                    color={theme.colors.gray[500]}
                  />
                }
                iconStyle="bordered"
                showRightIcon={clientQuery.length > 0}
                value={clientDisplay || clientQuery}
                onChangeText={onClientChange}
                onFocus={onClientFocus}
              />
            {!!inlineClients && ((clientQuery?.length ?? 0) >= 2) && (
              <View style={styles.inlineListWrapper}>
                {isClientsLoading ? (
                  <Text style={styles.inlineEmpty}>Laden...</Text>
                ) : inlineClients.length === 0 ? (
                  <Text style={styles.inlineEmpty}>Geen klanten gevonden</Text>
                ) : (
                  <View>
                    {(inlineClients.slice(0, 5)).map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        activeOpacity={0.8}
                        style={styles.inlineRow}
                        onPress={() => { onInlineClientPress?.(item.id, item.label); Keyboard.dismiss(); }}
                      >
                        <Text style={styles.inlineLabel} numberOfLines={1}>{item.label}</Text>
                        {item.subtitle ? <Text style={styles.inlineSub} numberOfLines={1}>{item.subtitle}</Text> : null}
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
                {/* CTA when no match */}
                {!isClientsLoading && inlineClients.length === 0 ? (
                  <TouchableOpacity activeOpacity={0.8} style={styles.inlineCta} onPress={onInlineAddClient}>
                    <Text style={styles.inlineCtaText}>Nieuwe klant toevoegen</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            )}
            </View>

            {/* Work Type Selection */}
            <View style={styles.fieldGroup}>
              <View style={styles.workTypeHeader}>
                <Text style={styles.fieldLabel}>Type Werk</Text>
                <Pencil
                  width={20}
                  height={20}
                  color={theme.colors.primary.main}
                />
              </View>

              <View style={styles.workTypeGrid}>
                <View style={styles.workTypeRow}>
                  <TabSelection
                    label={workTypes[0].label}
                    color={workTypes[0].color}
                    active={selectedWorkType === workTypes[0].id}
                    onPress={() =>
                      onWorkTypeSelect?.(workTypes[0].id as WorkType)
                    }
                  />
                  <TabSelection
                    label={workTypes[1].label}
                    color={workTypes[1].color}
                    active={selectedWorkType === workTypes[1].id}
                    onPress={() =>
                      onWorkTypeSelect?.(workTypes[1].id as WorkType)
                    }
                  />
                </View>
                <View style={styles.workTypeRow}>
                  <TabSelection
                    label={workTypes[2].label}
                    color={workTypes[2].color}
                    active={selectedWorkType === workTypes[2].id}
                    onPress={() =>
                      onWorkTypeSelect?.(workTypes[2].id as WorkType)
                    }
                  />
                  <TabSelection
                    label={workTypes[3].label}
                    color={workTypes[3].color}
                    active={selectedWorkType === workTypes[3].id}
                    onPress={() =>
                      onWorkTypeSelect?.(workTypes[3].id as WorkType)
                    }
                  />
                </View>
              </View>
            </View>

            {/* Description */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Beschrijving</Text>
              <Input
                placeholder="Korte beschrijving van de taak..."
                rightIcon={
                  <View style={{ width: 20, height: 20, alignItems: 'center', justifyContent: 'center' }}>
                    {description.length > 0 ? (
                      <Close width={20} height={20} color={theme.colors.gray[500]} />
                    ) : (
                      <View style={{ width: 20, height: 20, opacity: 0 }} />
                    )}
                  </View>
                }
                showLeftIcon={false}
                showRightIcon
                multiline
                numberOfLines={4}
                style={{ height: 112 }}
                value={description}
                onChangeText={onDescriptionChange}
                scrollEnabled={Platform.OS === 'android' ? true : false}
                disableFullscreenUI={Platform.OS === 'android'}
              />
            </View>
            
          </View>
          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <Button
              variant="primary"
              size="large"
              showIcon={false}
              disabled={saveDisabled}
              onPress={onSave}
            >
              Taak Opslaan
            </Button>
            <Button
              variant="outline"
              size="large"
              showIcon={false}
              onPress={onCancel}
            >
              Annuleren
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[900],
  },
  scrollContent: {
    paddingBottom: theme.spacing[8],
  },
  content: {
    gap: theme.spacing[10], // 40px gap between main sections
  },
  headerSection: {
    gap: theme.spacing[4],
    paddingHorizontal: theme.spacing[5],
  },
  dateHeader: {
    paddingVertical: theme.spacing[6],
  },
  dateText: {
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  timeSection: {
    paddingHorizontal: theme.spacing[5],
  },
  timeSelectorContainer: {
    gap: theme.spacing[4],
    padding: theme.spacing[4],
    borderRadius: 12, // radius-xl
    borderWidth: 1,
    borderColor: theme.colors.gray[700],
    backgroundColor: theme.colors.gray[800],
  },
  timeSelectors: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
  },
  timeDivider: {
    width: 24,
    height: 2,
    borderRadius: 9999,
    backgroundColor: '#2774F1', // Dark-Blue from design
  },
  formSection: {
    gap: theme.spacing[5],
    paddingHorizontal: theme.spacing[5],
  },
  fieldGroup: {
    gap: theme.spacing[1], // 2px gap as in design
  },
  inlineListWrapper: {
    marginTop: theme.spacing[2],
    borderWidth: 1,
    borderColor: theme.colors.gray[700],
    borderRadius: 12,
    backgroundColor: theme.colors.gray[800],
    overflow: 'hidden',
  },
  inlineRow: {
    paddingHorizontal: theme.spacing[3],
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[700],
  },
  inlineLabel: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  inlineSub: {
    color: theme.colors.gray[400],
    fontSize: 12,
    marginTop: 2,
  },
  inlineCta: {
    paddingHorizontal: theme.spacing[3],
    paddingVertical: 12,
  },
  inlineCtaText: {
    color: theme.colors.primary.main,
    fontSize: 14,
    fontWeight: '600',
  },
  inlineEmpty: {
    color: theme.colors.gray[400],
    fontSize: 14,
    paddingHorizontal: theme.spacing[3],
    paddingVertical: 12,
  },
  fieldLabel: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 28,
  },
  workTypeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workTypeGrid: {
    gap: theme.spacing[3], // 12px gap between rows
    marginTop: theme.spacing[2],
  },
  workTypeRow: {
    flexDirection: 'row',
    gap: theme.spacing[3], // 12px gap between items
  },
  actionButtons: {
    gap: theme.spacing[3],
    paddingHorizontal: theme.spacing[5],
    paddingBottom: theme.spacing[5],
    paddingTop: theme.spacing[3],
  },
});

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
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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
  selectedWorkType?: WorkType;
  clientQuery?: string;
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
};

export function NewTaskScreen({
  selectedDate = 'Donderdag, 2 November 2023',
  startTime = '08:00',
  endTime = '09:00|',
  duration = 'Duur: 1 uur',
  selectedWorkType = 'maintenance',
  clientQuery = '',
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
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
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
                  onPress={onStartTimePress}
                />

                <View style={styles.timeDivider} />

                <HourSelector
                  label="Eindtijd"
                  time={endTime}
                  selected
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
                value={clientQuery}
                onChangeText={onClientChange}
                onFocus={onClientFocus}
              />
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
                  <Close
                    width={20}
                    height={20}
                    color={theme.colors.gray[500]}
                  />
                }
                showLeftIcon={false}
                showRightIcon={description.length > 0}
                multiline
                numberOfLines={4}
                value={description}
                onChangeText={onDescriptionChange}
              />
            </View>
          </View>
        </View>
      </ScrollView>

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[900],
  },
  scrollView: {
    flex: 1,
  },
  content: {
    gap: theme.spacing[10], // 40px gap between main sections
  },
  headerSection: {
    gap: theme.spacing[4],
    paddingHorizontal: theme.spacing[5],
  },
  dateHeader: {
    paddingVertical: theme.spacing[8],
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

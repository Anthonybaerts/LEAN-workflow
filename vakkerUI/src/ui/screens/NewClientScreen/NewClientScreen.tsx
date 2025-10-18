import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Controller } from 'react-hook-form';
import { Input, Button, useToast } from '../../components';
import {
  ArrowLeft,
  Briefcase,
  User,
  Email,
  Call,
  Location,
  Close,
} from '../../icons';
import { theme } from '../../tokens';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { useZodForm } from '../../../services/forms/useZodForm';
import { clientSchema } from '../../../services/validation/clientSchema';
import { getErrorMessage } from '../../../services/forms/getErrorMessage';
import { clientsRepository } from '../../../services/clientsRepository';
import { useRouter } from 'expo-router';
import { useAppDispatch } from '@/state/store';
import { selectClient as selectClientAction } from '@/state/slices/taskFormSlice';

// Context: Form screen for adding a new client with type selection and contact details
export function NewClientScreen({ from, hideBackArrow }: { from?: string; hideBackArrow?: boolean }) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { success: toastSuccess, error: toastError } = useToast();
  const form = useZodForm(clientSchema, {
    defaultValues: {
      type: 'Particulier',
      name: '',
      email: '',
      phone: '',
      addressLine: '',
      postalCode: '',
      city: '',
      notes: '',
    },
    mode: 'onChange',
  });

  const selectedType = form.watch('type');

  const handleBack = () => {
    router.back();
  };

  const handleSave = form.handleSubmit(async (values) => {
    try {
      const payload = {
        type: values.type,
        name: values.name,
        email: values.email || undefined,
        phone: values.phone || undefined,
        addressLine: values.addressLine,
        postalCode: values.postalCode || undefined,
        city: values.city || undefined,
        notes: values.notes || undefined,
      } as const;
      const created = await clientsRepository.create(payload as any);
      const id = (created as any).id as string | undefined;
      if (id) {
        toastSuccess('Klant aangemaakt.');
        // If opened from NewTask, navigate back to it with selectClientId to auto-select
        if (from === 'new-task') {
          // Dispatch transient selection and dismiss modal
          dispatch(selectClientAction(id));
          router.back();
        } else {
          router.back();
        }
      }
    } catch (err) {
      console.log('Create client failed', err);
      toastError('Klant opslaan mislukt. Probeer opnieuw.');
    }
  });

  const handleCancel = () => {
    router.back();
  };

  const setTypeBusiness = () => form.setValue('type', 'Zakelijk', { shouldValidate: true, shouldDirty: true });
  const setTypePersonal = () => form.setValue('type', 'Particulier', { shouldValidate: true, shouldDirty: true });

  return (
    <SafeAreaView style={styles.container} edges={['top','bottom']}>
      {/* Context: Header (no top-right save) */}
      {!hideBackArrow ? (
        <View style={styles.header}>
          <View style={styles.leftSection}>
            <TouchableOpacity onPress={handleBack} style={styles.iconButton}>
              <ArrowLeft width={28} height={28} />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Nieuwe Klant</Text>
          <View style={styles.rightSection} />
        </View>
      ) : (
        <View style={styles.headerNoBack}>
          <Text style={styles.title}>Nieuwe Klant</Text>
        </View>
      )}

      <ScrollView
        style={{ flex: 1, backgroundColor: theme.colors.gray[900] }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: theme.spacing[10] + theme.spacing[4] + insets.bottom }}
      >
        <View style={styles.formContainer}>
          {/* Context: Client type selection tabs */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Type Klant</Text>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  selectedType === 'Zakelijk' && styles.activeTab,
                ]}
                onPress={setTypeBusiness}
              >
                <Briefcase
                  width={24}
                  height={24}
                  color={
                    selectedType === 'Zakelijk'
                      ? theme.colors.primary.main
                      : theme.colors.gray[500]
                  }
                />
                <Text
                  style={[
                    styles.tabText,
                    selectedType === 'Zakelijk' && styles.activeTabText,
                  ]}
                >
                  Zakelijk
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.tabButton,
                  selectedType === 'Particulier' && styles.activeTab,
                ]}
                onPress={setTypePersonal}
              >
                <User
                  width={24}
                  height={24}
                  color={
                    selectedType === 'Particulier'
                      ? theme.colors.primary.main
                      : theme.colors.gray[500]
                  }
                />
                <Text
                  style={[
                    styles.tabText,
                    selectedType === 'Particulier' && styles.activeTabText,
                  ]}
                >
                  Particulier
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Context: Form fields for client information */}
          <View style={styles.fieldsContainer}>
            {/* Context: Client name input */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Naam</Text>
              <Controller
                control={form.control}
                name="name"
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input
                    placeholder="Voer naam in"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    leftIcon={<User width={16} height={16} />}
                    showRightIcon={Boolean(value)}
                    rightIcon={Boolean(value) ? <Close width={20} height={20} /> : undefined}
                    iconStyle="bordered"
                    state={value ? 'filled' : undefined}
                  />
                )}
              />
              {getErrorMessage(form.formState.errors, 'name') && (
                <Text style={styles.errorText}>{getErrorMessage(form.formState.errors, 'name')}</Text>
              )}
            </View>

            {/* Context: Email address input */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>E-mailadres</Text>
              <Controller
                control={form.control}
                name="email"
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input
                    placeholder="voorbeeld@email.com"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    leftIcon={<Email width={16} height={16} />}
                    showRightIcon={Boolean(value)}
                    rightIcon={Boolean(value) ? <Close width={20} height={20} /> : undefined}
                    iconStyle="bordered"
                    state={value ? 'filled' : undefined}
                    keyboardType="email-address"
                  />
                )}
              />
              {getErrorMessage(form.formState.errors, 'email') && (
                <Text style={styles.errorText}>{getErrorMessage(form.formState.errors, 'email')}</Text>
              )}
            </View>

            {/* Context: Phone number input */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Telefoonnummer</Text>
              <Controller
                control={form.control}
                name="phone"
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input
                    placeholder="+31 6 12345678"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    leftIcon={<Call width={16} height={16} />}
                    showRightIcon={Boolean(value)}
                    rightIcon={Boolean(value) ? <Close width={20} height={20} /> : undefined}
                    iconStyle="bordered"
                    state={value ? 'filled' : undefined}
                    keyboardType="phone-pad"
                  />
                )}
              />
              {getErrorMessage(form.formState.errors, 'phone') && (
                <Text style={styles.errorText}>{getErrorMessage(form.formState.errors, 'phone')}</Text>
              )}
            </View>

            {/* Context: Street address input */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Adres</Text>
              <Controller
                control={form.control}
                name="addressLine"
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input
                    placeholder="Straatnaam en huisnummer"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    leftIcon={<Location width={16} height={16} />}
                    showRightIcon={Boolean(value)}
                    rightIcon={Boolean(value) ? <Close width={20} height={20} /> : undefined}
                    iconStyle="bordered"
                    state={value ? 'filled' : undefined}
                  />
                )}
              />
              {getErrorMessage(form.formState.errors, 'addressLine') && (
                <Text style={styles.errorText}>{getErrorMessage(form.formState.errors, 'addressLine')}</Text>
              )}
            </View>

            {/* Context: Postal code and city input */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Postcode en Plaats</Text>
              <Controller
                control={form.control}
                name="postalCode"
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input
                    placeholder="1234 AB Amsterdam"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    leftIcon={<Location width={16} height={16} />}
                    showRightIcon={Boolean(value)}
                    rightIcon={Boolean(value) ? <Close width={20} height={20} /> : undefined}
                    iconStyle="bordered"
                    state={value ? 'filled' : undefined}
                  />
                )}
              />
              {getErrorMessage(form.formState.errors, 'postalCode') && (
                <Text style={styles.errorText}>{getErrorMessage(form.formState.errors, 'postalCode')}</Text>
              )}
            </View>
          </View>
        </View>
        {/* Action buttons now scroll with content */}
        <View style={[styles.actionButtons, { marginTop: theme.spacing[6] }]}>
          <Button
            variant="primary"
            size="large"
            onPress={handleSave}
            disabled={!form.isValid}
            showIcon={false}
          >
            Opslaan
          </Button>
          <Button
            variant="outline"
            size="large"
            onPress={handleCancel}
            showIcon={false}
          >
            Annuleren
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[900],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.gray[900],
    paddingVertical: theme.spacing[8],
    paddingHorizontal: theme.spacing[5],
    height: 60,
  },
  headerNoBack: {
    backgroundColor: theme.colors.gray[900],
    paddingVertical: theme.spacing[8],
    paddingHorizontal: theme.spacing[5],
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightActionAbs: {
    position: 'absolute',
    right: theme.spacing[5],
    top: '50%',
    transform: [{ translateY: -10 }],
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.inter,
    fontWeight: theme.typography.fontWeight.semibold,
    textAlign: 'center',
  },
  iconButton: {
    padding: theme.spacing[1],
  },
  saveText: {
    color: theme.colors.primary.main,
    fontSize: 14,
    fontWeight: '500',
  },
  saveTextDisabled: {
    color: theme.colors.gray[600],
  },
  content: {},
  formContainer: {
    paddingHorizontal: theme.spacing[5],
    paddingTop: theme.spacing[4],
    gap: theme.spacing[10],
  },
  section: {
    gap: theme.spacing[2],
  },
  sectionTitle: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: theme.spacing[1],
  },
  tabContainer: {
    flexDirection: 'row',
    gap: theme.spacing[4],
  },
  tabButton: {
    flex: 1,
    height: 48,
    paddingHorizontal: theme.spacing[6],
    paddingVertical: theme.spacing[3],
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.gray[600],
    backgroundColor: theme.colors.gray[800],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing[2],
  },
  activeTab: {
    borderColor: theme.colors.primary.main,
    backgroundColor: theme.colors.primary['20'] || 'rgba(66, 133, 243, 0.1)',
  },
  tabText: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: theme.colors.white,
  },
  fieldsContainer: {
    gap: theme.spacing[5],
  },
  fieldGroup: {
    gap: theme.spacing[1],
  },
  fieldLabel: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: theme.spacing[1],
  },
  actionButtons: {
    paddingHorizontal: theme.spacing[5],
    paddingBottom: theme.spacing[5],
    gap: theme.spacing[3],
  },
  errorText: {
    color: theme.colors.warning.main,
    fontSize: 12,
    marginTop: 4,
  },
});

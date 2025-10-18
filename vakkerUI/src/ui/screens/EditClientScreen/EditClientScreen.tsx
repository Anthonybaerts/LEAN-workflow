import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Controller } from 'react-hook-form';
import { Input, Button, useToast, Header } from '../../components';
import { ArrowLeft, User, Email, Call, Location } from '../../icons';
import { theme } from '../../tokens';
import { useZodForm } from '../../../services/forms/useZodForm';
import { clientSchema } from '../../../services/validation/clientSchema';
import { clientsRepository, type ClientEntity } from '../../../services/clientsRepository';
import { getErrorMessage } from '../../../services/forms/getErrorMessage';
import { useLocalSearchParams, useRouter } from 'expo-router';

type LocalParams = { clientId?: string };

// Basic shell for editing a client's core fields.
// Prefill, validation, and save are added in later phases.
export function EditClientScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { clientId } = useLocalSearchParams<LocalParams>();
  const { success: toastSuccess, error: toastError } = useToast();

  const form = useZodForm(clientSchema, {
    // Prefill is implemented in P1; leave empty defaults for scaffold
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

  React.useEffect(() => {
    let isMounted = true;
    const load = async () => {
      const id = typeof clientId === 'string' ? clientId : Array.isArray(clientId) ? clientId[0] : undefined;
      if (!id) return;
      try {
        const existing = await clientsRepository.getById(id);
        if (!existing || !isMounted) return;
        const resolvedType: 'Zakelijk' | 'Particulier' =
          existing.type === 'Zakelijk' || existing.type === 'Particulier'
            ? existing.type
            : 'Particulier';
        form.reset({
          type: resolvedType,
          name: existing.name ?? '',
          email: existing.email ?? '',
          phone: existing.phone ?? '',
          addressLine: existing.addressLine ?? '',
          postalCode: existing.postalCode ?? '',
          city: existing.city ?? '',
          notes: existing.notes ?? '',
        }, { keepErrors: false, keepDirtyValues: false });
      } catch (e) {
        // best-effort: keep scaffold usable even if prefill fails
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [clientId]);

  const handleBack = () => {
    try {
      router.back();
    } catch {}
  };

  // Save/Cancel are wired in P1; here they are placeholders to satisfy scaffold
  const handleSave = form.handleSubmit(async (values) => {
    const id = typeof clientId === 'string' ? clientId : Array.isArray(clientId) ? clientId[0] : undefined;
    if (!id) return;
    try {
      await clientsRepository.update(id, {
        type: values.type,
        name: values.name,
        email: values.email || undefined,
        phone: values.phone || undefined,
        addressLine: values.addressLine || undefined,
        postalCode: values.postalCode || undefined,
        city: values.city || undefined,
        notes: values.notes || undefined,
      });
      toastSuccess('Klant bijgewerkt');
      router.replace({ pathname: '/(tabs)/clients/[clientId]', params: { clientId: id } } as any);
    } catch (e) {
      toastError('Bijwerken mislukt. Probeer opnieuw.');
    }
  });

  const handleCancel = () => {
    try {
      router.back();
    } catch {}
  };

  return (
    <SafeAreaView style={styles.container} edges={['top','bottom']}>
      <Header
        title="Klant bewerken"
        leftIcon={<ArrowLeft width={28} height={28} />}
        onLeftPress={handleBack}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
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
                  iconStyle="bordered"
                  state={value ? 'filled' : undefined}
                />
              )}
            />
            {getErrorMessage(form.formState.errors, 'name') && (
              <Text style={styles.errorText}>{getErrorMessage(form.formState.errors, 'name')}</Text>
            )}
          </View>

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
                  iconStyle="bordered"
                  keyboardType="email-address"
                  state={value ? 'filled' : undefined}
                />
              )}
            />
            {getErrorMessage(form.formState.errors, 'email') && (
              <Text style={styles.errorText}>{getErrorMessage(form.formState.errors, 'email')}</Text>
            )}
          </View>

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
                  iconStyle="bordered"
                  keyboardType="phone-pad"
                  state={value ? 'filled' : undefined}
                />
              )}
            />
            {getErrorMessage(form.formState.errors, 'phone') && (
              <Text style={styles.errorText}>{getErrorMessage(form.formState.errors, 'phone')}</Text>
            )}
          </View>

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
                  iconStyle="bordered"
                  state={value ? 'filled' : undefined}
                />
              )}
            />
            {getErrorMessage(form.formState.errors, 'addressLine') && (
              <Text style={styles.errorText}>{getErrorMessage(form.formState.errors, 'addressLine')}</Text>
            )}
          </View>

          <View style={styles.row}>
            <View style={[styles.fieldGroup, styles.flexItem]}>
              <Text style={styles.fieldLabel}>Postcode</Text>
              <Controller
                control={form.control}
                name="postalCode"
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input
                    placeholder="1234 AB"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    leftIcon={<Location width={16} height={16} />}
                    iconStyle="bordered"
                    state={value ? 'filled' : undefined}
                  />
                )}
              />
              {getErrorMessage(form.formState.errors, 'postalCode') && (
                <Text style={styles.errorText}>{getErrorMessage(form.formState.errors, 'postalCode')}</Text>
              )}
            </View>

            <View style={[styles.fieldGroup, styles.flexItem]}>
              <Text style={styles.fieldLabel}>Plaats</Text>
              <Controller
                control={form.control}
                name="city"
                render={({ field: { value, onChange, onBlur } }) => (
                  <Input
                    placeholder="Amsterdam"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    leftIcon={<Location width={16} height={16} />}
                    iconStyle="bordered"
                    state={value ? 'filled' : undefined}
                  />
                )}
              />
              {getErrorMessage(form.formState.errors, 'city') && (
                <Text style={styles.errorText}>{getErrorMessage(form.formState.errors, 'city')}</Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.actionButtons, { paddingBottom: theme.spacing[5] + insets.bottom }]}>
        <Button variant="primary" size="large" onPress={handleSave} showIcon={false} disabled={!form.isValid}>
          Opslaan
        </Button>
        <Button variant="outline" size="large" onPress={handleCancel} showIcon={false}>
          Annuleren
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[900],
  },
  content: {
    flex: 1,
  },
  formContainer: {
    paddingHorizontal: theme.spacing[5],
    paddingTop: theme.spacing[4],
    paddingBottom: theme.spacing[6],
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
  row: {
    flexDirection: 'row',
    gap: theme.spacing[3],
  },
  flexItem: {
    flex: 1,
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



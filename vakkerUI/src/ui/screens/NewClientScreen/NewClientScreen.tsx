import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Input, Button } from '../../components';
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

// Context: Form screen for adding a new client with type selection and contact details
export function NewClientScreen() {
  const [clientType, setClientType] = React.useState<'business' | 'personal'>(
    'personal'
  );
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
  });

  const handleBack = () => {
    // Context: Navigate back to previous screen
    console.log('Navigate back');
  };

  const handleSave = () => {
    // Context: Save new client data
    console.log('Save client', { clientType, ...formData });
  };

  const handleCancel = () => {
    // Context: Cancel form and go back
    console.log('Cancel form');
  };

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const clearField = (field: keyof typeof formData) => {
    setFormData((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Context: Header with back navigation and save action */}
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <TouchableOpacity onPress={handleBack} style={styles.iconButton}>
            <ArrowLeft width={28} height={28} />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Nieuwe Klant</Text>

        <View style={styles.rightSection}>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveText}>Opslaan</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          {/* Context: Client type selection tabs */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Type Klant</Text>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  clientType === 'business' && styles.activeTab,
                ]}
                onPress={() => setClientType('business')}
              >
                <Briefcase
                  width={24}
                  height={24}
                  color={
                    clientType === 'business'
                      ? theme.colors.primary.main
                      : theme.colors.gray[500]
                  }
                />
                <Text
                  style={[
                    styles.tabText,
                    clientType === 'business' && styles.activeTabText,
                  ]}
                >
                  Zakelijk
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.tabButton,
                  clientType === 'personal' && styles.activeTab,
                ]}
                onPress={() => setClientType('personal')}
              >
                <User
                  width={24}
                  height={24}
                  color={
                    clientType === 'personal'
                      ? theme.colors.primary.main
                      : theme.colors.gray[500]
                  }
                />
                <Text
                  style={[
                    styles.tabText,
                    clientType === 'personal' && styles.activeTabText,
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
              <Input
                placeholder="Voer naam in"
                value={formData.name}
                onChangeText={(text) => updateField('name', text)}
                leftIcon={<User width={16} height={16} />}
                rightIcon={
                  formData.name ? <Close width={20} height={20} /> : undefined
                }
                showRightIcon={!!formData.name}
                iconStyle="bordered"
                state="filled"
              />
            </View>

            {/* Context: Email address input */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>E-mailadres</Text>
              <Input
                placeholder="voorbeeld@email.com"
                value={formData.email}
                onChangeText={(text) => updateField('email', text)}
                leftIcon={<Email width={16} height={16} />}
                rightIcon={
                  formData.email ? <Close width={20} height={20} /> : undefined
                }
                showRightIcon={!!formData.email}
                iconStyle="bordered"
                state="filled"
                keyboardType="email-address"
              />
            </View>

            {/* Context: Phone number input */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Telefoonnummer</Text>
              <Input
                placeholder="+31 6 12345678"
                value={formData.phone}
                onChangeText={(text) => updateField('phone', text)}
                leftIcon={<Call width={16} height={16} />}
                rightIcon={
                  formData.phone ? <Close width={20} height={20} /> : undefined
                }
                showRightIcon={!!formData.phone}
                iconStyle="bordered"
                state="filled"
                keyboardType="phone-pad"
              />
            </View>

            {/* Context: Street address input */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Adres</Text>
              <Input
                placeholder="Straatnaam en huisnummer"
                value={formData.address}
                onChangeText={(text) => updateField('address', text)}
                leftIcon={<Location width={16} height={16} />}
                rightIcon={
                  formData.address ? (
                    <Close width={20} height={20} />
                  ) : undefined
                }
                showRightIcon={!!formData.address}
                iconStyle="bordered"
                state="filled"
              />
            </View>

            {/* Context: Postal code and city input */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Postcode en Plaats</Text>
              <Input
                placeholder="1234 AB Amsterdam"
                value={formData.postalCode}
                onChangeText={(text) => updateField('postalCode', text)}
                leftIcon={<Location width={16} height={16} />}
                rightIcon={
                  formData.postalCode ? (
                    <Close width={20} height={20} />
                  ) : undefined
                }
                showRightIcon={!!formData.postalCode}
                iconStyle="bordered"
                state="filled"
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Context: Action buttons for save and cancel */}
      <View style={styles.actionButtons}>
        <Button
          variant="primary"
          size="large"
          onPress={handleSave}
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
  content: {
    flex: 1,
  },
  formContainer: {
    paddingHorizontal: theme.spacing[5],
    paddingTop: theme.spacing[4],
    gap: theme.spacing[10],
  },
  section: {
    gap: theme.spacing[1.5],
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
    gap: theme.spacing[0.5],
  },
  fieldLabel: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: theme.spacing[0.5],
  },
  actionButtons: {
    paddingHorizontal: theme.spacing[5],
    paddingBottom: theme.spacing[5],
    gap: theme.spacing[3],
  },
});

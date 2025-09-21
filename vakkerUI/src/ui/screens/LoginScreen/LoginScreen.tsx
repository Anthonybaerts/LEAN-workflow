/**
 * LoginScreen Component
 * @description Login screen with email/password form and logo placeholder
 * @example
 * ```tsx
 * import { LoginScreen } from '@ui/screens';
 * <LoginScreen />
 * ```
 */

import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Header, Input, Button } from '../../components';
import { Email, Lock } from '../../icons';
import { theme } from '../../tokens';

type Props = {
  email?: string;
  password?: string;
  onEmailChange?: (email: string) => void;
  onPasswordChange?: (password: string) => void;
  onLogin?: () => void;
  onForgotPassword?: () => void;
  isSubmitting?: boolean;
  errorMessage?: string;
};

export function LoginScreen({
  email = '',
  password = '',
  onEmailChange,
  onPasswordChange,
  onLogin,
  onForgotPassword,
  isSubmitting = false,
  errorMessage,
}: Props) {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.headerSection}>
            <Header title="Login" />
          </View>

          {/* Logo Placeholder */}
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>Logo Placeholder</Text>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            {/* Email Field */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>E-mailadres</Text>
              <Input
                placeholder="voorbeeld@email.nl"
                leftIcon={
                  <Email
                    width={20}
                    height={20}
                    color={theme.colors.gray[500]}
                  />
                }
                iconStyle="simple"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={onEmailChange}
              />
            </View>

            {/* Password Field */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Wachtwoord</Text>
              <Input
                placeholder="Voer je wachtwoord in"
                leftIcon={
                  <Lock width={20} height={20} color={theme.colors.gray[500]} />
                }
                iconStyle="simple"
                secureTextEntry
                value={password}
                onChangeText={onPasswordChange}
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionSection}>
            {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}
            <Button
              variant="primary"
              size="large"
              showIcon={false}
              disabled={isSubmitting}
              onPress={onLogin}
            >
              Inloggen
            </Button>

            <Button
              variant="text"
              size="large"
              showIcon={false}
              onPress={onForgotPassword}
            >
              Wachtwoord vergeten?
            </Button>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2023 Vakker. Voor professionele service planning.
          </Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing[5],
    gap: theme.spacing[10], // 40px gap between main sections
  },
  headerSection: {
    // Header already has proper padding
  },
  logoPlaceholder: {
    height: 128,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: theme.colors.gray[600],
    backgroundColor: theme.colors.gray[800],
  },
  logoText: {
    color: theme.colors.gray[500],
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  formSection: {
    gap: theme.spacing[5], // 20px gap between form fields
  },
  fieldGroup: {
    gap: 2, // 2px gap as in design
  },
  fieldLabel: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 28,
    marginBottom: theme.spacing[1],
  },
  actionSection: {
    gap: theme.spacing[3], // 12px gap between buttons
  },
  errorText: {
    color: theme.colors.warning.main,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: theme.spacing[5],
    paddingBottom: theme.spacing[5],
    paddingTop: theme.spacing[3],
  },
  footerText: {
    color: theme.colors.gray[500],
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    textAlign: 'center',
  },
});

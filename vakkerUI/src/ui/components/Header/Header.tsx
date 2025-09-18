/**
 * Header Component
 * @description Navigation header with back button, title, and menu actions
 * @example
 * ```tsx
 * import { Header } from '@ui/components';
 * import { ArrowLeft, ThreeDotsVertical } from '@ui/icons';
 *
 * <Header
 *   title="Contact Details"
 *   leftIcon={<ArrowLeft />}
 *   rightIcon={<ThreeDotsVertical />}
 *   onLeftPress={() => navigation.goBack()}
 *   onRightPress={() => showMenu()}
 * />
 *
 * <Header
 *   title="Nieuwe Taak"
 *   leftIcon={<ArrowLeft />}
 *   rightText="Opslaan"
 *   rightTextColor="#4285F3"
 *   onLeftPress={() => navigation.goBack()}
 *   onRightPress={() => handleSave()}
 * />
 * ```
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { theme } from '../../tokens';

export interface HeaderProps {
  /**
   * Header title text
   */
  title: string;

  /**
   * Left side icon (usually back arrow)
   */
  leftIcon?: React.ReactNode;

  /**
   * Right side icon (usually menu or action)
   */
  rightIcon?: React.ReactNode;

  /**
   * Right side text button (alternative to rightIcon)
   */
  rightText?: string;

  /**
   * Color for right text button
   */
  rightTextColor?: string;

  /**
   * Handler for left icon press
   */
  onLeftPress?: () => void;

  /**
   * Handler for right icon/text press
   */
  onRightPress?: () => void;

  /**
   * Custom container style
   */
  style?: ViewStyle;
}

export function Header({
  title,
  leftIcon,
  rightIcon,
  rightText,
  rightTextColor = theme.colors.primary.main,
  onLeftPress,
  onRightPress,
  style,
}: HeaderProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftSection}>
        {leftIcon && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onLeftPress}
            activeOpacity={0.7}
          >
            {leftIcon}
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.rightSection}>
        {rightText ? (
          <TouchableOpacity
            style={styles.textButton}
            onPress={onRightPress}
            activeOpacity={0.7}
          >
            <Text style={[styles.rightText, { color: rightTextColor }]}>
              {rightText}
            </Text>
          </TouchableOpacity>
        ) : rightIcon ? (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onRightPress}
            activeOpacity={0.7}
          >
            {rightIcon}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.gray[900],
    paddingVertical: theme.spacing[8],
    paddingHorizontal: 0,
    height: 60,
  },

  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },

  rightSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: theme.spacing[2],
  },

  title: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.inter,
    fontWeight: theme.typography.fontWeight.semibold,
    textAlign: 'center',
  },

  iconButton: {
    padding: theme.spacing[1], // Small padding for touch target
  },

  textButton: {
    padding: theme.spacing[1],
  },

  rightText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
  },
});

/**
 * TabButton Component
 * @description Tab button component from Vakker design system
 * @example
 * ```tsx
 * import { TabButton } from '@ui/components';
 * import { User } from '@ui/icons';
 *
 * <TabButton
 *   label="Profile"
 *   icon={<User />}
 *   active
 * />
 *
 * <TabButton
 *   label="Settings"
 *   icon={<User />}
 *   showIcon={false}
 *   onPress={() => console.log('tab pressed')}
 * />
 * ```
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
  View,
} from 'react-native';
import { theme } from '../../tokens';

export interface TabButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  /**
   * Tab label text
   */
  label: string;

  /**
   * Icon to display above the label
   */
  icon?: React.ReactNode;

  /**
   * Whether to show the icon
   */
  showIcon?: boolean;

  /**
   * Active state
   */
  active?: boolean;

  /**
   * Custom container style
   */
  style?: ViewStyle;
}

export function TabButton({
  label,
  icon,
  showIcon = true,
  active = false,
  style,
  ...props
}: TabButtonProps) {
  const containerStyle = [
    styles.container,
    active && styles.activeContainer,
    style,
  ];

  const textStyle = [styles.text, active && styles.activeText];

  return (
    <TouchableOpacity style={containerStyle} activeOpacity={0.7} {...props}>
      <View style={styles.content}>
        {showIcon && icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={textStyle}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
    borderRadius: theme.radius.lg,
    backgroundColor: 'transparent',
    minWidth: 80,
  },

  activeContainer: {
    backgroundColor: theme.colors.primary.main,
  },

  content: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing[2],
  },

  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontFamily: theme.typography.fontFamily.inter,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.white,
    textAlign: 'center',
  },

  activeText: {
    color: theme.colors.white,
  },
});

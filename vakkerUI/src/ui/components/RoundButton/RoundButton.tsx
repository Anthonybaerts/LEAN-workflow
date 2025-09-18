/**
 * RoundButton Component
 * @description Round button component from Vakker design system
 * @example
 * ```tsx
 * import { RoundButton } from '@ui/components';
 * import { AddUser } from '@ui/icons';
 *
 * <RoundButton icon={<AddUser />} />
 *
 * <RoundButton
 *   icon={<AddUser />}
 *   disabled
 *   onPress={() => console.log('pressed')}
 * />
 * ```
 */

import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { theme } from '../../tokens';

export interface RoundButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  /**
   * Icon to display in the button
   */
  icon: React.ReactNode;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Custom container style
   */
  style?: ViewStyle;
}

export function RoundButton({
  icon,
  disabled = false,
  style,
  ...props
}: RoundButtonProps) {
  const containerStyle = [
    styles.container,
    disabled && styles.disabledContainer,
    style,
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      disabled={disabled}
      activeOpacity={0.8}
      {...props}
    >
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 64,
    height: 64,
    borderRadius: theme.radius.circle,
    backgroundColor: theme.colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },

  disabledContainer: {
    backgroundColor: theme.colors.gray[500],
    shadowOpacity: 0,
    elevation: 0,
  },
});

/**
 * Input Component
 * @description Input component from Vakker design system with multiple states and multiline support
 * @example
 * ```tsx
 * import { Input } from '@ui/components';
 * import { Search, User } from '@ui/icons';
 *
 * <Input
 *   placeholder="Search..."
 *   leftIcon={<Search />}
 *   iconStyle="simple"
 * />
 *
 * <Input
 *   placeholder="Description..."
 *   multiline
 *   numberOfLines={4}
 * />
 * ```
 */

import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { theme } from '../../tokens';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Left side icon
   */
  leftIcon?: React.ReactNode;

  /**
   * Right side icon
   */
  rightIcon?: React.ReactNode;

  /**
   * Whether to show the left icon
   */
  showLeftIcon?: boolean;

  /**
   * Whether to show the right icon
   */
  showRightIcon?: boolean;

  /**
   * Icon style variant
   */
  iconStyle?: 'simple' | 'bordered';

  /**
   * Input state
   */
  state?: 'default' | 'selected' | 'typing' | 'filled';

  /**
   * Multiline support for textarea
   */
  multiline?: boolean;

  /**
   * Number of lines for multiline
   */
  numberOfLines?: number;

  /**
   * Custom container style
   */
  containerStyle?: ViewStyle;

  /**
   * Custom input style
   */
  style?: ViewStyle;
}

export function Input({
  placeholder = 'Placeholder',
  leftIcon,
  rightIcon,
  showLeftIcon = true,
  showRightIcon = false,
  iconStyle = 'simple',
  state: controlledState,
  multiline = false,
  numberOfLines = 1,
  containerStyle,
  style,
  value,
  onFocus,
  onBlur,
  onChangeText,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasText, setHasText] = useState(Boolean(value));

  // Determine current state
  const currentState =
    controlledState || (hasText ? 'filled' : isFocused ? 'typing' : 'default');

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleChangeText = (text: string) => {
    setHasText(text.length > 0);
    onChangeText?.(text);
  };

  const containerStyles = [
    styles.container,
    multiline && styles.multilineContainer,
    containerStyle,
  ];

  const contentStyles = [styles.content, multiline && styles.multilineContent];

  const textInputStyles = [
    styles.textInput,
    styles[`${currentState}Text`],
    multiline && styles.multilineInput,
    style,
  ];

  const leftIconContainerStyles = [
    iconStyle === 'bordered' ? styles.iconBordered : styles.iconSimple,
  ];

  return (
    <View style={containerStyles}>
      <View style={contentStyles}>
        {showLeftIcon && leftIcon && (
          <View style={leftIconContainerStyles}>{leftIcon}</View>
        )}

        <TextInput
          style={textInputStyles}
          placeholder={placeholder}
          placeholderTextColor={getPlaceholderColor(currentState)}
          value={value}
          multiline={multiline}
          numberOfLines={numberOfLines}
          textAlignVertical={multiline ? 'top' : 'center'}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          {...props}
        />

        {showRightIcon && rightIcon && (
          <View
            style={[
              leftIconContainerStyles,
              multiline && styles.rightIconMultiline,
            ]}
          >
            {rightIcon}
          </View>
        )}
      </View>
    </View>
  );
}

function getPlaceholderColor(state: string): string {
  switch (state) {
    case 'typing':
    case 'filled':
      return theme.colors.white;
    default:
      return theme.colors.gray[400]; // #ADAEBC
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  multilineContainer: {
    // Additional styling for multiline containers
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
    paddingHorizontal: theme.spacing[3],
    paddingVertical: theme.spacing[2],
    backgroundColor: theme.colors.gray[800],
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.gray[600],
    minHeight: 44,
  },

  multilineContent: {
    alignItems: 'flex-start',
    paddingVertical: theme.spacing[2],
    minHeight: 88,
  },

  textInput: {
    flex: 1,
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: theme.colors.gray[400],
    padding: 0, // Remove default padding
  },

  multilineInput: {
    minHeight: 60,
    textAlignVertical: 'top',
  },

  // Icon containers
  iconSimple: {
    // No additional styling for simple icons
  },

  iconBordered: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.primary['20'],
    alignItems: 'center',
    justifyContent: 'center',
  },

  rightIconMultiline: {
    alignSelf: 'flex-start',
    marginTop: theme.spacing[1],
  },

  // Text colors for different states
  defaultText: {
    color: theme.colors.gray[400], // #ADAEBC
  },

  selectedText: {
    color: theme.colors.gray[400], // #ADAEBC (same as default in design)
  },

  typingText: {
    color: theme.colors.white,
  },

  filledText: {
    color: theme.colors.white,
  },
});

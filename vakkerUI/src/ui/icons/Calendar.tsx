/**
 * Calendar Icon
 * @description Calendar icon from Vakker design system
 * @example
 * ```tsx
 * import { Calendar } from '@ui/icons';
 * <Calendar width={28} height={28} color="#9CA3AF" />
 * ```
 */

import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface CalendarProps extends SvgProps {
  size?: number;
  color?: string;
}

export function Calendar({
  size = 28,
  color = '#9CA3AF',
  width = size,
  height = size,
  ...props
}: CalendarProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 28 28"
      fill="none"
      {...props}
    >
      <Path
        d="M9.5 6.125V7.25H7.8125C6.88086 7.25 6.125 8.00586 6.125 8.9375V10.625H21.875V8.9375C21.875 8.00586 21.1191 7.25 20.1875 7.25H18.5V6.125C18.5 5.50273 17.9973 5 17.375 5C16.7527 5 16.25 5.50273 16.25 6.125V7.25H11.75V6.125C11.75 5.50273 11.2473 5 10.625 5C10.0027 5 9.5 5.50273 9.5 6.125ZM21.875 11.75H6.125V21.3125C6.125 22.2441 6.88086 23 7.8125 23H20.1875C21.1191 23 21.875 22.2441 21.875 21.3125V11.75Z"
        fill={color}
      />
    </Svg>
  );
}

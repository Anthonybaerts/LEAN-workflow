/**
 * Clock Icon
 * @description Clock/time icon from Vakker design system
 * @example
 * ```tsx
 * import { Clock } from '@ui/icons';
 * <Clock width={20} height={20} color="#4285F4" />
 * ```
 */

import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface ClockProps extends SvgProps {
  size?: number;
  color?: string;
}

export function Clock({
  size = 20,
  color = '#4285F4',
  width = size,
  height = size,
  ...props
}: ClockProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <Path
        d="M10 2C12.1217 2 14.1566 2.84285 15.6569 4.34315C17.1571 5.84344 18 7.87827 18 10C18 12.1217 17.1571 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18C7.87827 18 5.84344 17.1571 4.34315 15.6569C2.84285 14.1566 2 12.1217 2 10C2 7.87827 2.84285 5.84344 4.34315 4.34315C5.84344 2.84285 7.87827 2 10 2ZM9.25 5.75V10C9.25 10.25 9.375 10.4844 9.58437 10.625L12.5844 12.625C12.9281 12.8562 13.3938 12.7625 13.625 12.4156C13.8562 12.0687 13.7625 11.6062 13.4156 11.375L10.75 9.6V5.75C10.75 5.33437 10.4156 5 10 5C9.58437 5 9.25 5.33437 9.25 5.75Z"
        fill={color}
      />
    </Svg>
  );
}

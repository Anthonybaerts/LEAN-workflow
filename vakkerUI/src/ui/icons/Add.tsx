/**
 * Add Icon
 * @description Plus/add icon from Vakker design system
 * @example
 * ```tsx
 * import { Add } from '@ui/icons';
 * <Add width={24} height={24} color="white" />
 * ```
 */

import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface AddProps extends SvgProps {
  size?: number;
  color?: string;
}

export function Add({
  size = 24,
  color = 'white',
  width = size,
  height = size,
  ...props
}: AddProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M13 5.5C13 4.94687 12.5531 4.5 12 4.5C11.4469 4.5 11 4.94687 11 5.5V10H6.5C5.94687 10 5.5 10.4469 5.5 11C5.5 11.5531 5.94687 12 6.5 12H11V16.5C11 17.0531 11.4469 17.5 12 17.5C12.5531 17.5 13 17.0531 13 16.5V12H17.5C18.0531 12 18.5 11.5531 18.5 11C18.5 10.4469 18.0531 10 17.5 10H13V5.5Z"
        fill={color}
      />
    </Svg>
  );
}

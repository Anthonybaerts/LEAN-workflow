/**
 * ChevronLeft Icon
 * @description Left arrow chevron icon from Vakker design system
 * @example
 * ```tsx
 * import { ChevronLeft } from '@ui/icons';
 * <ChevronLeft width={28} height={28} color="white" />
 * ```
 */

import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface ChevronLeftProps extends SvgProps {
  size?: number;
  color?: string;
}

export function ChevronLeft({
  size = 28,
  color = 'white',
  width = size,
  height = size,
  ...props
}: ChevronLeftProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 28 28"
      fill="none"
      {...props}
    >
      <Path
        d="M10.2953 12.7984C9.90469 13.1891 9.90469 13.8234 10.2953 14.2141L16.2953 20.2141C16.6859 20.6047 17.3203 20.6047 17.7109 20.2141C18.1016 19.8234 18.1016 19.1891 17.7109 18.7984L12.4172 13.5047L17.7078 8.21094C18.0984 7.82032 18.0984 7.18594 17.7078 6.79532C17.3172 6.40469 16.6828 6.40469 16.2922 6.79532L10.2922 12.7953L10.2953 12.7984Z"
        fill={color}
      />
    </Svg>
  );
}

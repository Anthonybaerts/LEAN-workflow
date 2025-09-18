/**
 * ChevronRight Icon
 * @description Right arrow chevron icon from Vakker design system
 * @example
 * ```tsx
 * import { ChevronRight } from '@ui/icons';
 * <ChevronRight width={20} height={20} color="#4285F3" />
 * ```
 */

import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface ChevronRightProps extends SvgProps {
  size?: number;
  color?: string;
}

export function ChevronRight({
  size = 20,
  color = '#4285F3',
  width = size,
  height = size,
  ...props
}: ChevronRightProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <Path
        d="M13.7076 9.29375C14.0982 9.68438 14.0982 10.3188 13.7076 10.7094L7.70762 16.7094C7.31699 17.1 6.68262 17.1 6.29199 16.7094C5.90137 16.3188 5.90137 15.6844 6.29199 15.2938L11.5857 10L6.29512 4.70625C5.90449 4.31563 5.90449 3.68125 6.29512 3.29063C6.68574 2.9 7.32012 2.9 7.71074 3.29063L13.7107 9.29063L13.7076 9.29375Z"
        fill={color}
      />
    </Svg>
  );
}

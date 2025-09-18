/**
 * Call Icon
 * @description Call/phone icon from Vakker design system
 * @example
 * ```tsx
 * import { Call } from '@ui/icons';
 * <Call width={16} height={16} color="#4285F3" />
 * ```
 */

import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface CallProps extends SvgProps {
  size?: number;
  color?: string;
}

export function Call({
  size = 16,
  color = '#4285F3',
  width = size,
  height = size,
  ...props
}: CallProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <Path
        d="M5.86436 2.57682C5.68389 2.14089 5.20811 1.90886 4.75342 2.03307L2.69092 2.59557C2.28311 2.70807 1.99951 3.07839 1.99951 3.50026C1.99951 9.2987 6.70108 14.0003 12.4995 14.0003C12.9214 14.0003 13.2917 13.7167 13.4042 13.3089L13.9667 11.2464C14.0909 10.7917 13.8589 10.3159 13.4229 10.1354L11.1729 9.19792C10.7909 9.03854 10.348 9.1487 10.0878 9.46979L9.14092 10.6253C7.49092 9.84479 6.15498 8.50886 5.37451 6.85886L6.52998 5.91432C6.85108 5.65182 6.96123 5.2112 6.80186 4.82917L5.86436 2.57917V2.57682Z"
        fill={color}
      />
    </Svg>
  );
}

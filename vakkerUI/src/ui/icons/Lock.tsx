/**
 * Lock Icon
 * @description Lock/security icon from Vakker design system
 * @example
 * ```tsx
 * import { Lock } from '@ui/icons';
 * <Lock width={20} height={20} color="#4285F3" />
 * ```
 */

import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface LockProps extends SvgProps {
  size?: number;
  color?: string;
}

export function Lock({
  size = 20,
  color = '#4285F3',
  width = size,
  height = size,
  ...props
}: LockProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <Path
        d="M7.85714 6.9375V8.25H12.1429V6.9375C12.1429 5.72891 11.1839 4.75 10 4.75C8.81607 4.75 7.85714 5.72891 7.85714 6.9375ZM6.14286 8.25V6.9375C6.14286 4.76367 7.87054 3 10 3C12.1295 3 13.8571 4.76367 13.8571 6.9375V8.25H14.2857C15.2312 8.25 16 9.03477 16 10V15.25C16 16.2152 15.2312 17 14.2857 17H5.71429C4.76875 17 4 16.2152 4 15.25V10C4 9.03477 4.76875 8.25 5.71429 8.25H6.14286Z"
        fill={color}
      />
    </Svg>
  );
}

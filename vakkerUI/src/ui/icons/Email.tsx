/**
 * Email Icon
 * @description Email/mail icon from Vakker design system
 * @example
 * ```tsx
 * import { Email } from '@ui/icons';
 * <Email width={24} height={24} color="white" />
 * ```
 */

import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface EmailProps extends SvgProps {
  size?: number;
  color?: string;
}

export function Email({
  size = 24,
  color = 'white',
  width = size,
  height = size,
  ...props
}: EmailProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M5.07812 6C4.25 6 3.57812 6.67188 3.57812 7.5C3.57812 7.97187 3.8 8.41562 4.17813 8.7L10.9781 13.8C11.3344 14.0656 11.8219 14.0656 12.1781 13.8L18.9781 8.7C19.3562 8.41562 19.5781 7.97187 19.5781 7.5C19.5781 6.67188 18.9062 6 18.0781 6H5.07812ZM3.57812 9.5V16C3.57812 17.1031 4.475 18 5.57812 18H17.5781C18.6812 18 19.5781 17.1031 19.5781 16V9.5L12.7781 14.6C12.0656 15.1344 11.0906 15.1344 10.3781 14.6L3.57812 9.5Z"
        fill={color}
      />
    </Svg>
  );
}

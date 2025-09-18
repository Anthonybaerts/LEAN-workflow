/**
 * AddUser Icon
 * @description Add user icon from Vakker design system
 * @example
 * ```tsx
 * import { AddUser } from '@ui/icons';
 * <AddUser width={28} height={28} color="white" />
 * ```
 */

import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface AddUserProps extends SvgProps {
  size?: number;
  color?: string;
}

export function AddUser({
  size = 28,
  color = 'white',
  width = size,
  height = size,
  ...props
}: AddUserProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 28 28"
      fill="none"
      {...props}
    >
      <Path
        d="M5.75 9C5.75 7.67392 6.27678 6.40215 7.21447 5.46447C8.15215 4.52678 9.42392 4 10.75 4C12.0761 4 13.3479 4.52678 14.2855 5.46447C15.2232 6.40215 15.75 7.67392 15.75 9C15.75 10.3261 15.2232 11.5979 14.2855 12.5355C13.3479 13.4732 12.0761 14 10.75 14C9.42392 14 8.15215 13.4732 7.21447 12.5355C6.27678 11.5979 5.75 10.3261 5.75 9ZM2 22.8398C2 18.9922 5.11719 15.875 8.96484 15.875H12.5352C16.3828 15.875 19.5 18.9922 19.5 22.8398C19.5 23.4805 18.9805 24 18.3398 24H3.16016C2.51953 24 2 23.4805 2 22.8398ZM21.6875 16.1875V13.6875H19.1875C18.668 13.6875 18.25 13.2695 18.25 12.75C18.25 12.2305 18.668 11.8125 19.1875 11.8125H21.6875V9.3125C21.6875 8.79297 22.1055 8.375 22.625 8.375C23.1445 8.375 23.5625 8.79297 23.5625 9.3125V11.8125H26.0625C26.582 11.8125 27 12.2305 27 12.75C27 13.2695 26.582 13.6875 26.0625 13.6875H23.5625V16.1875C23.5625 16.707 23.1445 17.125 22.625 17.125C22.1055 17.125 21.6875 16.707 21.6875 16.1875Z"
        fill={color}
      />
    </Svg>
  );
}

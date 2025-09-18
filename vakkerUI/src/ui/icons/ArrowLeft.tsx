/**
 * ArrowLeft Icon
 * @description Left arrow icon from Vakker design system
 * @example
 * ```tsx
 * import { ArrowLeft } from '@ui/icons';
 * <ArrowLeft width={28} height={28} color="white" />
 * ```
 */

import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface ArrowLeftProps extends SvgProps {
  size?: number;
  color?: string;
}

export function ArrowLeft({
  size = 28,
  color = 'white',
  width = size,
  height = size,
  ...props
}: ArrowLeftProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 28 28"
      fill="none"
      {...props}
    >
      <Path
        d="M6.33008 13.2055C5.89062 13.6449 5.89062 14.3586 6.33008 14.798L11.9551 20.423C12.3945 20.8625 13.1082 20.8625 13.5477 20.423C13.9871 19.9836 13.9871 19.2699 13.5477 18.8305L9.83867 15.125H20.6246C21.2469 15.125 21.7496 14.6223 21.7496 14C21.7496 13.3777 21.2469 12.875 20.6246 12.875H9.84219L13.5441 9.16953C13.9836 8.73007 13.9836 8.0164 13.5441 7.57695C13.1047 7.1375 12.391 7.1375 11.9516 7.57695L6.32656 13.202L6.33008 13.2055Z"
        fill={color}
      />
    </Svg>
  );
}

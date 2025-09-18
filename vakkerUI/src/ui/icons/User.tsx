/**
 * User Icon
 * @description User icon from Vakker design system
 * @example
 * ```tsx
 * import { User } from '@ui/icons';
 * <User width={16} height={16} color="#4285F3" />
 * ```
 */

import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface UserProps extends SvgProps {
  size?: number;
  color?: string;
}

export function User({
  size = 16,
  color = '#4285F3',
  width = size,
  height = size,
  ...props
}: UserProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <Path
        d="M8.25 8C9.04565 8 9.80871 7.68393 10.3713 7.12132C10.9339 6.55871 11.25 5.79565 11.25 5C11.25 4.20435 10.9339 3.44129 10.3713 2.87868C9.80871 2.31607 9.04565 2 8.25 2C7.45435 2 6.69129 2.31607 6.12868 2.87868C5.56607 3.44129 5.25 4.20435 5.25 5C5.25 5.79565 5.56607 6.55871 6.12868 7.12132C6.69129 7.68393 7.45435 8 8.25 8ZM7.17891 9.125C4.87031 9.125 3 10.9953 3 13.3039C3 13.6883 3.31172 14 3.69609 14H12.8039C13.1883 14 13.5 13.6883 13.5 13.3039C13.5 10.9953 11.6297 9.125 9.32109 9.125H7.17891Z"
        fill={color}
      />
    </Svg>
  );
}

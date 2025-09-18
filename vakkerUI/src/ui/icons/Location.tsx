/**
 * Location Icon
 * @description Location/map pin icon from Vakker design system
 * @example
 * ```tsx
 * import { Location } from '@ui/icons';
 * <Location width={16} height={16} color="#4285F3" />
 * ```
 */

import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface LocationProps extends SvgProps {
  size?: number;
  color?: string;
}

export function Location({
  size = 16,
  color = '#4285F3',
  width = size,
  height = size,
  ...props
}: LocationProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <Path
        d="M9.05547 13.7155C10.2578 12.2108 13 8.56396 13 6.51553C13 4.03115 10.9844 2.01553 8.5 2.01553C6.01562 2.01553 4 4.03115 4 6.51553C4 8.56396 6.74219 12.2108 7.94453 13.7155C8.23281 14.0741 8.76719 14.0741 9.05547 13.7155ZM8.5 5.01553C8.89782 5.01553 9.27936 5.17356 9.56066 5.45487C9.84196 5.73617 10 6.1177 10 6.51553C10 6.91335 9.84196 7.29488 9.56066 7.57619C9.27936 7.85749 8.89782 8.01553 8.5 8.01553C8.10218 8.01553 7.72064 7.85749 7.43934 7.57619C7.15804 7.29488 7 6.91335 7 6.51553C7 6.1177 7.15804 5.73617 7.43934 5.45487C7.72064 5.17356 8.10218 5.01553 8.5 5.01553Z"
        fill={color}
      />
    </Svg>
  );
}

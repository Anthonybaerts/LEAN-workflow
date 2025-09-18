/**
 * Close Icon
 * @description Close/X icon from Vakker design system
 * @example
 * ```tsx
 * import { Close } from '@ui/icons';
 * <Close width={16} height={16} color="#9CA3AF" />
 * ```
 */

import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface CloseProps extends SvgProps {
  size?: number;
  color?: string;
}

export function Close({
  size = 16,
  color = '#9CA3AF',
  width = size,
  height = size,
  ...props
}: CloseProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <Path
        d="M11.7632 5.36623C12.0756 5.05388 12.0756 4.54662 11.7632 4.23427C11.4509 3.92191 10.9436 3.92191 10.6313 4.23427L8 6.86803L5.36623 4.23676C5.05388 3.92441 4.54662 3.92441 4.23427 4.23676C3.92191 4.54912 3.92191 5.05638 4.23427 5.36873L6.86803 8L4.23676 10.6338C3.92441 10.9461 3.92441 11.4534 4.23676 11.7657C4.54912 12.0781 5.05638 12.0781 5.36873 11.7657L8 9.13197L10.6338 11.7632C10.9461 12.0756 11.4534 12.0756 11.7657 11.7632C12.0781 11.4509 12.0781 10.9436 11.7657 10.6313L9.13197 8L11.7632 5.36623Z"
        fill={color}
      />
    </Svg>
  );
}

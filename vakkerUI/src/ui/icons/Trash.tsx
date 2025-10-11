/**
 * Trash Icon
 */

import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface TrashProps extends SvgProps {
  size?: number;
  color?: string;
}

export function Trash({
  size = 20,
  color = '#E53935',
  width = size,
  height = size,
  ...props
}: TrashProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M3 6h18" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke={color} strokeWidth={2} />
      <Path d="M10 11v6M14 11v6" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}



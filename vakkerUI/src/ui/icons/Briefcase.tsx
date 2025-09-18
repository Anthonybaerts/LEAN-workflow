/**
 * Briefcase Icon
 * @description Briefcase/work icon from Vakker design system
 * @example
 * ```tsx
 * import { Briefcase } from '@ui/icons';
 * <Briefcase width={20} height={20} color="#4285F3" />
 * ```
 */

import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface BriefcaseProps extends SvgProps {
  size?: number;
  color?: string;
}

export function Briefcase({
  size = 20,
  color = '#4285F3',
  width = size,
  height = size,
  ...props
}: BriefcaseProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <Path
        d="M8.03125 4.75H11.9688C12.0891 4.75 12.1875 4.84844 12.1875 4.96875V6.0625H7.8125V4.96875C7.8125 4.84844 7.91094 4.75 8.03125 4.75ZM6.5 4.96875V6.0625H4.75C3.78477 6.0625 3 6.84727 3 7.8125V10.4375H8.25H11.75H17V7.8125C17 6.84727 16.2152 6.0625 15.25 6.0625H13.5V4.96875C13.5 4.12383 12.8137 3.4375 11.9688 3.4375H8.03125C7.18633 3.4375 6.5 4.12383 6.5 4.96875ZM17 11.3125H11.75V12.1875C11.75 12.6715 11.359 13.0625 10.875 13.0625H9.125C8.64102 13.0625 8.25 12.6715 8.25 12.1875V11.3125H3V14.8125C3 15.7777 3.78477 16.5625 4.75 16.5625H15.25C16.2152 16.5625 17 15.7777 17 14.8125V11.3125Z"
        fill={color}
      />
    </Svg>
  );
}

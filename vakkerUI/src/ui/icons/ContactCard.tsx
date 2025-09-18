/**
 * ContactCard Icon
 * @description Contact card icon from Vakker design system
 * @example
 * ```tsx
 * import { ContactCard } from '@ui/icons';
 * <ContactCard width={20} height={20} color="#4285F4" />
 * ```
 */

import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface ContactCardProps extends SvgProps {
  size?: number;
  color?: string;
}

export function ContactCard({
  size = 20,
  color = '#4285F4',
  width = size,
  height = size,
  ...props
}: ContactCardProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <Path
        d="M3 3C1.89688 3 1 3.89688 1 5V15C1 16.1031 1.89688 17 3 17H17C18.1031 17 19 16.1031 19 15V5C19 3.89688 18.1031 3 17 3H3ZM5.5 11H7.5C8.88125 11 10 12.1187 10 13.5C10 13.775 9.775 14 9.5 14H3.5C3.225 14 3 13.775 3 13.5C3 12.1187 4.11875 11 5.5 11ZM4.5 8C4.5 7.46957 4.71071 6.96086 5.08579 6.58579C5.46086 6.21071 5.96957 6 6.5 6C7.03043 6 7.53914 6.21071 7.91421 6.58579C8.28929 6.96086 8.5 7.46957 8.5 8C8.5 8.53043 8.28929 9.03914 7.91421 9.41421C7.53914 9.78929 7.03043 10 6.5 10C5.96957 10 5.46086 9.78929 5.08579 9.41421C4.71071 9.03914 4.5 8.53043 4.5 8ZM12.5 7H16.5C16.775 7 17 7.225 17 7.5C17 7.775 16.775 8 16.5 8H12.5C12.225 8 12 7.775 12 7.5C12 7.225 12.225 7 12.5 7ZM12.5 9H16.5C16.775 9 17 9.225 17 9.5C17 9.775 16.775 10 16.5 10H12.5C12.225 10 12 9.775 12 9.5C12 9.225 12.225 9 12.5 9ZM12.5 11H16.5C16.775 11 17 11.225 17 11.5C17 11.775 16.775 12 16.5 12H12.5C12.225 12 12 11.775 12 11.5C12 11.225 12.225 11 12.5 11Z"
        fill={color}
      />
    </Svg>
  );
}

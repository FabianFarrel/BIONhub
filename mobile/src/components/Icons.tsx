import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

type P = { size?: number; color?: string };

const stroke = (size: number, color: string) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: color,
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

export const IconMail = ({ size = 18, color = '#fff' }: P) => (
  <Svg {...stroke(size, color)}>
    <Rect x="3" y="5" width="18" height="14" rx="2.5" />
    <Path d="m4 7 8 6 8-6" />
  </Svg>
);

export const IconLock = ({ size = 18, color = '#fff' }: P) => (
  <Svg {...stroke(size, color)}>
    <Rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
    <Path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
  </Svg>
);

export const IconUser = ({ size = 18, color = '#fff' }: P) => (
  <Svg {...stroke(size, color)}>
    <Circle cx="12" cy="8" r="4" />
    <Path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" />
  </Svg>
);

export const IconStar = ({ size = 18, color = '#fff' }: P) => (
  <Svg {...stroke(size, color)}>
    <Path d="M12 3.5 14.6 9l6 .5-4.6 4 1.4 5.9L12 16.8 6.6 19.4 8 13.5 3.4 9.5l6-.5L12 3.5Z" />
  </Svg>
);

export const IconSync = ({ size = 18, color = '#fff' }: P) => (
  <Svg {...stroke(size, color)}>
    <Path d="M4 10a8 8 0 0 1 13.5-4L20 8" />
    <Path d="M20 4v4h-4" />
    <Path d="M20 14a8 8 0 0 1-13.5 4L4 16" />
    <Path d="M4 20v-4h4" />
  </Svg>
);

export const IconHeadphones = ({ size = 18, color = '#fff' }: P) => (
  <Svg {...stroke(size, color)}>
    <Path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <Rect x="3" y="14" width="4" height="6" rx="1.5" />
    <Rect x="17" y="14" width="4" height="6" rx="1.5" />
  </Svg>
);

export const IconDevices = ({ size = 18, color = '#fff' }: P) => (
  <Svg {...stroke(size, color)}>
    <Rect x="2.5" y="5" width="13" height="10" rx="1.6" />
    <Path d="M6 19h7" />
    <Rect x="17" y="9" width="5" height="11" rx="1.4" />
  </Svg>
);

export const IconFilm = ({ size = 18, color = '#fff' }: P) => (
  <Svg {...stroke(size, color)}>
    <Rect x="3" y="4" width="18" height="16" rx="2" />
    <Path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4" />
  </Svg>
);

export const IconPlay = ({ size = 18, color = '#fff' }: P) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M8 5v14l11-7z" />
  </Svg>
);

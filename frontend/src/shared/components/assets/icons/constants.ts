export type SizeType = keyof typeof SIZE_MAP;

export const SIZE_MAP = {
  xxs: '8',
  xs: '16',
  sm: '24',
  lg: '32',
  xlg: '48',
} as const;

export type SizeMapType = typeof SIZE_MAP;

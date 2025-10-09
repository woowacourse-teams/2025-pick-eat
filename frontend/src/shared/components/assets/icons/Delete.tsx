import { THEME } from '@styles/global';

import { SIZE_MAP, SizeType } from './constants';

type Props = {
  size?: SizeType;
  type?: 'lightGray' | 'darkGray';
};

const COLOR_MAP = {
  lightGray: {
    circle: THEME.PALETTE.gray[10],
    cross: THEME.PALETTE.gray[50],
  },
  darkGray: {
    circle: THEME.PALETTE.gray[30],
    cross: THEME.PALETTE.gray[0],
  },
};

function Delete({ size, type = 'lightGray' }: Props) {
  return (
    <svg
      width={SIZE_MAP[size || 'lg']}
      height={SIZE_MAP[size || 'lg']}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="11.5" r="8" fill={COLOR_MAP[type].circle} />
      <path
        d="M9 14.5L15 8.5"
        stroke={COLOR_MAP[type].cross}
        strokeLinecap="round"
      />
      <path
        d="M9 8.5L15 14.5"
        stroke={COLOR_MAP[type].cross}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default Delete;

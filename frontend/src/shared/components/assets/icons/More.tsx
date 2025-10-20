import { THEME } from '@styles/global';

import { SIZE_MAP, SizeType } from './constants';

type Props = {
  size?: SizeType;
  color?: string;
};

function More({ size = 'sm', color = THEME.PALETTE.gray[30] }: Props) {
  return (
    <svg
      width={SIZE_MAP[size]}
      height={SIZE_MAP[size]}
      viewBox="0 0 24 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="7" r="2" fill={color} />
      <circle cx="12" cy="13" r="2" fill={color} />
      <circle cx="12" cy="19" r="2" fill={color} />
    </svg>
  );
}

export default More;

import { THEME } from '@styles/global';

import { SIZE_MAP, SizeType } from './constants';

type Props = {
  size?: SizeType;
  color?: string;
};

function Search({ size, color }: Props) {
  return (
    <svg
      width={SIZE_MAP[size || 'sm']}
      height={SIZE_MAP[size || 'sm']}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="10.9483"
        cy="10.9483"
        r="6.44827"
        stroke={color || THEME.PALETTE.primary[50]}
        strokeWidth="2"
      />
      <path
        d="M15.9141 15.9138L21.5003 21.5"
        stroke={color || THEME.PALETTE.primary[50]}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default Search;

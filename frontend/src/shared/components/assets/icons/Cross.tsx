import { SIZE_MAP, SizeType } from './constants';

type Props = {
  size?: SizeType;
  color?: string;
  strokeWidth?: number;
};

function Cross({ size, color, strokeWidth = 2 }: Props) {
  return (
    <svg
      width={SIZE_MAP[size || 'sm']}
      height={SIZE_MAP[size || 'sm']}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.9688 19.0312L7.125 4.96875"
        stroke={color || 'black'}
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.125 19.0312L16.9688 4.96875"
        stroke={color || 'black'}
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Cross;

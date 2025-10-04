import { SIZE_MAP, SizeType } from './constants';

type Props = {
  size?: SizeType;
  color?: string;
};

function Erase({ size, color }: Props) {
  return (
    <svg
      width={SIZE_MAP[size || 'sm']}
      height={SIZE_MAP[size || 'sm']}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="11.5" r="8" fill="#B1B8BE" />
      <path
        d="M9 14.5L15 8.5"
        stroke={color || 'white'}
        strokeLinecap="round"
      />
      <path
        d="M9 8.5L15 14.5"
        stroke={color || 'white'}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default Erase;

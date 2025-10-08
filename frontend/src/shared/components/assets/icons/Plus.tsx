import { SIZE_MAP, SizeType } from './constants';

type Props = {
  size: SizeType;
  color?: string;
};

function Plus({ size, color = 'black' }: Props) {
  return (
    <svg
      id="Layer_2"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      width={SIZE_MAP[size]}
      height={SIZE_MAP[size]}
    >
      <path
        stroke={color}
        fill={color}
        d="m34 22.19h-8v-8a2 2 0 1 0 -4 0v8h-8a2 2 0 1 0 0 4h8v8a2 2 0 0 0 4 0v-8h8a2 2 0 0 0 0-4z"
      />
    </svg>
  );
}

export default Plus;

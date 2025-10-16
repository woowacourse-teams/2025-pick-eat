import { SIZE_MAP, SizeType } from './constants';

type Props = {
  size: SizeType;
  color?: string;
  strokeWidth?: number;
};

function Info({ size, color = 'black', strokeWidth = 2 }: Props) {
  return (
    <svg
      width={SIZE_MAP[size]}
      height={SIZE_MAP[size]}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <path
        d="M12 10.5v6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <circle cx="12" cy="7.5" r="1.25" fill={color} />
    </svg>
  );
}

export default Info;

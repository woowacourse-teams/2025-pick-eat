import { SIZE_MAP, SizeType } from './constants';

type Props = {
  size?: SizeType;
  color?: string;
};

function Copy({ size, color }: Props) {
  return (
    <svg
      width={SIZE_MAP[size || 'sm']}
      height={SIZE_MAP[size || 'sm']}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 16C15 16.55 14.55 17 14 17H8V18H14C15.1 18 16 17.1 16 16V8H15V16Z"
        fill={color || 'black'}
      />
      <path
        d="M6 17C5.45 17 5 16.55 5 16V6C5 5.45 5.45 5 6 5H14C14.55 5 15 5.45 15 6V7H16V6C16 4.9 15.1 4 14 4H6C4.9 4 4 4.9 4 6V16C4 17.1 4.9 18 6 18H7V17H6Z"
        fill={color || 'black'}
      />
      <path
        d="M17 7H16V8H17C17.55 8 18 8.45 18 9V19C18 19.55 17.55 20 17 20H9C8.45 20 8 19.55 8 19V18H7V19C7 20.1 7.9 21 9 21H17C18.1 21 19 20.1 19 19V9C19 7.9 18.1 7 17 7Z"
        fill={color || 'black'}
      />
      <path d="M16 7H15V8H16V7Z" fill={color || 'black'} />
      <path d="M8 17H7V18H8V17Z" fill={color || 'black'} />
    </svg>
  );
}

export default Copy;

import { SIZE_MAP, SizeType } from './constants';

type Props = {
  size: SizeType;
  color?: string;
};

function Search({ size, color = 'black' }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={SIZE_MAP[size]}
      height={SIZE_MAP[size]}
      viewBox="0 0 20 20"
      version="1.1"
    >
      <path
        d="M0,0v60c0,22.091 17.909,40 40,40h241c22.091,0 40,-17.909 40,-40v-392c0,-22.091 -17.909,-40 -40,-40H40c-22.091,0 -40,17.909 -40,40v60"
        transform="translate(171,392)"
        fill="none"
        stroke={color}
        strokeWidth="40"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path
        d="M0,0H-271"
        transform="translate(291,256)"
        fill="none"
        stroke={color}
        strokeWidth="40"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M0,0 66,66 0,132"
        transform="translate(241,190)"
        fill="none"
        stroke={color}
        strokeWidth="40"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export default Search;

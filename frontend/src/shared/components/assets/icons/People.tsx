import { SIZE_MAP, SizeType } from './constants';

type Props = {
  size: SizeType;
  color?: string;
};

function People({ size, color = 'black' }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={SIZE_MAP[size]}
      height={SIZE_MAP[size]}
      viewBox="0 0 20 20"
      version="1.1"
    >
      <path
        d="M 0,0 c 0,-49.569 -39.33,-89.753 -87.848,-89.753 -48.516,0 -87.847,40.184 -87.847,89.753 0,49.57 39.331,89.754 87.847,89.754 C -39.33,89.754 0,49.57 0,0 Z"
        transform="translate(257.8604,336.4961)"
        fill="none"
        stroke={color}
        strokeWidth="30"
      />
      <path
        d="M 0,0 c -14.967,0 -26.5,13.786 -23.828,28.833 13.294,74.877 77.435,131.66 154.557,131.66 77.122,0 141.262,-56.783 154.557,-131.66 C 287.957,13.786 276.425,0 261.457,0 Z"
        transform="translate(39.2842,86.25)"
        fill="none"
        stroke={color}
        strokeWidth="30"
      />
      <path
        d="M 0,0 c 0,-38.372 -30.445,-69.479 -68.003,-69.479 -37.557,0 -68.003,31.107 -68.003,69.479 0,38.371 30.446,69.478 68.003,69.478 C -30.445,69.478 0,38.371 0,0 Z"
        transform="translate(445.1309,348.9746)"
        fill="none"
        stroke={color}
        strokeWidth="30"
      />
      <path
        d="M 0,0 c 20.04,40.488 61.138,68.248 108.58,68.248 59.7,0 109.352,-43.955 119.643,-101.918 2.068,-11.647 -6.86,-22.319 -18.446,-22.319 H 43.327"
        transform="translate(268.5479,211.248)"
        fill="none"
        stroke={color}
        strokeWidth="30"
      />
    </svg>
  );
}

export default People;

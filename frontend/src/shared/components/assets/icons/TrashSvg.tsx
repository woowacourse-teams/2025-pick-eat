import { SIZE_MAP, SizeType } from './constants';

type Props = {
  size: SizeType;
} & React.ImgHTMLAttributes<HTMLImageElement>;

function Trash({ size, color }: Props) {
  return (
    <svg
      width={SIZE_MAP[size]}
      height={SIZE_MAP[size]}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_281_4074"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <path d="M0 -1.90735e-06H24V24H0V-1.90735e-06Z" fill="white" />
      </mask>
      <g mask="url(#mask0_281_4074)">
        <path
          d="M18.071 23.2969H5.92892L4.83134 6.93337H19.1687L18.071 23.2969Z"
          stroke={color}
          strokeMiterlimit="10"
        />
      </g>
      <path d="M8.78342 9.68817V17.5864" stroke={color} strokeMiterlimit="10" />
      <path d="M12 9.68817V17.5864" stroke={color} strokeMiterlimit="10" />
      <path d="M15.2166 9.68817V17.5864" stroke={color} strokeMiterlimit="10" />
      <path d="M5.74942 20.3213H18.2506" stroke={color} strokeMiterlimit="10" />
      <mask
        id="mask1_281_4074"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <path d="M0 -1.90735e-06H24V24H0V-1.90735e-06Z" fill="white" />
      </mask>
      <g mask="url(#mask1_281_4074)">
        <path
          d="M20.5823 6.93335H3.41766V5.1543C3.41766 4.33507 4.08179 3.67094 4.90102 3.67094H19.0989C19.9181 3.67094 20.5823 4.33507 20.5823 5.1543V6.93335Z"
          stroke={color}
          strokeMiterlimit="10"
        />
        <path
          d="M10.0613 3.6709V0.703101H13.9386V3.6709"
          stroke={color}
          strokeMiterlimit="10"
        />
        <path
          d="M4.80955 10.0312H3.72824C2.87394 10.0312 2.18137 10.7238 2.18137 11.5781C2.18137 12.4325 2.87394 13.125 3.72824 13.125H5.22487"
          stroke={color}
          strokeMiterlimit="10"
        />
        <path
          d="M19.1904 10.0312H20.2717C21.126 10.0312 21.8186 10.7238 21.8186 11.5781C21.8186 12.4325 21.126 13.125 20.2717 13.125H18.7751"
          stroke={color}
          strokeMiterlimit="10"
        />
      </g>
    </svg>
  );
}

export default Trash;

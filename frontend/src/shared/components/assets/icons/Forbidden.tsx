import { SIZE_MAP, SizeType } from './constants';

type Props = {
  size?: SizeType;
  color?: string;
};

function Forbidden({ size, color }: Props) {
  return (
    <svg
      width={SIZE_MAP[size || 'sm']}
      height={SIZE_MAP[size || 'sm']}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_338_671"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <path d="M0 0H24V24H0V0Z" fill="white" />
      </mask>
      <g mask="url(#mask0_338_671)">
        <path
          d="M19.481 17.0077V17.0076L6.99083 4.51752H6.99078C8.46045 3.52925 10.1893 2.99807 12 2.99807C14.4045 2.99807 16.6651 3.93444 18.3653 5.63464C21.4521 8.72146 21.8236 13.5105 19.481 17.0077ZM12 21.0019C9.59548 21.0019 7.33494 20.0655 5.63469 18.3653C3.93444 16.665 2.99806 14.4045 2.99806 12C2.99806 10.1893 3.5292 8.46041 4.51752 6.99079H4.51747L17.0092 19.4825C15.5395 20.4707 13.8106 21.0019 12 21.0019ZM20.4853 3.51468C15.799 -1.17161 8.201 -1.17161 3.51472 3.51468C-1.17156 8.201 -1.17156 15.799 3.51472 20.4853C8.201 25.1716 15.799 25.1716 20.4853 20.4853C25.1715 15.799 25.1715 8.201 20.4853 3.51468Z"
          fill={color || 'black'}
        />
      </g>
    </svg>
  );
}

export default Forbidden;

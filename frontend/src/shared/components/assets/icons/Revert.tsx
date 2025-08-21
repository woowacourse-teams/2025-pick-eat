import { SIZE_MAP, SizeType } from './constants';

type Props = {
  size?: SizeType;
  color?: string;
};

function Revert({ size, color }: Props) {
  return (
    <svg
      width={SIZE_MAP[size || 'sm']}
      height={SIZE_MAP[size || 'sm']}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_338_681"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <path d="M0 0H24V24H0V0Z" fill="white" />
      </mask>
      <g mask="url(#mask0_338_681)">
        <path
          d="M12 24C8.80814 24 5.79731 22.7398 3.52209 20.4516C1.25086 18.1673 0 15.1492 0 11.9531V11.25H4.21875V11.9531C4.21875 16.1964 7.78214 19.7812 12 19.7812C16.2179 19.7812 19.7812 16.1964 19.7812 11.9531C19.7812 9.3772 18.46 6.96511 16.2958 5.5223L14.4886 7.93181L12.5057 0H20.4375L18.8313 2.14158C20.2786 3.1493 21.4983 4.46728 22.386 5.98959C23.4419 7.80038 24 9.86255 24 11.9531C24 15.1492 22.7491 18.1673 20.4779 20.4516C18.2027 22.7398 15.1919 24 12 24Z"
          fill={color || 'black'}
        />
      </g>
    </svg>
  );
}

export default Revert;

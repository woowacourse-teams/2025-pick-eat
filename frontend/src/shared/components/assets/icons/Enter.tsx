import { SIZE_MAP, SizeType } from './constants';

type Props = {
  size: SizeType;
  color?: string;
};

function Enter({ size, color = 'black' }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      id="svg735"
      width={SIZE_MAP[size]}
      height={SIZE_MAP[size]}
      viewBox="0 0 682.66669 682.66669"
    >
      <defs id="defs739">
        <clipPath clipPathUnits="userSpaceOnUse" id="clipPath749">
          <path d="M 0,512 H 512 V 0 H 0 Z" id="path747" />
        </clipPath>
      </defs>
      <mask id="custom">
        <rect id="bg" x="0" y="0" width="100%" height="100%" fill="white" />
        <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)" />
      </mask>
      <g mask="url(#custom)">
        <g id="g741" transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
          <g id="g743">
            <g id="g745" clipPath="url(#clipPath749)">
              <g id="g751" transform="translate(171,392)">
                <path
                  d="m 0,0 v 60 c 0,22.091 17.909,40 40,40 h 241 c 22.091,0 40,-17.909 40,-40 v -392 c 0,-22.091 -17.909,-40 -40,-40 H 40 c -22.091,0 -40,17.909 -40,40 v 60"
                  fill="none"
                  stroke={color}
                  strokeWidth="30"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  id="path753"
                />
              </g>
              <g id="g755" transform="translate(291,256)">
                <path
                  d="M 0,0 H -271"
                  fill="none"
                  stroke={color}
                  strokeWidth="30"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  id="path757"
                />
              </g>
              <g id="g759" transform="translate(241,190)">
                <path
                  d="M 0,0 66,66 0,132"
                  fill="none"
                  stroke={color}
                  strokeWidth="30"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  id="path761"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Enter;

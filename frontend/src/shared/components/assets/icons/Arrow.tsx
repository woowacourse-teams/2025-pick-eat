import styled from '@emotion/styled';

import { SIZE_MAP, SizeType } from './constants';

type DirectionType = 'up' | 'down' | 'left' | 'right';

const ROTATE_MAP: Record<DirectionType, string> = {
  down: '0deg',
  left: '90deg',
  up: '180deg',
  right: '270deg',
};

type Props = {
  size: SizeType;
  direction: DirectionType;
  color?: string;
};

function Arrow({ size, direction, color = 'black' }: Props) {
  return (
    <Container direction={direction}>
      <svg
        width={SIZE_MAP[size]}
        height={SIZE_MAP[size]}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="화살표 아이콘"
      >
        <path
          d="M4.04019 5.72987L7.86012 9.5498L11.6801 5.72987"
          stroke={color}
          strokeWidth="1.32867"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Container>
  );
}

const Container = styled.div<{ direction: DirectionType }>`
  display: flex;
  justify-content: center;
  align-items: center;

  transition: 0.3s;
  rotate: ${({ direction }) => ROTATE_MAP[direction]};
`;

export default Arrow;

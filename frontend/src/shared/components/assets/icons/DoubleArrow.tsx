import styled from '@emotion/styled';

import { SIZE_MAP, SizeType } from './constants';

type DirectionType = 'up' | 'down' | 'left' | 'right';

const ROTATE_MAP: Record<DirectionType, string> = {
  right: '0deg',
  down: '90deg',
  left: '180deg',
  up: '270deg',
};

type Props = {
  size: SizeType;
  direction: DirectionType;
  color?: string;
};

function DoubleArrow({ size, direction, color = 'black' }: Props) {
  return (
    <Container direction={direction}>
      <svg
        width={SIZE_MAP[size]}
        height={SIZE_MAP[size]}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.66666 12.4445L8.06402 9.03564C8.66762 8.65442 8.68883 7.78169 8.10444 7.3716L2.66666 3.55563"
          stroke={color}
          strokeLinecap="round"
        />
        <path
          d="M8 12.4445L13.3974 9.03564C14.001 8.65441 14.0222 7.78169 13.4378 7.3716L8.00001 3.55563"
          stroke={color}
          strokeLinecap="round"
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

export default DoubleArrow;

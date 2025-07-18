import styled from '@emotion/styled';

import { SIZE_MAP, SizeType } from './constants';

interface ArrowProps {
  size: SizeType;
  direction: DirectionType;
}
type DirectionType = 'up' | 'down' | 'left' | 'right';

const ROTATE_MAP: Record<DirectionType, string> = {
  down: '0deg',
  left: '90deg',
  up: '180deg',
  right: '270deg',
};

function Arrow({ size, direction }: ArrowProps) {
  return (
    <Container direction={direction}>
      <img
        src="./images/arrow.svg"
        alt="화살표 아이콘"
        width={SIZE_MAP[size]}
      />
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

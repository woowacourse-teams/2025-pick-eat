import styled from '@emotion/styled';

import { SIZE_MAP, SizeType } from './constants';

type Props = {
  size: SizeType;
  activate?: boolean;
};

function ActivateCircle({ size, activate = false }: Props) {
  return (
    <S.Container
      width={SIZE_MAP[size]}
      color={activate ? '#39D26C' : '#DE3412'}
    />
  );
}

export default ActivateCircle;

const S = {
  Container: styled.div<{ width: string; color: string }>`
    width: ${({ width }) => width}px;
    height: ${({ width }) => width}px;
    background-color: ${({ color }) => color};
    border-radius: 100%;
  `,
};

import styled from '@emotion/styled';
import { ComponentProps, ReactNode } from 'react';

import NewButton from './NewButton';

type Props = {
  size?: 'sm' | 'lg';
  children?: ReactNode;
} & ComponentProps<'button'>;

function FixedButton({ children, ...props }: Props) {
  return (
    <S.Container>
      <NewButton {...props}>{children}</NewButton>
    </S.Container>
  );
}

export default FixedButton;

const S = {
  Container: styled.div`
    width: 100%;
    height: fit-content;
    ${({ theme }) => theme.POSITION.fixedCenter};
    bottom: calc(
      env(safe-area-inset-bottom) + ${({ theme }) => theme.PADDING.p6}
    );

    padding: 0 ${({ theme }) => theme.PADDING.p5};
  `,
};

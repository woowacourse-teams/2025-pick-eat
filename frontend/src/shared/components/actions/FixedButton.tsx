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
    max-width: 480px;
    height: fit-content;
    position: fixed;
    bottom: calc(
      env(safe-area-inset-bottom) + ${({ theme }) => theme.PADDING.p6}
    );
    left: 50%;
    z-index: ${({ theme }) => theme.Z_INDEX.fixed};

    padding: 0 ${({ theme }) => theme.PADDING.p5};
    transform: translateX(-50%);
  `,
};

import Header from '@widgets/Header';

import ToastProvider from '@provider/ToastProvider';

import styled from '@emotion/styled';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  return (
    <S.Container>
      <S.Wrapper>
        <ToastProvider>
          <Header />
          {children}
        </ToastProvider>
      </S.Wrapper>
    </S.Container>
  );
}

export default Layout;

const S = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
  `,
  Wrapper: styled.div`
    width: 100%;
    max-width: ${({ theme }) => theme.LAYOUT.maxWidth};
    min-height: 100vh;

    background-color: ${({ theme }) => theme.PALETTE.gray[5]};
  `,
};

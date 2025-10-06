import ToastProvider from '@provider/ToastProvider';

import styled from '@emotion/styled';
import { ReactNode } from 'react';

import Header from '../../../widgets/Header';

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  return (
    <Container>
      <Wrapper>
        <ToastProvider>
          <Header />
          {children}
        </ToastProvider>
      </Wrapper>
    </Container>
  );
}

export default Layout;

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;

  background-color: ${({ theme }) => theme.PALETTE.gray[5]};
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 768px;

  background-color: ${({ theme }) => theme.PALETTE.gray[0]};
`;

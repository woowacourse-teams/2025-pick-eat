import styled from '@emotion/styled';
import { ReactNode } from 'react';

import Header from './Header';

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  return (
    <Container>
      <Wrapper>
        <Header />
        {children}
      </Wrapper>
    </Container>
  );
}

export default Layout;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  justify-content: center;

  background-color: ${({ theme }) => theme.PALLETE.gray[5]};
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 768px;

  background-color: ${({ theme }) => theme.PALLETE.gray[0]};
`;

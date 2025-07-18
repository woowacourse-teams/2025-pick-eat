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
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.PALLETE.gray[5]};
`;

const Wrapper = styled.div`
  max-width: 768px;
  width: 100%;
  background-color: ${({ theme }) => theme.PALLETE.gray[0]};
`;

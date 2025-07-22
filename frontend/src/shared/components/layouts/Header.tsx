import Hamburger from '@components/assets/icons/Hamburger';
import Logo from '@components/assets/identity/Logo';

import styled from '@emotion/styled';

export const HEADER_HEIGHT = '72px';

function Header() {
  return (
    <Container>
      <Logo />
      <Hamburger size="lg" />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: ${HEADER_HEIGHT};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;

  z-index: ${({ theme }) => theme.Z_INDEX.sticky};

  padding: ${({ theme }) => theme.PADDING.p5};

  background-color: ${({ theme }) => theme.PALLETE.gray[0]};
  border-bottom: solid 1px ${({ theme }) => theme.PALLETE.gray[20]};
`;

export default Header;

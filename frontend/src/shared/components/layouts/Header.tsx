import Hamburger from '@components/assets/icons/Hamburger';
import Logo from '@components/assets/identity/Logo';
import styled from '@emotion/styled';

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
  height: 72px;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: ${({ theme }) => theme.PALLETE.gray[0]};
  border-bottom: solid 1px ${({ theme }) => theme.PALLETE.gray[20]};
`;

export default Header;

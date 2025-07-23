import Hamburger from '@components/assets/icons/Hamburger';
import Logo from '@components/assets/identity/Logo';

import { ROUTE_PATH } from '@routes/routePath';

import styled from '@emotion/styled';
import { useNavigate } from 'react-router';

export const HEADER_HEIGHT = '72px';

function Header() {
  const navigate = useNavigate();
  return (
    <S.Container>
      <S.LogoWrapper onClick={() => navigate(ROUTE_PATH.HOME)}>
        <Logo />
      </S.LogoWrapper>
      <Hamburger size="lg" />
    </S.Container>
  );
}
const S = {
  Container: styled.div`
    width: 100%;
    height: ${HEADER_HEIGHT};
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;

    z-index: ${({ theme }) => theme.Z_INDEX.sticky};

    padding: ${({ theme }) => theme.PADDING.p5};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    border-bottom: solid 1px ${({ theme }) => theme.PALETTE.gray[20]};
  `,

  LogoWrapper: styled.button`
    width: 80px;
  `,
};

export default Header;

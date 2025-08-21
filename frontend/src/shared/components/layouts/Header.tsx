import Logo from '@components/assets/identity/Logo';

import { useAuth } from '@domains/login/context/AuthProvider';

import { useGA } from '@hooks/useGA';

import { ROUTE_PATH } from '@routes/routePath';

import styled from '@emotion/styled';
import { useNavigate } from 'react-router';

export const HEADER_HEIGHT = '72px';

function Header() {
  const navigate = useNavigate();
  const { loggedIn, logoutUser } = useAuth();
  const handleLogoClick = () => {
    useGA().useGAEventTrigger({
      action: 'click',
      category: 'button',
      label: '로고 클릭',
      value: 1,
    });
    navigate(ROUTE_PATH.MAIN);
  };

  const handleProfileClick = () => {
    navigate(ROUTE_PATH.MY_PAGE);
  };

  const handleLoginClick = () => {
    navigate(ROUTE_PATH.LOGIN);
  };

  return (
    <S.Container>
      <S.LogoWrapper onClick={handleLogoClick}>
        <Logo />
      </S.LogoWrapper>
      <S.ButtonWrapper>
        {loggedIn && (
          <S.TextButton onClick={handleProfileClick}>마이페이지</S.TextButton>
        )}
        {loggedIn ? (
          <S.LoginButton onClick={logoutUser}>로그아웃</S.LoginButton>
        ) : (
          <S.LoginButton onClick={handleLoginClick}>
            로그인/회원가입
          </S.LoginButton>
        )}
      </S.ButtonWrapper>
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
  ButtonWrapper: styled.div`
    display: flex;
    gap: ${({ theme }) => theme.GAP.level4};
  `,
  TextButton: styled.button`
    border: none;

    background: none;

    color: ${({ theme }) => theme.PALETTE.gray[50]};
    font: ${({ theme }) => theme.FONTS.body.small_bold};
    cursor: pointer;
  `,
  LoginButton: styled.button`
    border: none;

    background: none;

    color: ${({ theme }) => theme.PALETTE.gray[50]};
    font: ${({ theme }) => theme.FONTS.body.small_bold};
    cursor: pointer;
  `,
};

export default Header;

import { useAuth } from '@domains/login/context/AuthProvider';

import { useGA } from '@hooks/useGA';

import { ROUTE_PATH } from '@routes/routePath';

import styled from '@emotion/styled';
import { useNavigate } from 'react-router';

export const HEADER_HEIGHT = '60px';

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
      <S.LogoWrapper onClick={handleLogoClick}>PICKEAT</S.LogoWrapper>
      <S.ButtonWrapper>
        {loggedIn ? (
          <>
            <S.TextButton onClick={handleProfileClick}>내 방 보기</S.TextButton>
            <S.VerticalDivider>|</S.VerticalDivider>
            <S.LoginButton onClick={logoutUser}>로그아웃</S.LoginButton>
          </>
        ) : (
          <S.LoginButton onClick={handleLoginClick}>로그인</S.LoginButton>
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
    backdrop-filter: blur(12px) saturate(180%);
    box-shadow: inset 0 -1px 1px 1px rgb(255 255 255 / 50%);
  `,
  LogoWrapper: styled.button`
    color: ${({ theme }) => theme.PALETTE.gray[95]};
    font-size: 18px;
    font-weight: 800;
  `,
  ButtonWrapper: styled.div`
    display: flex;
    gap: ${({ theme }) => theme.GAP.level3};
  `,
  TextButton: styled.button`
    border: none;

    background: none;

    color: ${({ theme }) => theme.PALETTE.gray[95]};
    font: ${({ theme }) => theme.FONTS.body.small};
    cursor: pointer;
  `,

  VerticalDivider: styled.p`
    color: ${({ theme }) => theme.PALETTE.gray[95]};
    font: ${({ theme }) => theme.FONTS.body.medium};
  `,

  LoginButton: styled.button`
    border: none;

    background: none;

    color: ${({ theme }) => theme.PALETTE.gray[95]};
    font: ${({ theme }) => theme.FONTS.body.small};
    cursor: pointer;
  `,
};

export default Header;

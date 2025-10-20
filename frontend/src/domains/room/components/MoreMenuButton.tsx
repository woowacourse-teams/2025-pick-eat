import More from '@components/assets/icons/More';

import { roomQuery } from '@apis/room';

import { useBoolean } from '@hooks/useBoolean';

import { ROUTE_PATH } from '@routes/routePath';

import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

// TODO : 코드 리팩토링

function MoreMenuButton() {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');

  const navigate = useNavigate();
  const [opened, , , toggle] = useBoolean(false);
  const { mutate: exitRoom } = roomQuery.useExitRoom({
    onExit: () => {
      navigate(ROUTE_PATH.MY_PAGE);
    },
  });
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('button')) {
      if (opened) {
        toggle();
      }
    }
  };
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && opened) {
      toggle();
    }
  };

  const handleExitButtonClick = () => {
    exitRoom(Number(roomId));
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [opened]);

  return (
    <>
      <S.Container onClick={toggle}>
        <More size="lg" />
      </S.Container>
      {opened && (
        <S.MenuWrapper>
          <S.Menu onClick={handleExitButtonClick}>방 나가기</S.Menu>
        </S.MenuWrapper>
      )}
    </>
  );
}

export default MoreMenuButton;

const S = {
  Container: styled.button`
    position: relative;
  `,
  MenuWrapper: styled.ul`
    position: absolute;
    width: 120px;
    top: 36px;
    right: 0;
    background-color: ${({ theme }) => theme.PALETTE.gray[80]};
    border-radius: ${({ theme }) => theme.RADIUS.small};
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.level1};
    padding: ${({ theme }) => theme.PADDING.p2};
    z-index: ${({ theme }) => theme.Z_INDEX.tooltip};
  `,
  Menu: styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: ${({ theme }) => theme.GAP.level1};

    padding: ${({ theme }) => theme.PADDING.px3};
    cursor: pointer;

    border-radius: ${({ theme }) => theme.RADIUS.small};

    font: ${({ theme }) => theme.FONTS.body.xsmall_bold};
    color: ${({ theme }) => theme.PALETTE.red[40]};
  `,
};

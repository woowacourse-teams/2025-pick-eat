import More from '@components/assets/icons/More';

import { useBoolean } from '@hooks/useBoolean';

import styled from '@emotion/styled';
import { useEffect } from 'react';

import ExitRoomButton from './ExitRoomButton';

// TODO : 코드 리팩토링

function MoreMenuButton() {
  const [opened, , , toggleDropdown] = useBoolean(false);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('button')) {
      if (opened) {
        toggleDropdown();
      }
    }
  };
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && opened) {
      toggleDropdown();
    }
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
      <S.Container onClick={toggleDropdown}>
        <More size="lg" />
      </S.Container>
      {opened && (
        <S.MenuWrapper>
          <S.Menu>
            <ExitRoomButton />
          </S.Menu>
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
    width: 120px;
    position: absolute;
    top: 36px;
    right: 0;
    z-index: ${({ theme }) => theme.Z_INDEX.dropdown};

    padding: ${({ theme }) => theme.PADDING.p2};

    background-color: ${({ theme }) => theme.PALETTE.gray[80]};
    border-radius: ${({ theme }) => theme.RADIUS.small};
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.level1};
  `,
  Menu: styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: ${({ theme }) => theme.GAP.level1};

    font: ${({ theme }) => theme.FONTS.body.xsmall_bold};

    border-radius: ${({ theme }) => theme.RADIUS.small};

    cursor: pointer;
  `,
};

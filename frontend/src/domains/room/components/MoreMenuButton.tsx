import More from '@components/assets/icons/More';

import { useBoolean } from '@hooks/useBoolean';

import styled from '@emotion/styled';

function MoreMenuButton() {
  const [opened, , , toggle] = useBoolean(false);

  return (
    <S.Container onClick={toggle}>
      <More size="lg" />
      {opened && (
        <S.MenuWrapper>
          <S.Menu>방 나가기</S.Menu>
        </S.MenuWrapper>
      )}
    </S.Container>
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
    gap: ${({ theme }) => theme.GAP.level1};

    padding: ${({ theme }) => theme.PADDING.px3};
    cursor: pointer;

    border-radius: ${({ theme }) => theme.RADIUS.small};

    font: ${({ theme }) => theme.FONTS.body.xsmall_bold};
    color: ${({ theme }) => theme.PALETTE.red[40]};
  `,
};

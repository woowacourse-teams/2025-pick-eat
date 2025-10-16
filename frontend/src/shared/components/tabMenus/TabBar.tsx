import styled from '@emotion/styled';

type Props = {
  tabs: string[];
  selectedIndex: number;
  onTabClick: (index: number) => void;
};

function TabBar({ tabs, selectedIndex, onTabClick }: Props) {
  return (
    <S.Container>
      {tabs.map((tab, index) => (
        <S.TabItem
          key={index}
          onClick={() => onTabClick(index)}
          isActive={index === selectedIndex}
        >
          <S.TabLabel isActive={index === selectedIndex}>{tab}</S.TabLabel>
        </S.TabItem>
      ))}
    </S.Container>
  );
}

export default TabBar;

const S = {
  Container: styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    position: relative;

    padding: ${({ theme }) => theme.PADDING.p3};

    background-color: ${({ theme }) => theme.PALETTE.gray[0]};
    border-radius: ${({ theme }) => theme.RADIUS.large};
    box-shadow: ${({ theme }) => theme.BOX_SHADOW.level1};
    cursor: pointer;
  `,
  TabItem: styled.button<{ isActive: boolean }>`
    height: 48px;
    display: flex;
    flex: 1 0 0;
    justify-content: center;
    align-items: center;

    padding: ${({ theme }) => theme.PADDING.p3};

    background-color: ${({ isActive, theme }) =>
      isActive ? theme.PALETTE.primary[50] : theme.PALETTE.gray[0]};

    border-radius: ${({ theme }) => theme.RADIUS.large};
  `,
  TabContent: styled.div`
    width: 100%;
    height: 100%;
  `,
  TabLabel: styled.p<{ isActive: boolean }>`
    color: ${({ isActive, theme }) =>
      isActive ? theme.PALETTE.gray[95] : theme.PALETTE.gray[40]};
    font: ${({ theme }) => theme.FONTS.heading.small};
  `,
};

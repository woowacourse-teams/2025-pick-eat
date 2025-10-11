import styled from '@emotion/styled';

type Props = {
  tabs: string[];
  selectedIndex: number;
  onTabClick: (index: number) => void;
};

function TabBar({ tabs, selectedIndex, onTabClick }: Props) {
  const tabCount = tabs?.length ?? 0;

  return (
    <S.Container>
      {tabs.map((tab, index) => (
        <S.TabItem
          key={index}
          onClick={() => onTabClick(index)}
          tabCount={tabCount}
          isActive={index === selectedIndex}
        >
          <S.TabContent>
            <S.TabLabel isActive={index === selectedIndex}>
              <p>{tab}</p>
            </S.TabLabel>
          </S.TabContent>
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
  TabItem: styled.button<{ tabCount: number; isActive: boolean }>`
    height: 48px;
    flex: 1 0 0;
    z-index: 1;

    padding: ${({ theme }) => theme.PADDING.p3};

    background-color: ${({ isActive, theme }) =>
      isActive ? theme.PALETTE.primary[50] : theme.PALETTE.gray[0]};

    border-radius: ${({ theme }) => theme.RADIUS.large};
  `,
  TabContent: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  TabLabel: styled.div<{ isActive: boolean }>`
    color: ${({ isActive, theme }) =>
      isActive ? theme.PALETTE.gray[95] : theme.PALETTE.gray[40]};
    font: ${({ theme }) => theme.FONTS.heading.small};
  `,
};

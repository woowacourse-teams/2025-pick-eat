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
        <S.TabItem key={index} onClick={() => onTabClick(index)}>
          <S.TabContent>
            <S.TabLabel isActive={index === selectedIndex}>
              <p>{tab}</p>
            </S.TabLabel>
          </S.TabContent>
        </S.TabItem>
      ))}
      {tabCount > 0 && (
        <S.Indicator tabCount={tabCount} activeTab={selectedIndex} />
      )}
    </S.Container>
  );
}

export default TabBar;

const S = {
  Container: styled.button`
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;

    padding: 0;
    cursor: pointer;
  `,
  TabItem: styled.div`
    min-width: 80px;
    height: 56px;
    min-height: 1px;
    flex: 1 0 0;
    border-bottom: 2px solid ${({ theme }) => theme.PALLETE.gray[30]};
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
      isActive ? theme.PALLETE.primary[70] : theme.PALLETE.gray[40]};
    font: ${({ theme }) => theme.FONTS.body.large_bold};
  `,
  Indicator: styled.div<{ tabCount: number; activeTab: number }>`
    height: 4px;
    position: absolute;
    bottom: 0;

    background-color: ${({ theme }) => theme.PALLETE.primary[50]};

    transition: all 0.2s cubic-bezier(0.19, 0.85, 0.66, 0.99);
    ${({ tabCount, activeTab }) =>
      tabCount > 0 &&
      `
        width: ${100 / tabCount}%;
        left: ${(activeTab * 100) / tabCount}%;
      `};
  `,
};

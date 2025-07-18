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
    display: flex;
    padding: 0;
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;
  `,
  TabItem: styled.div`
    flex-basis: 0;
    flex-grow: 1;
    height: 56px;
    min-height: 1px;
    min-width: 80px;
    flex-shrink: 0;
    border-bottom: 2px solid ${({ theme }) => theme.PALLETE.gray[30]};
  `,
  TabContent: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  `,
  TabLabel: styled.div<{ isActive: boolean }>`
    ${({ theme }) => theme.TYPOGRAPHY.body.large_bold}
    color: ${({ isActive, theme }) =>
      isActive ? theme.PALLETE.primary[70] : theme.PALLETE.gray[40]};
  `,
  Indicator: styled.div<{ tabCount: number; activeTab: number }>`
    position: absolute;
    bottom: 0;
    height: 4px;
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

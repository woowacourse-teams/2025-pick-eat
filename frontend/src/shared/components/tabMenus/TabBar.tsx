import styled from '@emotion/styled';
import { useState } from 'react';

interface Props {
  tabs?: string[];
}

function TabBar({ tabs }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const tabCount = tabs?.length ?? 0;

  return (
    <S.Container>
      {(tabs ?? []).map((tab, index) => (
        <S.TabItem
          key={index}
          isActive={index === activeTab}
          onClick={() => setActiveTab(index)}
        >
          <S.TabContent>
            <S.TabInner>
              <S.TabLabel isActive={index === activeTab}>
                <p>{tab}</p>
              </S.TabLabel>
            </S.TabInner>
          </S.TabContent>
        </S.TabItem>
      ))}
      {tabCount > 0 && (
        <S.Indicator tabCount={tabCount} activeTab={activeTab} />
      )}
    </S.Container>
  );
}

export default TabBar;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 0;
    position: relative;
    width: 100%;
    height: 100%;
  `,
  TabItem: styled.button<{ isActive: boolean }>`
    flex-basis: 0;
    flex-grow: 1;
    height: 56px;
    min-height: 1px;
    min-width: 80px;
    position: relative;
    flex-shrink: 0;
    cursor: pointer;
    border-bottom: 2px solid ${({ theme }) => theme.PALLETE.gray[30]};
  `,
  TabContent: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 100%;
  `,
  TabInner: styled.div`
    display: flex;
    flex-direction: row;
    height: 56px;
    align-items: center;
    justify-content: center;
    padding: 0 8px;
    position: relative;
    width: 100%;
  `,
  TabLabel: styled.div<{ isActive: boolean }>`
    ${({ theme }) => theme.TYPOGRAPHY.body.large_bold}
    color: ${props =>
      props.isActive
        ? ({ theme }) => theme.PALLETE.primary[70]
        : ({ theme }) => theme.PALLETE.gray[40]};
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

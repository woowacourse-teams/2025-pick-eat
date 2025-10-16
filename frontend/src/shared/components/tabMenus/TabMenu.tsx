import styled from '@emotion/styled';
import { useState } from 'react';

import TabBar from './TabBar';
import TabContent from './TabContent';

type TabData = { tab: string; content: React.ReactNode }[];

type Props = {
  tabData: TabData;
  style?: React.CSSProperties;
  TabBarContainer?: React.ComponentType<{ children: React.ReactNode }>;
  TabContentContainer?: React.ComponentType<{ children: React.ReactNode }>;
  overflowHidden?: boolean;
};

function TabMenu({
  tabData,
  style,
  TabBarContainer = S.DefaultTabBarContainer,
  TabContentContainer = S.DefaultTabContentContainer,
  overflowHidden = true,
}: Props) {
  const [currentTab, setCurrentTab] = useState(0);

  const tabs = tabData.map(d => d.tab);
  const tabContents = tabData.map(d => d.content);

  const handleTabClick = (index: number) => {
    setCurrentTab(index);
  };

  return (
    <S.Container style={style}>
      <TabBarContainer>
        <TabBar
          tabs={tabs}
          selectedIndex={currentTab}
          onTabClick={handleTabClick}
        />
      </TabBarContainer>
      <TabContentContainer>
        <TabContent
          selectedIndex={currentTab}
          tabContents={tabContents}
          overflowHidden={overflowHidden}
        />
      </TabContentContainer>
    </S.Container>
  );
}

export default TabMenu;

const S = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  `,
  DefaultTabBarContainer: styled.div``,
  DefaultTabContentContainer: styled.div``,
};

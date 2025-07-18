import styled from '@emotion/styled';
import { useState } from 'react';
import TabBar from './TabBar';
import TabContent from './TabContent';

type TabData = { tab: string; content: React.ReactNode }[];

type Props = {
  tabData: TabData;
};

function TabMenu({ tabData }: Props) {
  const [currentTab, setCurrentTab] = useState(0);

  const tabs = tabData.map(d => d.tab);
  const tabContents = tabData.map(d => d.content);

  const handleTabClick = (index: number) => {
    setCurrentTab(index);
  };

  return (
    <S.Container>
      <TabBar
        tabs={tabs}
        selectedIndex={currentTab}
        onTabClick={handleTabClick}
      />
      <TabContent selectedIndex={currentTab} tabContents={tabContents} />
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
};

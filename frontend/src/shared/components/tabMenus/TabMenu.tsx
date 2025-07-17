import styled from '@emotion/styled';
import { useState } from 'react';
import TabBar from './TabBar';
import TabContent from './TabContent';

interface Props {
  tabs?: string[];
  initialTab?: number;
  tabContents: React.ReactNode[];
}

function TabMenu({ tabs, tabContents, initialTab = 0 }: Props) {
  const [currentTab, setCurrentTab] = useState(initialTab);
  return (
    <S.Container>
      <TabBar
        tabs={tabs}
        selectedIndex={currentTab}
        onTabClick={setCurrentTab}
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

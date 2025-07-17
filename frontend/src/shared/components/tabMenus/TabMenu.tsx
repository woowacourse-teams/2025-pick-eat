import styled from '@emotion/styled';
import { useState } from 'react';
import TabBar from './TabBar';
import TabContent from './TabContent';

interface Props {
  tabs?: string[];
  activeTab: number;
  tabContents: React.ReactNode[];
}

function TabMenu({ tabs, activeTab, tabContents }: Props) {
  const [currentTab, setCurrentTab] = useState(activeTab);
  return (
    <S.Container>
      <TabBar tabs={tabs} />
      <TabContent activeTab={activeTab} tabContents={tabContents} />
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

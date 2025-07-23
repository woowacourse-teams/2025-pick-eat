import TabMenu from './TabMenu';

import type { Meta, StoryObj } from '@storybook/react';

const tabData = [
  { tab: '한식', content: <div>한식 내용</div> },
  { tab: '중식', content: <div>중식 내용</div> },
  { tab: '일식', content: <div>일식 내용</div> },
  { tab: '양식', content: <div>양식 내용</div> },
  { tab: '기타', content: <div>기타 내용</div> },
];

const LargeTabData = [
  {
    tab: '작은',
    content: (
      <div style={{ height: '100px', backgroundColor: '#eeeeee' }}>땅땅</div>
    ),
  },
  {
    tab: '짱큰',
    content: (
      <div style={{ height: '1000px', backgroundColor: '#dddddd' }}>땅땅땅</div>
    ),
  },
  { tab: '글씨', content: <div>땅땅땅땅</div> },
];

const meta: Meta<typeof TabMenu> = {
  title: 'Tab/TabMenu',
  component: TabMenu,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof TabMenu>;

export const Default: Story = {
  args: {
    tabData,
  },
  render: args => <TabMenu {...args} />,
};

export const LargeContent: Story = {
  args: {
    tabData: LargeTabData,
  },
  render: args => <TabMenu {...args} />,
};

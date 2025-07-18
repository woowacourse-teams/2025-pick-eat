import TabMenu from './TabMenu';

import type { Meta, StoryObj } from '@storybook/react';

const tabData = [
  { tab: '한식', content: <div>한식 내용</div> },
  { tab: '중식', content: <div>중식 내용</div> },
  { tab: '일식', content: <div>일식 내용</div> },
  { tab: '양식', content: <div>양식 내용</div> },
  { tab: '기타', content: <div>기타 내용</div> },
];

const meta: Meta<typeof TabMenu> = {
  title: 'shared/components/TabMenu',
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

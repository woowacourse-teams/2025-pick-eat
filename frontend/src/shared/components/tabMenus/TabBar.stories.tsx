import TabBar from './TabBar';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TabBar> = {
  title: 'Tab/TabBar',
  component: TabBar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TabBar>;
export default meta;

type Story = StoryObj<typeof TabBar>;

const defaultTabs = ['탭 1', '탭 2', '탭 3'];

export const Default: Story = {
  args: {
    tabs: defaultTabs,
  },
  render: args => <TabBar {...args} />,
};

export const LongTabs: Story = {
  args: {
    tabs: ['짧은 탭', '중간 길이의 탭', '일이삼사오', 'Another TabBar'],
  },
  render: args => <TabBar {...args} />,
};

export const NoTabs: Story = {
  args: {},
  render: args => <TabBar {...args} />,
};

export const ManyTabs: Story = {
  args: {
    tabs: Array.from({ length: 8 }, (_, i) => `tab ${i + 1}`),
  },
  render: args => <TabBar {...args} />,
};

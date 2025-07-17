import type { Meta, StoryObj } from '@storybook/react';
import TabMenu from './TabMenu';

const tabs = ['탭 1', '탭 2', '탭 3'];

const tabContents = [
  <div>Content for Tab 1</div>,
  <div>Content for Tab 2</div>,
  <div>Content for Tab 3</div>,
];

const meta: Meta<typeof TabMenu> = {
  title: 'shared/components/TabMenu',
  component: TabMenu,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TabMenu>;
export default meta;

type Story = StoryObj<typeof TabMenu>;

export const Default: Story = {
  args: {
    tabs: tabs,
    activeTab: 1,
    tabContents: tabContents,
  },
  render: args => <TabMenu {...args} />,
};

import TabContent from './TabContent';

import type { Meta, StoryObj } from '@storybook/react';

const tabContents = [
  <div key="1">Content for Tab 1</div>,
  <div key="2">Content for Tab 2</div>,
  <div key="3">Content for Tab 3</div>,
];

const meta: Meta<typeof TabContent> = {
  title: 'Tab/TabContent',
  component: TabContent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TabContent>;
export default meta;

type Story = StoryObj<typeof TabContent>;

export const Default: Story = {
  args: {
    selectedIndex: 1,
    tabContents: tabContents,
  },
  render: args => <TabContent {...args} />,
};

export const Long: Story = {
  args: {
    selectedIndex: 1,
    tabContents: tabContents,
  },
  render: args => <TabContent {...args} />,
};

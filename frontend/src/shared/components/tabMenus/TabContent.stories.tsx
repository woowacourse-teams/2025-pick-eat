import type { Meta, StoryObj } from '@storybook/react';
import TabContent from './TabContent';

const tabContents = [
  <div>Content for Tab 1</div>,
  <div>Content for Tab 2</div>,
  <div>Content for Tab 3</div>,
];

const meta: Meta<typeof TabContent> = {
  title: 'shared/components/TabContent',
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

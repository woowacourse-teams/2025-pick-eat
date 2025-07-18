import type { Meta, StoryObj } from '@storybook/react';
import RestaurantItem from './RestaurantItem';
import { link } from 'fs';

const meta: Meta<typeof RestaurantItem> = {
  title: 'domains/restaurant/components/RestaurantItem',
  component: RestaurantItem,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RestaurantItem>;
export default meta;

type Story = StoryObj<typeof RestaurantItem>;

const defaultTabs = ['탭 1', '탭 2', '탭 3'];

export const Default: Story = {
  args: {
    name: '피양콩할마니',
    description: '이 식당은 정말 맛있습니다.',
    category: 'korean',
    link: 'https://example.com/restaurant',
    walkInfo: 5,
  },
  render: args => <RestaurantItem {...args} />,
};

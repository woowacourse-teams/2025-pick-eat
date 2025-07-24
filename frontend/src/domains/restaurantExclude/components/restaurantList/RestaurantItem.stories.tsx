import { RestaurantExcludeProvider } from '../../context/RestaurantExcludeProvider';

import RestaurantItem from './RestaurantItem';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof RestaurantItem> = {
  title: 'Restaurant/RestaurantItem',
  component: RestaurantItem,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <RestaurantExcludeProvider>
        <Story />
      </RestaurantExcludeProvider>
    ),
  ],
} satisfies Meta<typeof RestaurantItem>;

export default meta;

type Story = StoryObj<typeof RestaurantItem>;

export const Default: Story = {
  args: {
    id: '1',
    name: '육회바른연어 잠실점',
    category: '고기',
    placeUrl:
      'https://map.naver.com/p/entry/place/1993372144?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202507190141&locale=ko&svcName=map_pcv5',
    distance: 500,
  },
  render: args => <RestaurantItem {...args} />,
};

export const LongTitle: Story = {
  args: {
    id: '2',
    name: '일이삼사오육칠팔구십일이삼사오육칠팔',
    category: '샌드위치',
    placeUrl:
      'https://map.naver.com/p/entry/place/1993372144?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202507190141&locale=ko&svcName=map_pcv5',
    distance: 300,
  },
  render: args => <RestaurantItem {...args} />,
};

import { Restaurant } from '@apis/restaurant';

import { RestaurantExcludeProvider } from '../context/RestaurantExcludeProvider';

import RestaurantList from './RestaurantList';

import type { Meta, StoryObj } from '@storybook/react';

const restaurantListData = [
  {
    id: '1',
    name: '맛있는 한식당',
    category: '한식',
    distance: 500,
    roadAddressName: '서울시 강남구 역삼동 123-45',
  },
  {
    id: '2',
    name: '피양콩할마니 본점',
    category: '콩국수',
    link: 'https://example.com/restaurant2',
    distance: 300,
    roadAddressName: '서울시 강남구 역삼동 67-89',
  },
  {
    id: '3',
    name: '강강술래 잠실점',
    category: '소갈비',
    link: 'https://example.com/restaurant1',
    distance: 500,
    roadAddressName: '서울시 강남구 역삼동 123-45',
  },
  {
    id: '4',
    name: '이태리 부대찌개 잠실점',
    category: '찌개',
    link: 'https://example.com/restaurant2',
    distance: 300,
    roadAddressName: '서울시 강남구 역삼동 67-89',
  },
  {
    id: '5',
    name: '놀부부대찌개 송파점',
    category: '한식',
    link: 'https://example.com/restaurant1',
    distance: 500,
    roadAddressName: '서울시 강남구 역삼동 123-45',
  },
  {
    id: '6',
    name: '육회바른연어 잠실점',
    category: '고기',
    link: 'https://example.com/restaurant2',
    distance: 300,
    roadAddressName: '서울시 강남구 역삼동 67-89',
  },
] as Restaurant[];

const meta: Meta<typeof RestaurantList> = {
  title: 'Restaurant/RestaurantList',
  component: RestaurantList,
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
} satisfies Meta<typeof RestaurantList>;
export default meta;

type Story = StoryObj<typeof RestaurantList>;

export const Mobile: Story = {
  args: {
    restaurantList: restaurantListData,
  },
  render: args => (
    <div style={{ width: '375px' }}>
      <RestaurantList {...args} />
    </div>
  ),
};

export const Tablet: Story = {
  args: {
    restaurantList: restaurantListData,
  },
  render: args => (
    <div style={{ width: '768px' }}>
      <RestaurantList {...args} />
    </div>
  ),
};

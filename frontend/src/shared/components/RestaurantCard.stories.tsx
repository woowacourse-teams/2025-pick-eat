import { Restaurant } from '@apis/restaurant';

import RestaurantCard from './RestaurantCard';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof RestaurantCard> = {
  component: RestaurantCard,
  title: 'RestaurantCard',
};

export default meta;

type Story = StoryObj<typeof RestaurantCard>;

export const Default: Story = {
  render: () => {
    const RESTAURANT_MOCK_DATA: Restaurant = {
      id: 29474,
      name: '두촌가마솥밥 잠실홈플러스점',
      category: '한식',
      tags: ['고등', '쭈꾸미', '돼지갈비', '솥밥'], // string[]으로 추론됨
      distance: null,
      placeUrl: 'https://place.map.kakao.com/1588040520',
      roadAddressName: '서울 송파구 올림픽로35가길 16 홈플러스 1층',
      likeCount: 0,
      isExcluded: false,
      pictureUrls: [
        'https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/pickeat/wish_images/prod_images/jamsil_campus/gongdan.jpg',
        'https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/pickeat/wish_images/prod_images/jamsil_campus/DuchonCauldronRice.jpeg',
      ],
      type: 'WISH',
      isLiked: false,
    };

    return <RestaurantCard restaurantData={RESTAURANT_MOCK_DATA} />;
  },
};

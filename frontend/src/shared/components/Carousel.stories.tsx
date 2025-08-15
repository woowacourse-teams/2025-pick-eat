import Carousel from './Carousel';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Carousel> = {
  component: Carousel,
  title: 'Carousel',
};

export default meta;

type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  render: () => {
    const WISHLIST_MOCK_DATA = [
      { id: 1, name: '랜디' },
      { id: 2, name: '에드' },
      { id: 3, name: '몽이' },
      { id: 4, name: '머핀' },
      { id: 5, name: '수이' },
      { id: 6, name: '카멜' },
      { id: 7, name: '슬링키' },
    ];
    return (
      <Carousel
        contentArr={WISHLIST_MOCK_DATA.map(item => (
          <div key={item.id}>{item.name}</div>
        ))}
      />
    );
  },
};

import { useState } from 'react';

import LikeButton from './LikeButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof LikeButton> = {
  component: LikeButton,
  title: 'LikeButton',
};

export default meta;

type Story = StoryObj<typeof LikeButton>;

export const Default: Story = {
  render: () => {
    const [count, setCount] = useState(0);
    const [liked, setLiked] = useState(false);

    return (
      <LikeButton
        id={'1'}
        count={count}
        onLike={() => {
          setLiked(true);
          setCount(1);
        }}
        onUnlike={() => {
          setCount(0);
          setLiked(false);
        }}
        liked={liked}
      />
    );
  },
};

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
    const [liked, setLiked] = useState(0);

    return (
      <LikeButton
        id={1}
        count={0}
        onLike={() => setLiked(1)}
        onUnlike={() => setLiked(0)}
        liked={() => liked === 1}
      />
    );
  },
};

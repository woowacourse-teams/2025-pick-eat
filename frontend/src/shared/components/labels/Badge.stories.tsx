import Hamburger from '@components/assets/icons/Hamburger';

import Badge from './Badge';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: 'Badge',
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  render: () => <Badge>뱃지</Badge>,
};

export const Primary: Story = {
  render: () => <Badge>Primary Badge</Badge>,
};

export const Secondary: Story = {
  render: () => <Badge>Secondary Badge</Badge>,
};

export const Gray: Story = {
  render: () => <Badge>Gray Badge</Badge>,
};

export const WithChild: Story = {
  render: () => (
    <Badge>
      <Hamburger size="sm" />
      뱃지
    </Badge>
  ),
};

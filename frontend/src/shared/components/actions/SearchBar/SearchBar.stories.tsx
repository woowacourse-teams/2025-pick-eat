import { ChangeEvent, ComponentProps, ReactNode, useState } from 'react';

import SearchBar from './SearchBar';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SearchBar> = {
  component: SearchBar,
  title: 'SearchBar',
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

type ArgsProps = {
  label?: string;
  children?: ReactNode;
} & ComponentProps<'input'>;

const Template = (args: ArgsProps) => {
  const [state, setState] = useState<string>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  return <SearchBar {...args} value={state} onChange={handleChange} />;
};

export const Default: Story = {
  render: args => <Template {...args} />,
};

export const WithLabel: Story = {
  args: {
    label: '레이블',
  },
  render: args => <Template {...args} />,
};

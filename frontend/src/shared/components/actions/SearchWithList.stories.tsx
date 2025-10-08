import { ChangeEvent, ComponentProps, ReactNode, useState } from 'react';

import SearchWithList from './SearchWithList';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SearchWithList> = {
  component: SearchWithList,
  title: 'SearchWithList',
};

export default meta;

type Story = StoryObj<typeof SearchWithList>;

type ArgsProps = {
  label?: string;
  children?: ReactNode;
} & ComponentProps<'input'>;

const Template = (args: ArgsProps) => {
  const [state, setState] = useState<string>();
  const [list, setList] = useState<string[] | null>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
    setList([e.target.value, e.target.value]);

    if (e.target.value === '') {
      setList(null);
    }
  };

  return (
    <SearchWithList {...args} value={state} onChange={handleChange}>
      {list && list.map((l, index) => <div key={index}>{l}</div>)}
    </SearchWithList>
  );
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

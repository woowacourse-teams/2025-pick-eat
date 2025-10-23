import React, { ReactNode, useState } from 'react';

import Select from './Select';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Select.Bar> = {
  component: Select.Bar,
  title: 'Select',
};

export default meta;

type Story = StoryObj<typeof Select.Bar>;

const options = [
  {
    value: 'korean',
    label: '한식',
  },
  {
    value: 'chinese',
    label: '중식',
  },
  {
    value: 'japanese',
    label: '일식',
  },
];

type ArgsProps = {
  selectedValue?: string;
  label?: string;
  placeholder?: string;
  onChange: (option: { value: string; label: string }) => void;
  children: ReactNode;
};

const Template = (args: ArgsProps) => {
  const [selected, setSelected] = useState<{
    value: string;
    label: string;
  }>();

  return (
    <Select.Bar
      {...args}
      selectedValue={selected?.label}
      onChange={option => setSelected(option)}
    >
      {options.map(option => (
        <Select.Option key={option.value} value={option.value}>
          {option.label}
        </Select.Option>
      ))}
    </Select.Bar>
  );
};

export const Default: Story = {
  render: args => <Template {...args} />,
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: '메뉴를 선택해 주세요.',
  },
  render: args => <Template {...args} />,
};

export const WithLabel: Story = {
  args: {
    label: '레이블',
  },
  render: args => <Template {...args} />,
};

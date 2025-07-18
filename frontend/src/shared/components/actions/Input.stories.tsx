import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';
import { ChangeEvent, useState } from 'react';

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'Input',
};

export default meta;

type Story = StoryObj<typeof Input>;

const Template = (args: any) => {
  const [state, setState] = useState<string>();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  return <Input {...args} value={state} onChange={handleChange} />;
};

export const Default: Story = {
  render: args => <Template {...args} />,
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: '입력해주세요.',
  },
  render: args => <Template {...args} />,
};

export const WithLabel: Story = {
  args: {
    label: '레이블',
  },
  render: args => <Template {...args} />,
};

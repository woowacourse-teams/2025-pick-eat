import Erase from '@components/assets/icons/Eraze';

import { ChangeEvent, ComponentProps, useState } from 'react';

import LineInput from './LineInput';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof LineInput> = {
  component: LineInput,
  title: 'Input',
};

export default meta;

type Story = StoryObj<typeof LineInput>;

type ArgsProps = {
  label?: string;
} & ComponentProps<'input'>;

const Template = (args: ArgsProps) => {
  const [state, setState] = useState<string>();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  return <LineInput {...args} value={state} onChange={handleChange} />;
};

export const LineDefault: Story = {
  render: args => <Template {...args} />,
};

export const LineWithPlaceholder: Story = {
  args: {
    placeholder: '입력해 주세요.',
  },
  render: args => <Template {...args} />,
};

export const LineWithLabel: Story = {
  args: {
    label: '레이블',
  },
  render: args => <Template {...args} />,
};

export const LineWithIcon = () => {
  const [state, setState] = useState<string>();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };
  const handleDelete = () => {
    setState('');
  };

  return (
    <LineInput
      rightIcon={
        <div onClick={handleDelete}>
          <Erase />
        </div>
      }
      value={state}
      onChange={handleChange}
      label="레이블"
    />
  );
};

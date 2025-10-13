import { sliceInputByMaxLength } from '@utils/sliceInputByMaxLength';

import { ChangeEvent, ComponentProps, useState } from 'react';

import FillInput from './FillInput';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FillInput> = {
  component: FillInput,
  title: 'Input',
};

export default meta;

type Story = StoryObj<typeof FillInput>;

type ArgsProps = {
  label?: string;
} & ComponentProps<'input'>;

const Template = (args: ArgsProps) => {
  const [state, setState] = useState<string>();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  return <FillInput {...args} value={state} onChange={handleChange} />;
};

export const FillDefault: Story = {
  render: args => <Template {...args} />,
};

export const FillWithLabel: Story = {
  args: {
    label: '레이블',
  },
  render: args => <Template {...args} />,
};

export const FillWithError: Story = {
  args: {
    label: '레이블',
    error: true,
  },
  render: args => <Template {...args} />,
};

export const FillWithRequired: Story = {
  args: {
    label: '레이블',
    required: true,
  },
  render: args => <Template {...args} />,
};

export const FillWithXicon = () => {
  const [state, setState] = useState<string>();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };
  const handleDelete = () => {
    setState('');
  };

  return (
    <FillInput
      value={state}
      onChange={handleChange}
      xIcon
      onClear={handleDelete}
      label="레이블"
    />
  );
};

export const FillWithFeedbackMessage = () => {
  const MAX_LENGTH = 12;
  const [state, setState] = useState<string>('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(sliceInputByMaxLength(e.target.value, MAX_LENGTH));
  };

  return (
    <FillInput
      value={state}
      onChange={handleChange}
      label="레이블"
      feedbackMessage={
        <div>
          {state.length}/{MAX_LENGTH}
        </div>
      }
    />
  );
};

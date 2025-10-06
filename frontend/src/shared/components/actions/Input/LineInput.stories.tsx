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

export const LineWithLabel: Story = {
  args: {
    label: '레이블',
  },
  render: args => <Template {...args} />,
};

export const LineWithError: Story = {
  args: {
    label: '레이블',
    error: true,
  },
  render: args => <Template {...args} />,
};

export const LineWithRequired: Story = {
  args: {
    label: '레이블',
    required: true,
  },
  render: args => <Template {...args} />,
};

export const LineWithxIcon = () => {
  const [state, setState] = useState<string>();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };
  const handleDelete = () => {
    setState('');
  };

  return (
    <LineInput
      value={state}
      onChange={handleChange}
      xIcon
      onClear={handleDelete}
      label="레이블"
    />
  );
};

export const LineWithFeedbackMessage = () => {
  const MAX_LENGTH = 12;
  const [state, setState] = useState<string>('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  return (
    <LineInput
      maxLength={MAX_LENGTH}
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

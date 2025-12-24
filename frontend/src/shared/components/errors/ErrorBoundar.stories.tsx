import ErrorBoundary from './ErrorBoundary';

import type { Meta } from '@storybook/react';

const meta: Meta<typeof ErrorBoundary> = {
  component: ErrorBoundary,
  title: 'ErrorBoundary',
};

export default meta;

const Component = () => {
  throw new Error('');
};

export const Default = () => {
  return (
    <ErrorBoundary>
      <Component />
    </ErrorBoundary>
  );
};

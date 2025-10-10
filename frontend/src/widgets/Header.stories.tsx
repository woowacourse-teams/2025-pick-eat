import { AuthProvider } from '@domains/login/context/AuthProvider';

import { MemoryRouter } from 'react-router';

import Header from './Header';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Header> = {
  component: Header,
  title: 'Header',
};
export default meta;

type Story = StoryObj<typeof Header>;

export const Playground = {
  render: () => (
    <MemoryRouter>
      <AuthProvider>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <section>
            <Header />
          </section>
        </div>
      </AuthProvider>
    </MemoryRouter>
  ),
  parameters: {
    docs: {
      description: {
        story: '예쁜 헤더입니다.',
      },
    },
  },
} satisfies Story;

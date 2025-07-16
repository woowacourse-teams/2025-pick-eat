import type { Preview } from '@storybook/react-webpack5';
import { ThemeProvider } from '@emotion/react';
import { THEME } from '../src/shared/styles/global';
import React from 'react';

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [
    Story => (
      <ThemeProvider theme={THEME}>
        <Story />
      </ThemeProvider>
    ),
  ],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

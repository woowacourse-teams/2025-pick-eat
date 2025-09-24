import type { Preview } from '@storybook/react-webpack5';
import { Global, ThemeProvider } from '@emotion/react';
import { THEME } from '../src/shared/styles/global';
import reset from '../src/shared/styles/reset';
import React from 'react';
import ToastProvider from '../src/shared/provider/ToastProvider';

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [
    Story => (
      <>
        <Global styles={reset} />
        <ThemeProvider theme={THEME}>
          <ToastProvider>
            <Story />
          </ToastProvider>
        </ThemeProvider>
      </>
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

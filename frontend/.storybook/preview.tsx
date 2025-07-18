import type { Preview } from '@storybook/react-webpack5';
import { Global, ThemeProvider } from '@emotion/react';
import { THEME } from '../src/shared/styles/global';
import reset from '../src/shared/styles/reset';

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [
    Story => (
      <>
        <Global styles={reset} />
        <ThemeProvider theme={THEME}>
          <Story />
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

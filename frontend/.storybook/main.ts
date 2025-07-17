import type { StorybookConfig } from '@storybook/react-webpack5';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

const config: StorybookConfig = {
  staticDirs: ['../public'],
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-webpack5-compiler-swc', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async config => {
    if (!config.resolve) {
      config.resolve = {};
    }
    if (!config.resolve.plugins) {
      config.resolve.plugins = [];
    }

    config.resolve.plugins.push(
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
      })
    );

    return config;
  },
};
export default config;

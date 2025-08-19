import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { merge } from 'webpack-merge';

import common from './webpack.common.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prodConfig = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist/prod'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
    clean: true,
  },
};

export default merge(common, prodConfig);

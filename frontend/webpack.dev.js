import path from 'path';
import { fileURLToPath } from 'url';

import { merge } from 'webpack-merge';

import common from './webpack.common.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const devConfig = {
  mode: 'production',
  optimization: {
    minimize: true,
    splitChunks: { chunks: 'all' },
  },
  output: {
    path: path.resolve(__dirname, 'dist/dev'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
    clean: true,
  },
};

export default merge(common, devConfig);

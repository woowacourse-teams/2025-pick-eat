import path from 'path';
import { fileURLToPath } from 'url';

import { merge } from 'webpack-merge';

import common from './webpack.common.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  optimization: {
    minimize: false,
  },
  output: {
    path: path.resolve(__dirname, 'dist/dev'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
    clean: true,
  },
};

export default merge(common, devConfig);

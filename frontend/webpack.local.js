import path from 'path';
import { fileURLToPath } from 'url';

import { merge } from 'webpack-merge';

import common from './webpack.common.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
    client: {
      overlay: false,
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist/dev'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
    clean: true,
  },
  optimization: {
    minimize: false,
  },
};

export default merge(common, localConfig);

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { merge } from 'webpack-merge';

import common from './webpack.common.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prodConfig = {
  mode: 'production',
  plugins: [new MiniCssExtractPlugin()],
  output: {
    path: path.resolve(__dirname, 'dist/prod'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
    splitChunks: { chunks: 'all' },
    minimizer: ['...', new CssMinimizerPlugin()],
  },
};

export default merge(common, prodConfig);

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import dotenv from 'dotenv';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import webpack from 'webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = dotenv.config({ path: path.resolve(__dirname, './.env') }).parsed;
const MODE = process.env.NODE_ENV || 'development';
const BASE_URL = MODE === 'production' ? env.BASE_URL_PROD : env.BASE_URL_DEV;

const envKeys = Object.entries(env).reduce(
  (acc, [key, value]) => {
    acc[`process.env.${key}`] = JSON.stringify(value);
    return acc;
  },
  {
    'process.env.BASE_URL': JSON.stringify(BASE_URL),
    'process.env.NODE_ENV': JSON.stringify(MODE),
  }
);

const config = {
  entry: './src/main.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, './tsconfig.json'),
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.DefinePlugin(envKeys),
  ],
};

export default config;

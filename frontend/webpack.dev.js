import { merge } from 'webpack-merge';

import common from './webpack.common.js';

const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  optimization: {
    minimize: false,
  },
};

export default merge(common, devConfig);

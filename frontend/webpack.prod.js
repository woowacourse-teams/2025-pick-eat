import { merge } from 'webpack-merge';

import common from './webpack.common.js';

const prodConfig = {
  mode: 'production',
  devtool: 'source-map',
};

export default merge(common, prodConfig);

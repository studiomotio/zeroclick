'use strict';

const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = () => merge(require('./webpack.common.js')(), {
  mode: 'production',
  watch: false,
  optimization: {
    minimizer: [
      new TerserPlugin()
    ]
  },
});

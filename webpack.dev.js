'use strict';

const path = require('path');
const merge = require('webpack-merge');

module.exports = (argv) => merge(require('./webpack.common.js')(argv), {
  mode: 'development',
  output: {
    filename: 'zeroclick.js'
  },
  devServer: {
    contentBase: [
      path.join(__dirname, '/docs'),
      path.join(__dirname, '/src')
    ],
    watchContentBase: true,
    compress: true,
    port: 9000,
    open: true
  }
});

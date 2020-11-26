const path = require('path');
const { merge } = require('webpack-merge');

module.exports = () => merge(require('./webpack.common.js')(), {
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'wds'),
  },
  devServer: {
    contentBase: [
      path.join(__dirname, 'docs'),
      path.join(__dirname, 'wds'),
    ],
    watchContentBase: true,
    compress: true,
    port: 9000,
    open: true,
  },
});

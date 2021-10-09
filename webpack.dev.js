const path = require('path');
const { merge } = require('webpack-merge');

module.exports = () => merge(require('./webpack.common.js')(), {
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'wds'),
  },
  devServer: {
    port: 9000,
    static: {
      serveIndex: false,
      directory: path.join(__dirname, 'docs'),
    },
    client: {
      logging: 'none',
      overlay: false,
    },
    open: true,
    historyApiFallback: true,
  },
});

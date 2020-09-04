const path = require('path');
const { merge } = require('webpack-merge');

module.exports = () => merge(require('./webpack.common.js')(), {
  mode: 'development',
  devServer: {
    contentBase: [
      path.join(__dirname, '/docs'),
      path.join(__dirname, '/src'),
    ],
    watchContentBase: true,
    compress: true,
    port: 9000,
    open: true,
  },
});

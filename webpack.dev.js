'use strict';

const path = require('path');

module.exports = () => ({
  mode: 'development',
  entry: [
    './src/zeroclick.js',
    './docs/src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'assets/app.js'
  },
  resolve: {
    alias: {
      package: path.resolve(__dirname, 'src')
    }
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

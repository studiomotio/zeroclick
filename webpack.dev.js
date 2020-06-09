'use strict';

const path = require('path');

module.exports = () => ({
  mode: 'development',
  entry: './src/zeroclick.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'zeroclick.js',
    library: 'zeroclick',
    libraryExport: 'default',
    libraryTarget: 'umd',
    umdNamedDefine: true
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

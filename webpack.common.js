'use strict';

const path = require('path');

module.exports = () => ({
  entry: './src/zeroclick.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: 'zeroclick',
    libraryExport: 'default',
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
});

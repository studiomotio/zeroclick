'use strict';

const path = require('path');

module.exports = () => ({
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
      source: path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }]
  }
});

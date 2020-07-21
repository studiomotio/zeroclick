'use strict';

const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => ({
  entry: [
    './src/zeroclick.js',
    './docs/src/index.js',
    './docs/src/index.scss'
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
      test: /\.woff$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[folder]/[name].[ext]',
          emitFile: false
        }
      }
    }, {
      test: /\.scss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader
      }, {
        loader: 'css-loader'
      }, {
        loader: 'postcss-loader',
        options: {
          plugins: () => [
            autoprefixer()
          ]
        }
      }, {
        loader: 'sass-loader'
      }]
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env'
          ]
        }
      }
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/app.css'
    })
  ]
});

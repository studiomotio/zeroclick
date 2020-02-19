'use strict';

const path = require('path');
const webpack = require('webpack');
const pack = require('./package.json');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/zeroclick.js',
  output: {
    filename: 'zeroclick.umd.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'ZeroClick',
    libraryExport: 'default',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          mangle: {
            properties: {
              regex: /^_/
            }
          }
        }
      })
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      raw: true,
      banner: () => {
        return `/*!\n  ${pack.name} – ${pack.description}\n  ${pack.author.name} ${pack.author.github} ${pack.year} ${pack.license}\n  ${pack.version}\n*/`;
      }
    })
  ],
  devServer: {
    contentBase: [
      path.join(__dirname, '/docs'),
      path.join(__dirname, '/src')
    ],
    watchContentBase: true,
    compress: true,
    port: 9000
  }
};

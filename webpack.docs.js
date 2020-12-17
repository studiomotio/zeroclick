const path = require('path');
const webpack = require('webpack');
const pack = require('./package.json');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// package preamble
const preamble = `/*!\n  ${pack.name} – ${pack.description}\n  ${pack.author.name} ${pack.author.github} ${new Date().getFullYear()} ${pack.license}\n  ${pack.version}\n*/`;

module.exports = () => merge(require('./webpack.common.js')(), {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'docs'),
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          output: {
            comments: false,
            preamble: preamble,
          },
        },
      }),
    ],
  },
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
        }],
      },
    }),
    new webpack.BannerPlugin({
      raw: true,
      banner: () => {
        return preamble;
      },
    }),
  ],
});

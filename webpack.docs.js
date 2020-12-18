const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = () => merge(require('./webpack.common.js')(), {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'docs/dist'),
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new OptimizeCSSAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
        }],
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: '*',
          context: 'docs',
        }, {
          from: 'docs/assets',
          to: 'assets',
          globOptions: {
            ignore: [
              'src',
            ],
          },
        },
      ],
    }),
  ],
});

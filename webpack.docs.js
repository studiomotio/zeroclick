const path = require('path');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = () => merge(require('./webpack.common.js')(), {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'docs/dist'),
    clean: true,
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
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default', {
              discardComments: {
                removeAll: true,
              },
            },
          ],
        },
      }),
    ],
  },
  plugins: [
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

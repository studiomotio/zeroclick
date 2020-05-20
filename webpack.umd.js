'use strict';

const pack = require('./package.json');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');

// build preamble
const preamble = `/*!\n  ${pack.name} – ${pack.description}\n  ${pack.author.name} ${pack.author.github} ${new Date().getFullYear()} ${pack.license}\n  ${pack.version}\n*/`;

module.exports = () => merge(require('./webpack.common.js')(), {
  mode: 'production',
  watch: false,
  output: {
    filename: 'zeroclick.umd.js'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          output: {
            comments: false,
            preamble: preamble
          },
          mangle: {
            properties: {
              regex: /^_/
            }
          }
        }
      })
    ]
  },
});

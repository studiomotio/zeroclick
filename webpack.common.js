const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => ({
  entry: [
    './src/zeroclick.js',
    './docs/src/index.js',
    './docs/src/index.scss',
  ],
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'assets/app.js',
  },
  resolve: {
    alias: {
      source: path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.woff$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[folder]/[name].[ext]',
              emitFile: false,
            },
          },
        ],
      }, {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          }, {
            loader: 'css-loader',
          }, {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['autoprefixer'],
                ],
              },
            },
          }, {
            loader: 'sass-loader',
          },
        ],
      }, {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/app.css',
    }),
  ],
});

const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = () => ({
  entry: [
    'docs/src/index.js',
    'docs/src/index.scss',
  ],
  output: {
    publicPath: '/',
    filename: 'assets/app.js',
  },
  resolve: {
    alias: {
      root: __dirname,
      source: 'root/src/',
      docs: 'root/docs/',
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          }, {
            loader: 'css-loader',
            options: {
              url: false,
              modules: 'icss',
            },
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
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/app.css',
    }),
    new StylelintPlugin({
      cache: true,
      fix: true,
      files: '**/*.scss',
    }),
    new ESLintPlugin({
      cache: true,
      fix: true,
    }),
  ],
});

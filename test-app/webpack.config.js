const path = require('path')
const webpack = require('webpack')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

const SRC = path.join(__dirname, 'src')
const DIST = path.join(__dirname, 'dist')
const PORT = 3000

module.exports = {
  entry: SRC,
  output: {
    path: DIST,
    filename: 'app.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    host: 'localhost',
    port: PORT,
    historyApiFallback: true,
    hot: true,
    inline: true,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: {
          and: [
            /node_modules/,
            { not: [/node_modules\/react-dataviz\/src/] },
          ],
        },
        loader: 'babel-loader',
        options: {
          babelrc: true,
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      'react-dataviz': 'react-dataviz/src',
    },
    symlinks: false,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({
      url: `http://localhost:${PORT}`,
    }),
  ],
}

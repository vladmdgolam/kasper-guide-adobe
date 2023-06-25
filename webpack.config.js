/* eslint-disable no-undef */
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const path = require("path")

const config = {
  entry: "./src/alert.js",
  devtool: false,
  output: {
    path: path.resolve(__dirname, "kaspersky-guide"),
    filename: "helper.jsx",
    chunkFormat: "commonjs",
  },

  optimization: {
    minimize: false,
  },
  target: "es5",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.svg/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: '**/*.svg', to: '[name][ext]', noErrorOnMissing: true, context: 'src/' },
      ],
    }),
  ],
  externals: {
    photoshop: "commonjs2 photoshop",
    uxp: "commonjs2 uxp",
    os: "commonjs2 os",
  },
}

module.exports = config

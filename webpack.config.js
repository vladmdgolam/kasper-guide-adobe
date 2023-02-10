/* eslint-disable no-undef */
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const path = require("path")

const config = {
  entry: "./src/alert.js",
  devtool: false,
  output: {
    path: path.resolve(__dirname, "kaspersky-guide"),
    filename: "helper.jsx",
    chunkFormat: "commonjs",
    publicPath: path.resolve(__dirname, "kaspersky-guide") + "/",
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
  plugins: [new CleanWebpackPlugin()],
  externals: {
    photoshop: "commonjs2 photoshop",
    uxp: "commonjs2 uxp",
    os: "commonjs2 os",
  },
}

module.exports = config

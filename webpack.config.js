// const webpack = require("webpack")
const path = require("path")

const config = {
  entry: "./src/alert.js",
  devtool: false,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    chunkFormat: "commonjs",
    publicPath: path.resolve(__dirname, "dist") + "/",
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
      // {
      //   test: /\.svg/,
      //   loader: "url-loader",
      // },
      {
        test: /\.svg/,
        type: "asset/resource",
      },
    ],
  },
  externals: {
    photoshop: "commonjs2 photoshop",
    uxp: "commonjs2 uxp",
    os: "commonjs2 os",
  },
}

module.exports = config

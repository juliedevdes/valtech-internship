/* eslint-disable no-undef */
const path = require("path");
const HtlmlPl = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  devServer: {
    static: {
      directory: path.join(__dirname, "src"),
    },
    compress: true,
    port: 3000,
  },

  entry: "./src/index.js",

  module: {
    rules: [
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ["file-loader"],
      },
      { test: /\.(js)$/, use: "babel-loader" },
    ],
  },

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  plugins: [
    new HtlmlPl({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
  ],
};
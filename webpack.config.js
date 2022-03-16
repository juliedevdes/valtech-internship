const path = require("path");
const HtlmlPl = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  devServer: {
    // static: {
    //   directory: path.join(__dirname, "src"),
    // },
    compress: true,
    port: 3000,
  },

  entry: "./client/index.mjs",

  module: {
    rules: [
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      { test: /\.(js)$/, use: "babel-loader" },

      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  plugins: [
    // new HtlmlPl({
    //   template: "./src/index.html",
    // }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./client/img"),
          to: path.resolve(__dirname, "./dist/img"),
        },
        {
          from: path.resolve(__dirname, "./client/js"),
          to: path.resolve(__dirname, "./dist/js"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
    new CleanWebpackPlugin(),
  ],
};

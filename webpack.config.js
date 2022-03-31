const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  devServer: {
    compress: true,
    port: 3000,
  },

  entry: "./client/index.js",

  module: {
    rules: [
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "img/[name][ext]",
        },
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
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./client/js/owl.carousel.min.js"),
          to: path.resolve(__dirname, "./dist/js/owl.carousel.min.js"),
        },
        {
          from: path.resolve(__dirname, "./client/js/jquery.min.js"),
          to: path.resolve(__dirname, "./dist/js/jquery.min.js"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
    new CleanWebpackPlugin(),
  ],
};

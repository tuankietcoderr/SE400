const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");

const deps = require("./package.json").dependencies;

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/review/latest/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "review_mf",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./reviewList": "./src/components/review-list",
        "./reviewButton": "./src/components/review-button",
        "./reviewCard": "./src/components/review-card",
      },
      shared: {
        ...deps,
      },
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);

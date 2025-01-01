const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");

const deps = require("./package.json").dependencies;

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/payment/latest/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "payment_mf",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./PaymentApp": "./src/bootstrap.js",
        "./processPaymentButton": "./src/components/process-payment-button",
      },
      shared: {
        ...deps,
      },
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);

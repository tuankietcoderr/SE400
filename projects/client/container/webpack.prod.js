const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");

const deps = require("./package.json").dependencies;

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/container/latest/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing_mf: `marketing_mf@${domain}/marketing/remoteEntry.js`,
        user_profile_mf: `user_profile_mf@${domain}/user-profile/remoteEntry.js`,
        booking_mf: `booking_mf@${domain}/booking/remoteEntry.js`,
        payment_mf: `payment_mf@${domain}/payment/remoteEntry.js`,
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");

const deps = require("./package.json").dependencies;

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/booking/latest/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "booking_mf",
      filename: "remoteEntry.js",
      remotes: {
        marketing_mf: `marketing_mf@${domain}/marketing/latest/remoteEntry.js`,
        user_profile_mf: `user_profile_mf@${domain}/user-profile/latest/remoteEntry.js`,
        review_mf: `review_mf@${domain}/review/latest/remoteEntry.js`,
        payment_mf: `payment_mf@${domain}/payment/latest/remoteEntry.js`,
      },
      exposes: {
        "./BookingApp": "./src/bootstrap",
        "./HotelCard": "./src/components/HotelCard",
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

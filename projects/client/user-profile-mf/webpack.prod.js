const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");

const deps = require("./package.json").dependencies;

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/user-profile/latest/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "user_profile_mf",
      filename: "remoteEntry.js",
      remotes: {
        review_mf: `review_mf@${domain}/review/latest/remoteEntry.js`,
      },
      exposes: {
        "./UserProfileApp": "./src/bootstrap",
        "./authButtonMount": "./src/authButtonMount",
      },
      shared: {
        ...deps,
        "solid-js": {
          singleton: true,
          requiredVersion: deps["solid-js"],
        },
      },
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);

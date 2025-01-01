const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");

const deps = require("./package.json").dependencies;

const printCompilationMessage = require("./compilation.config.js");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    historyApiFallback: true,
    watchFiles: [path.resolve(__dirname, "src")],
    onListening: function (devServer) {
      const port = devServer.server.address().port;

      printCompilationMessage("compiling", port);

      devServer.compiler.hooks.done.tap("OutputMessagePlugin", (stats) => {
        setImmediate(() => {
          if (stats.hasErrors()) {
            printCompilationMessage("failure", port);
          } else {
            printCompilationMessage("success", port);
          }
        });
      });
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      filename: "remoteEntry.js",
      remotes: {
        marketing_mf: "marketing_mf@http://localhost:8081/remoteEntry.js",
        user_profile_mf: "user_profile_mf@http://localhost:8082/remoteEntry.js",
        booking_mf: "booking_mf@http://localhost:8083/remoteEntry.js",
        payment_mf: "payment_mf@http://localhost:8085/remoteEntry.js",
      },
      exposes: {},
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

module.exports = merge(commonConfig, devConfig);

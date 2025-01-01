const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");

const deps = require("./package.json").dependencies;

const printCompilationMessage = require("./compilation.config.js");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8085,
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

module.exports = merge(commonConfig, devConfig);

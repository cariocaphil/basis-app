const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;

module.exports = {
  mode: "development",
  devServer: {
    port: 3000, // Port for the host app
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "basisApp",
      remotes: {
        remoteApp: "remoteApp@http://localhost:3001/remoteEntry.js", // URL of remote app
      },
      shared: {
        react: { singleton: true, requiredVersion: "^18.0.0" },
        "react-dom": { singleton: true, requiredVersion: "^18.0.0" },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

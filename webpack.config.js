const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;

module.exports = {
  mode: "development",
  entry: "./src/index.js", // Ensure this points to your main entry file
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Match .js and .jsx files
        exclude: /node_modules/, // Exclude dependencies in node_modules
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/, // Handle CSS files if needed
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"], // Allow imports without specifying extensions
  },
  devServer: {
    port: 3000, // Host app port
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "basisApp",
      remotes: {
        remoteApp: "remoteApp@http://localhost:3001/remoteEntry.js",
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

const path = require("path");
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;

module.exports = {
    entry: './src/app.module.js',
    output: {
        publicPath: "http://localhost:3000/",
        path: __dirname + "/dist",
        // path: path.join(__dirname, "./bin"),
        filename: 'app.bundle.js',
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },  
    devServer: {
      port: 3000,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
          use: {
            loader: "file-loader"
          }
        },
        {
          test: /\.(htm|html)$/,
          exclude: [/node_modules/, require.resolve('./index.html')],
          use: {
            loader: "html-loader",
            options: {
              esModule: false,
            },
          }
        }
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "ng-app-example",
        filename: "remoteEntry.js",
        remotes: {
          "common": "common@http://127.0.0.1:9000/pilot/common/remoteEntry.js",
        },
        exposes: {},
        shared: {
          // ...deps,
        },
      }),
      new HtmlWebPackPlugin({
        template: "./index.html",
      }),
    ],
}

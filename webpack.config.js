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
        name: "ng_mfe_expose",
        filename: "remoteEntry.js",
        remotes: {
          "common": "common@http://127.0.0.1:9000/pilot/common/remoteEntry.js",
          // "nextjscomponents": "nextjscomponents@http://127.0.0.1/_next/static/remoteEntry.js",
          // "nextjscomponents": "nextjscomponents@http://127.0.0.1:3007/_next/pages/board-list.js",
          // "nextjscomponents": `promise new Promise(res=>{
          //   getRemoteVersionForHost('consumer', 'nextjscomponents').then(('http://127.0.0.1:3007/_next/static/remoteEntry.js')=>{
          //     injectRemoteScript('http://127.0.0.1:3007/_next/static/remoteEntry.js').then()=>{
                
          //     }
          //   })
          // })`
        },
        // exposes: {
        //   "./MfeAngularComponent": "./src/modules/mfe-expose/MfeExposeComponent.js",
        // },
        // shared: {
        //   "angular" : { singleton: true, requiredVersion: deps.angular },
        //   "angular-route" : { singleton: true, requiredVersion: deps["angular-route"] },
        //   "angular2react" : { singleton: true, requiredVersion: deps["angular2react"] },
        //   "ajv": { singleton: true, requiredVersion: deps.ajv },
        //   "autoprefixer": { singleton: true },
        //   "@uirouter/angularjs": { singleton: true, requiredVersion: deps["@uirouter/angularjs"]}
        // },
      }),
      new HtmlWebPackPlugin({
        template: "./index.html",
        title: "Webpack and Angularjs 1.x application example"
      }),
    //   new webpack.ContextReplacementPlugin(
    //     /\@angular(\\|\/)/,
    //     path.join(__dirname, '$_lazy_route_resources'),
    //     {}
    // ),
    ],
}

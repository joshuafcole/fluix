var webpack = require("webpack");
var path = require("path");

const ASSET_PATH = process.env.ASSET_PATH || "/dist/";

//----------------------------------------------------------------------
// Client Build
//----------------------------------------------------------------------

function make_default_config_for_entry(entry, params) {
  let {name = "[name]", no_splitting = false, no_hmr = false, no_compile_fluorine = false} = params;
  return {
    entry,
    output: {
      filename: `${name}.js`,
      path: path.resolve(__dirname, "dist"),
      publicPath: ASSET_PATH
    },
    devServer: {
      contentBase: ".",
      port: 8080
    },

    node: {
      fs: "empty"
    },

    devtool: "inline-source-map",
    resolve: {
      extensions: [".webpack.js", ".web.js", ".js", ".ts", ".tsx", ".json"]
    },

    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        "process.env.ASSET_PATH": JSON.stringify(ASSET_PATH)
      })
    ],

    module: {
      rules: [
        {test: /\.ts$/, use: "awesome-typescript-loader"},
        no_compile_fluorine
          ? {test: /\.tsx$/, loaders: ["awesome-typescript-loader"]}
          : {
              test: /\.tsx$/,
              loaders: ["fluorine-loader?benchmark=true", "awesome-typescript-loader"]
            },
        {test: /\.css$/, loader: "style-loader!css-loader"},
        {test: /\.styl$/, loader: "style-loader!css-loader!stylus-loader"},
        {test: /\.md$/, use: "raw-loader"},
        {test: /\.yaml$/, use: "raw-loader"},
        {test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/, loader: "url-loader?limit=10000"},
        {enforce: "pre", test: /\.js$/, loader: "source-map-loader"}
      ]
    },

    optimization: no_splitting
      ? undefined
      : {
          namedChunks: true,
          splitChunks: {
            chunks: "all"
          }
        },

    devServer: no_hmr
      ? undefined
      : {
          hot: true,
          inline: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
          }
        }
  };
}

module.exports = [make_default_config_for_entry("./src/index.ts", {no_compile_fluorine: true})];

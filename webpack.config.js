const path = require("path")

module.exports = {
 resolve: {
  extensions: [".js", ".jsx", ".ts", ".tsx"],
  modules: ["node_modules"]
 },
 entry: "./src/ts/index.ts",
 target: "web",
 devtool: "cheap-eval-source-map",
 output: {
  filename: "app.js",
  path: path.join(__dirname, "assets/js"),
  publicPath: ""
 },
 module: {
  rules: [
   {
    test: /\.ts$/,
    exclude: /node_modules/,
    use: {
     loader: "babel-loader"
    }
   }
  ]
 }
}

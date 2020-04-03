const path = require("path")

module.exports = {
 resolve: {
  extensions: [".js", ".jsx", ".ts", ".tsx"],
  modules: ["node_modules"]
 },
 entry: {
  home: "./src/ts/home/index.ts",
  parallax: "./src/ts/parallax/index.ts",
  global: "./src/ts/global/index.ts"
 },
 target: "web",
 devtool: "cheap-eval-source-map",
 output: {
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

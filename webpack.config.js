module.exports = {
  entry: "./src/main.js",
  output: {
    path: "./build",
    publicPath: "/build/",
    filename: "build.js"
  },
  devtool: "inline-source-map",
  module: {
    loaders: [
      {test: /\.vue$/,loader: 'vue'},
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader",
        query : {
          "plugins": [
            ["transform-es2015-template-literals", {"loose": true,"spec": true}]
          ],
          "presets": ["es2015","stage-0"]
        }
      }
    ]
  }
}
module.exports = {
  entry: "./src/main.js",
  output: {
    path: "./build",
    publicPath: "/build/",
    filename: "build.js"
  },
  module: [
    {
        test: /\.vue$/,
        loader: 'vue'
    },
    {
        test: /\.js$/,
        loader: 'babel!eslint',
        exclude: /node_modules/
    }
  ]
}
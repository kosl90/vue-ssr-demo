var path = require('path');
var webpack = require('webpack');
var SSR = require('vue-ssr-webpack-plugin');


module.exports = {
  target: 'node',
  entry: './app.js',
  devtool: false,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ]
  },
  // 环境变量，非必须
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new SSR(),
  ],
  // 移除多余的包，否则会出错！！！
  externals: Object.keys(require('../package.json').dependencies),
}

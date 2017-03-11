var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  target: 'node',
  entry: './server-entry.js',
  devtool: false,
  output: {
    filename: 'server-bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loader: ['css-loader'],
	}
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
	  use: 'css-loader',
	}),
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          // name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '~containers': path.resolve(__dirname, './containers'),
      '~styles': path.resolve(__dirname, './styles'),
      '~components': path.resolve(__dirname, './components'),
      '~assets': path.resolve(__dirname, './assets'),
    },
  },
  // 环境变量，非必须
  plugins: [
    new ExtractTextPlugin('styles.ssr.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.VUE_ENV': '"server"'
    })
  ],
  // 移除多余的包，否则会出错！！！
  externals: Object.keys(require('../package.json').dependencies),
}

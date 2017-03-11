var path = require('path');
var webpack = require('webpack');
var HTMLPlugin = require('webpack-html-plugin');
var FriendlyError = require('friendly-errors-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


var webpackConfig = {
  entry: {
    client: './client-entry.js',
    vendor: ['vue'],
  },
  //devtool: '#eval-source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    noParse: /es6-promise\.js$/,
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: ['css-loader'],
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
        test: /\.png$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
        }
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      '~containers': path.resolve(__dirname, './containers'),
      '~styles': path.resolve(__dirname, './styles'),
      '~components': path.resolve(__dirname, './components'),
      '~assets': path.resolve(__dirname, './assets'),
    },
  },
  // 环境变量，非必须
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new ExtractTextPlugin('styles.[hash].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.VUE_ENV': '"client"'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HTMLPlugin({
      filename: 'index.html',
      template: '../index.html',
      inject: true,
    }),
    new FriendlyError(),
  ],
  // 移除多余的包，否则会出错！！！
  // externals: Object.keys(require('../../package.json').dependencies),
};


Object.keys(webpackConfig.entry).forEach(function (name) {
  webpackConfig.entry[name] = ['webpack-hot-middleware/client?noInfo=true&reload=true'].concat(webpackConfig.entry[name]);
});

module.exports = webpackConfig;

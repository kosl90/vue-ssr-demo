const path = require('path');
const fs = require('fs');
const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('./webpack.client.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const compiler = webpack(webpackConfig);

const devMiddleware = webpackDevMiddleware(compiler, {});
const hotMiddleware = webpackHotMiddleware(compiler, {});

const app = express();

app.use(devMiddleware);
app.use(hotMiddleware);

app.listen(8080, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('listening at localhost:8080');
});

const path = require('path');
const fs = require('fs');
const express = require('express');
const ssr = require('vue-server-renderer');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

const layout = fs.readFileSync('../index.html', 'utf8');

const compiler = webpack(webpackConfig);

compiler.run((err, _stats) => {
  if (err) {
    console.error(err);
    return;
  }

  const stats = _stats.toJson();
  if (stats.errors.length) {
    stats.errors.forEach(e => console.error(e));
    return;
  }

  stats.warnings.forEach(w => console.warn(w));

  const app = express();
  
  const bundlePath = path.resolve(__dirname, 'dist/bundle.js');
  const bundle = fs.readFileSync(bundlePath, 'utf8');
  const renderer = ssr.createBundleRenderer(bundle, {
      template: layout.replace('<div id="app"></div>', '<!--vue-ssr-outlet-->'),
  });
  
  app.get('/', (req, res, next) => {
    // TODO: extract styles from .css files
    renderer.renderToString({styles:'<style>.h{color:red;}</style>' }, (err, html) => {
      if (err) {
        console.error(err);
        res.sendStatus(500); 
        return;
      }

  
      const content = html;
  
      res.send(content);
    });
  });
  
  app.listen(8080, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('listening at localhost:8080');
  });
});

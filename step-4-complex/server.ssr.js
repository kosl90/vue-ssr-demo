const path = require('path');
const fs = require('fs');
const express = require('express');
const ssr = require('vue-server-renderer');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

const layout = fs.readFileSync('../index.html', 'utf8');
const app = express();

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

  
  const bundlePath = path.resolve(__dirname, 'dist/server-bundle.js');
  const bundle = fs.readFileSync(bundlePath, 'utf8');
  const renderer = ssr.createBundleRenderer(bundle, {
      template: layout.replace('<div id="app"></div>', '<!--vue-ssr-outlet-->'),
  });

  
  const styles = fs.readFileSync('./dist/styles.ssr.css', 'utf8');

  app.get('/', (req, res, next) => {
    // NB: this is a little trick, because imported style in <script> section gets error in runtime
    // and the `styles` option will be overwritten with <style> section in vue files.
    // TODO: test ssr without vue files.
    renderer.renderToString({head: `<style>${styles}</style>`}, (err, html) => {
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

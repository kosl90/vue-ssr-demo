const fs = require('fs');
const express = require('express');
const vueSSR = require('vue-server-renderer');


const app = express();

const renderer = vueSSR.createRenderer();

app.get('/', (req, res, next) => {
  const Vue = require('vue');

  const vm = new Vue({
    render (h) { return h('h1', 'this is a title'); },
  });

  renderer.renderToString(vm, (err, html) => {
    if (err) {
      console.error(err);
      res.sendStatus(500); 
      return;
    }

    const layout = fs.readFileSync('../index.html', 'utf8');

    const content = layout.replace('<div id="app"></div>', html);

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

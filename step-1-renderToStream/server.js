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

  const layout = fs.readFileSync('../index.html', 'utf8');
  const [prefixHTML, postHTML] = layout.split('<div id="app"></div>')
  res.write(prefixHTML);
  
  const renderStream = renderer.renderToStream(vm);
	renderStream.on('error', (err) => {
    console.error(err);
    res.sendStatus(500);
  })
  .on('data', chunk => res.write(chunk))
  .on('end', () => res.end(postHTML));
});

app.listen(8080, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('listening at localhost:8080');
});

const Vue = require('vue');

const Title = require('./title.vue')

export default (context) => {
  const app = new Vue({template:'<my-title :title="title"></my-title>', components: {MyTitle: Title}, data: {title: 'hh'}});
  return Promise.resolve(app);
};

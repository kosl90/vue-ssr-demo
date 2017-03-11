const Vue = require('vue');

const Title = require('./title.vue')

export default (context) => {
  const app = new Vue(Title);
  return Promise.resolve(app);
};

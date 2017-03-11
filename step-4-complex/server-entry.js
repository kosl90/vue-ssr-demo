const Vue = require('vue');

const App = require('./containers/App.vue')

export default (context) => {
  const app = new Vue(App);
  return Promise.resolve(app);
};

import 'babel-polyfill';
import Vue from 'vue';
import fastclick from 'fastclick';
import 'assets/scss/index.scss';
import App from './App';
import router from './router';


fastclick.attach(document.body);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});

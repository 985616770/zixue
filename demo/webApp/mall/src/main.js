/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/first */
import 'babel-polyfill';
import Vue from 'vue';
// import fastclick from 'fastclick';
import App from './App';
import router from './router';
import VueLazyLoad from 'vue-lazyload';
import 'assets/scss/index.scss';
import 'swiper/dist/css/swiper.css';

// fastclick.attach(document.body);
Vue.use(VueLazyLoad, {
  preLoad: 1,
  error: require('assets/img/error.png'),
  loading: require('assets/img/loading.gif'),
  attempt: 1,
});
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});

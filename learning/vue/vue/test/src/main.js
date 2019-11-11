// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import Mint from 'mint-ui';
import axios from 'axios';
import App from './App';
import router from './router';
import store from './store';
import 'mint-ui/lib/style.css';

Vue.use(axios);
Vue.use(Mint);
Vue.use(VueResource);

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

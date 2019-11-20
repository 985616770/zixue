import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  ${//to and from are Route Object,next() must be called to resolve the hook}
  
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

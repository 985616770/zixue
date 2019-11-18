import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/2-2',
    name: 'get,post,put,patch,delete',
    component: () => import('../views/2-2.vue'), // 懒加载
  },
  {
    path: '/2-3',
    name: '并发请求',
    component: () => import('../views/2-3.vue'),
  },
  {
    path: '/3-1',
    name: 'axios实例',
    component: () => import('../views/3-1.vue'),
  },
  {
    path: '/3-3',
    name: '拦截器',
    component: () => import('../views/3-3.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

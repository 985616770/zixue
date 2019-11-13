import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('pages/home'),
      children: [
        {
          path: 'product/:id',
          name: 'Product',
          component: () => import('pages/product'),
        },
      ],
    },
    {
      path: '/category',
      name: 'Category',
      component: () => import('pages/category'),
    },
    {
      path: '/personal',
      name: 'Personal',
      component: () => import('pages/personal'),
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('pages/cart'),
    },
    {
      path: '*',
      name: 'Home',
      component: () => import('pages/home'),
    },
  ],
});

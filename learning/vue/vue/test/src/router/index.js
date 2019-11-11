import Vue from 'vue';
import Router from 'vue-router';
import Demo1 from '@/pages/demo1';
import Demo2 from '@/pages/demo2';
import Demo3 from '@/pages/demo3';
import Demo4 from '@/pages/demo4';
import Demo5 from '@/pages/demo5';
import Demo6 from '@/pages/demo6';
import Demo7 from '@/pages/demo7';
import Demo8 from '@/pages/demo8';
import Demo9 from '@/pages/demo9';
import Demo10 from '@/pages/demo10';
import Demo11 from '@/pages/demo11';
import Demo12 from '@/pages/demo12';
import Demo13 from '@/pages/demo13';
import Demo14 from '@/pages/demo14';
import Demo15 from '@/pages/demo15';

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/demo1',
      name: 'demo1',
      component: Demo1
    },
    {
      path: '/demo2',
      name: 'demo2',
      component: Demo2
    },
    {
      path: '/demo3',
      name: 'demo3',
      component: Demo3
    },
    {
      path: '/demo4',
      name: 'demo4',
      component: Demo4
    },
    {
      path: '/demo5',
      name: 'demo5',
      component: Demo5
    },
    {
      path: '/demo6',
      name: 'demo6',
      component: Demo6
    },
    {
      path: '/demo7',
      name: 'demo7',
      component: Demo7
    },
    {
      path: '/demo8',
      name: 'demo8',
      component: Demo8
    },
    {
      path: '/demo9',
      name: 'demo9',
      component: Demo9
    },
    {
      path: '/demo10',
      name: 'demo10',
      component: Demo10
    },
    {
      path: '/demo11/:userId',
      name: 'demo11',
      component: Demo11
    },
    {
      path: '/demo12',
      name: 'demo12',
      component: Demo12
    },
    {
      path: '/demo13',
      name: 'demo13',
      component: Demo13
    },
    {
      path: '/demo14',
      name: 'demo14',
      component: Demo14
    },
    {
      path: '/demo15',
      name: 'demo15',
      component: Demo15
    }
  ]
});

import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store';

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName:"auth" */'../views/Auth/index.vue'),
  },

  {
    path: '/',
    name: 'BasicLayout',
    component: () => import(/* webpackChunkName:"BasicLayout" */'../layout/BasicLayout/index.vue'),
    children: [
      {
        path: 'games',
        name: 'Games',
        component: () => import(/* webpackChunkName:"Games" */'../views/Games/index.vue'),
      },
      {
        path: 'games/:id',
        name: 'GameDetail',
        component: () => import(/* webpackChunkName:"Games" */'../views/GameDetail/index.vue'),
      },
      {
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName:"User" */'../views/User/index.vue'),
      },
      {
        path: 'log',
        name: 'Log',
        component: () => import(/* webpackChunkName:"Log" */'../views/Log/index.vue'),
      },
    ],
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  //const reqArr = [];

  if (!store.state.characterInfo.length) {
    //reqArr.push(store.dispatch('getCharacterInfo'));
    await store.dispatch('getCharacterInfo');

  }


  if (!store.state.userInfo.account) {
    await store.dispatch('getUserInfo');
    //reqArr.push(store.dispatch('getUserInfo'));
  }

  //await Promise.all(reqArr);


  next();
});

export default router;

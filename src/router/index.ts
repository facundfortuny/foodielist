import { auth } from '@/db';
import store from '@/store';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/restaurant/create',
    name: 'RestaurantCreate',
    component: () => import('@/views/Restaurant.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/restaurant/:name',
    name: 'Restaurant',
    props: true,
    component: () => import('@/views/Restaurant.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/logout',
    name: 'Logout',
    meta: { requiresAuth: true },
    beforeEnter(to, from, next) {
      store.dispatch('auth/logout').then(() => next({ name: 'Login' }));
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next('/login');
  } else {
    next();
  }
});

export default router;

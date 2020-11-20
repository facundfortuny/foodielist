import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/restaurant/create',
    name: 'RestaurantCreate',
    component: () => import('@/views/Restaurant.vue')
  },
  {
    path: '/restaurant/:name',
    name: 'Restaurant',
    props: true,
    component: () => import('@/views/Restaurant.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;

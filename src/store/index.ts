import Vue from 'vue';
import Vuex from 'vuex';
import AuthModule from './modules/auth';
import RestaurantsModule from './modules/restaurants';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  modules: {
    auth: AuthModule,
    restaurants: RestaurantsModule
  }
});

export default store;

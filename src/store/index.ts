import { db } from '@/db';
import { Restaurant } from '@/models/restaurant';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    restaurants: []
  },
  mutations: {
    setRest: (state, restaurants) => {
      state.restaurants = restaurants;
    }
  },
  actions: {
    setRestaurants: context => {
      db.collection('restaurants')
        .get()
        .then(querySnapshot => {
          const restaurants: Restaurant[] = [];
          querySnapshot.forEach(doc => {
            const res = doc.data();
            restaurants.push({
              name: res.name,
              type: res.type,
              address: res.address,
              location: res.location,
              description: res.description,
              visited: res.visited,
              mapsLink: res.mapsLink
            });
            context.commit('setRest', restaurants);
          });
        });
    }
  },
  getters: {
    allRest: state => {
      return state.restaurants;
    }
  },
  modules: {}
});

import { restaurantsCollection } from '@/db';
import { Restaurant } from '@/models/restaurant';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    restaurants: []
  },

  mutations: {
    setRest: (state, restaurants) => {
      state.restaurants = restaurants;
    }
  },

  actions: {
    async saveRestaurant(state, restaurant) {
      await restaurantsCollection.add({
        createdOn: new Date(),
        name: restaurant.name,
        type: restaurant.type,
        address: restaurant.address,
        location: restaurant.location,
        description: restaurant.description,
        visited: restaurant.visited,
        mapsLink: restaurant.mapsLink
      });
    },
    async updateRestaurant(state, restaurant) {
      await restaurantsCollection.doc(restaurant.id).update({
        createdOn: new Date(),
        name: restaurant.name,
        type: restaurant.type,
        address: restaurant.address,
        location: restaurant.location,
        description: restaurant.description,
        visited: restaurant.visited,
        mapsLink: restaurant.mapsLink
      });
    }
  },
  getters: {
    getRest: state => (name: string) => {
      return state.restaurants.find((rest: Restaurant) => rest.name === name);
    }
  }
});

restaurantsCollection.orderBy('name', 'asc').onSnapshot(snapshot => {
  const restaurants: Restaurant[] = [];

  snapshot.forEach(doc => {
    const res = doc.data();
    restaurants.push({
      id: doc.id,
      name: res.name,
      type: res.type,
      address: res.address,
      location: res.location,
      description: res.description,
      visited: res.visited,
      mapsLink: res.mapsLink
    });
  });

  store.commit('setRest', restaurants);
});

export default store;

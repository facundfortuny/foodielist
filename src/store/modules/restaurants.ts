import { Module } from 'vuex';
import { Restaurant } from '@/models/restaurant';
import { restaurantsCollection } from '@/db';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RestaurantsModule: Module<any, any> = {
  namespaced: true,

  state: {
    restaurants: [],
  },

  getters: {
    getRest: (state) => (name: string) => {
      return state.restaurants.find((rest: Restaurant) => rest.name === name);
    },
    getRestByLoc: (state) => (location: string) => {
      return state.restaurants.filter(
        (restaurant: Restaurant) => restaurant.location === location
      );
    },
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
        mapsLink: restaurant.mapsLink,
        position: restaurant.position,
        website: restaurant.website,
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
        mapsLink: restaurant.mapsLink,
        position: restaurant.position,
        website: restaurant.website,
      });
    },
    async fetchRestaurants({ commit }) {
      restaurantsCollection.orderBy('name', 'asc').onSnapshot((snapshot) => {
        const restaurants: Restaurant[] = [];
        snapshot.forEach((doc) => {
          const res = doc.data();
          restaurants.push({
            id: doc.id,
            name: res.name,
            type: res.type,
            address: res.address,
            location: res.location,
            description: res.description,
            visited: res.visited,
            mapsLink: res.mapsLink,
            position: res.position,
            website: res.website,
          });
        });
        commit('setRest', restaurants);
      });
    },
  },
  mutations: {
    setRest: (state, restaurants) => {
      state.restaurants = [...restaurants];
    },
  },
};

export default RestaurantsModule;

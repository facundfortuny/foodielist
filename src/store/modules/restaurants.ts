import { Module } from 'vuex';
import { Restaurant } from '@/models/restaurant';
import { restaurantsCollection } from '@/db';
import { locations } from '@/helpers/locations';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RestaurantsModule: Module<any, any> = {
  namespaced: true,

  state: {
    restaurants: [],
    locations: locations,
    selectedlocation: '',
    selectedName: '',
    selectedType: '',
    excludeVisited: false,
    useLiveLocation: false,
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
    getLocations: (state) => (location: string) => {
      return state.locations.find((loc: string) => loc === location);
    },
    getLocationSelected: (state) => () => {
      return state.selectedlocation;
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
    async deleteRestaurant(state, restaurant) {
      await restaurantsCollection.doc(restaurant.id).delete();
    },
    selectLocation({ commit }, location) {
      commit('setLocationSelected', location);
    },
    selectName({ commit }, name) {
      commit('setNameSelected', name);
    },
    selectType({ commit }, type) {
      commit('setTypeSelected', type);
    },
    setExcludeVisited({ commit }, excludeVisited) {
      commit('setExcludeVisited', excludeVisited);
    },
    setUseLiveLocation({ commit }, useLiveLocation) {
      commit('setUseLiveLocation', useLiveLocation);
    },
  },
  mutations: {
    setRest: (state, restaurants) => {
      state.restaurants = [...restaurants];
    },
    setLocationSelected: (state, location) => {
      state.selectedlocation = location;
    },
    setNameSelected: (state, name) => {
      state.selectedName = name;
    },
    setTypeSelected: (state, type) => {
      state.selectedType = type;
    },
    setExcludeVisited: (state, excludeVisited) => {
      state.excludeVisited = excludeVisited;
    },
    setUseLiveLocation: (state, useLiveLocation) => {
      state.useLiveLocation = useLiveLocation;
    },
  },
};

export default RestaurantsModule;

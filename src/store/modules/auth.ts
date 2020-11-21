import { auth, usersCollection } from '@/db';
import router from '@/router/index';
import { Module } from 'vuex';

const AuthModule: Module<any, any> = {
  namespaced: true,

  state: {
    userProfile: {}
  },

  getters: {},

  actions: {
    async login({ dispatch }, form) {
      const { user } = await auth.signInWithEmailAndPassword(
        form.email,
        form.password
      );

      dispatch('fetchUserProfile', user);
    },
    async fetchUserProfile({ commit }, user) {
      const userProfile = await usersCollection.doc(user.uid).get();

      commit('setUserProfile', userProfile.data());

      if (router.currentRoute.path === '/login') {
        router.push('/');
      }
    },
    async logout({ commit }) {
      await auth.signOut();
      commit('setUserProfile', {});

      router.push('/login');
    }
  },

  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    }
  }
};

export default AuthModule;

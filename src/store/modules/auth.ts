import { auth } from '@/db';
import router from '@/router/index';
import { Module } from 'vuex';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthModule: Module<any, any> = {
  namespaced: true,

  state: {
    user: null,
  },

  getters: {
    isAuth: (state) => () => {
      return !!state.user;
    },
  },

  actions: {
    async login(state, form) {
      const { user } = await auth.signInWithEmailAndPassword(
        form.email,
        form.password
      );

      if (user) {
        router.push('/');
      }
    },
    setUser({ commit }, user) {
      if (user) {
        commit('setUser', {
          displayName: user.displayName,
          email: user.email,
        });
      } else {
        commit('setUser', null);
      }
    },
    async logout({ commit }) {
      await auth.signOut();
      commit('setUser', {});

      router.push('/login');
    },
  },

  mutations: {
    setUser(state, val) {
      state.user = val;
    },
  },
};

export default AuthModule;

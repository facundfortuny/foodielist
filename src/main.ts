import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';
import * as GmapVue from 'gmap-vue';
import firebase from 'firebase/app';
import 'firebase/analytics';
import VueGtm from '@gtm-support/vue2-gtm';

Vue.use(GmapVue, {
  load: {
    key: process.env.VUE_APP_API_MAP_KEY,
    libraries: 'places',
    region: 'ES',
    language: 'EN',
  },
  installComponents: true,
});

Vue.config.productionTip = false;

firebase.analytics();

Vue.use(VueGtm, {
  id: 'GTM-5BXXD3H',
  defer: false,
  enabled: process.env.NODE_ENV === 'production',
  debug: process.env.NODE_ENV !== 'production',
  loadScript: true,
  vueRouter: router,
  trackOnNextTick: false,
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');

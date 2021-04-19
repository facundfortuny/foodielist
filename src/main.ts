import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';
import * as GmapVue from 'gmap-vue';

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

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');

import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#FECD52',
        secondary: '#3f3d56',
        info: '#6FD08C',
        accent: '#575a89',
        error: '#F28482',
        blue: '#6991FD',
      },
    },
  },
});

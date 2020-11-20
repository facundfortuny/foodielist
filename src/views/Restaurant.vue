<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" lg="6" xl="6">
        <AddRestaurant :restaurant="selectRest" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import AddRestaurant from '@/components/AddRestaurant.vue';
import { Restaurant } from '@/models/restaurant';

import Vue from 'vue';
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'Restaurant',
  components: {
    AddRestaurant
  },
  props: ['name'],
  computed: {
    ...mapState(['restaurants']),
    selectRest(): Restaurant {
      const emptyRest: Restaurant = {
        name: '',
        type: '',
        location: '',
        address: '',
        description: '',
        visited: false,
        mapsLink: ''
      };
      if (this.name) {
        const sel = this.$store.getters.getRest(this.name);
        return sel ? sel : emptyRest;
      }
      return emptyRest;
    }
  }
});
</script>

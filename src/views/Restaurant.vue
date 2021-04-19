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
import AddRestaurant from '@/components/Restaurant/AddRestaurant.vue';
import { Restaurant } from '@/models/restaurant';

import Vue from 'vue';
import { mapActions, mapState } from 'vuex';

export default Vue.extend({
  name: 'Restaurant',
  components: {
    AddRestaurant,
  },
  props: ['name'],
  computed: {
    ...mapState('restaurants', ['restaurants']),
    selectRest(): Restaurant {
      const sel = this.$store.getters['restaurants/getRest'](this.name);
      return sel
        ? sel
        : {
            name: '',
            type: '',
            location: '',
            address: '',
            description: '',
            visited: false,
            mapsLink: '',
          };
    },
  },
  methods: {
    ...mapActions('restaurants', ['fetchRestaurants']),
  },
  async created() {
    await this.fetchRestaurants();
  },
});
</script>

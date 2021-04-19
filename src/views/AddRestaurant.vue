<template>
  <v-container fluid>
    <v-row align="center" justify="center" v-if="editMode">
      <v-col cols="12" md="6" lg="6" xl="6">
        <AddRestaurantForm :restaurant="selectRest" @cancel="cancel" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import AddRestaurantForm from '@/components/Restaurant/AddRestaurantForm.vue';
import { Restaurant } from '@/models/restaurant';

import Vue from 'vue';
import { mapActions, mapState } from 'vuex';

export default Vue.extend({
  name: 'Restaurant',
  components: {
    AddRestaurantForm,
  },
  props: ['name'],
  data() {
    return {
      editMode: true,
    };
  },
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
    cancel() {
      this.$router.push({ name: 'Home' });
    },
  },
  async created() {
    await this.fetchRestaurants();
  },
});
</script>

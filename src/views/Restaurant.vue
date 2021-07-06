<template>
  <v-container fluid>
    <v-row v-if="editMode" align="center" justify="center">
      <v-col cols="12" md="6" lg="6" xl="6">
        <AddRestaurantForm
          :restaurant="selectRest"
          @cancel="editMode = !editMode"
        />
      </v-col>
    </v-row>
    <v-row v-else align="center" justify="center">
      <v-col cols="12" md="6" lg="6" xl="6">
        <RestaurantComponent
          v-if="selectRest.name"
          :restaurant="selectRest"
          @editMode="editMode = !editMode"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import AddRestaurantForm from '@/components/Restaurant/AddRestaurantForm.vue';
import RestaurantComponent from '@/components/Restaurant/RestaurantComponent.vue';
import { Restaurant } from '@/models/restaurant';

import Vue from 'vue';
import { mapActions, mapState } from 'vuex';

export default Vue.extend({
  name: 'Restaurant',
  components: {
    AddRestaurantForm,
    RestaurantComponent,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      editMode: false,
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
  async created(): Promise<void> {
    await this.fetchRestaurants();
  },
  methods: {
    ...mapActions('restaurants', ['fetchRestaurants']),
  },
});
</script>

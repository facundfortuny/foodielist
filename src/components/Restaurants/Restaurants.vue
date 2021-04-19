<template>
  <v-card class="mx-auto" max-width="500" tile>
    <v-card-title>RESTAURANTS</v-card-title>
    <v-card-text>
      <v-form>
        <v-select
          cols="6"
          v-model="selectedLoc"
          :items="locations"
          label="Location"
          data-vv-name="location"
        ></v-select>
        <v-text-field cols="6" label="Name" v-model="name" />
        <v-text-field cols="6" label="Type" v-model="type" />
        <v-checkbox
          v-model="excludeVisited"
          label="Remove visited"
        ></v-checkbox>
        <v-divider></v-divider>
      </v-form>
      <v-row align="center" justify="center">
        <v-btn-toggle
          tile
          group
          v-model="menu"
          mandatory
          cols="6"
          md="6"
          lg="6"
          xl="6"
        >
          <v-btn x-large align-center :value="'map'">
            <v-icon>mdi-map-marker-outline</v-icon>
          </v-btn>
          <v-btn x-large align-center :value="'list'">
            <v-icon>mdi-format-list-checks</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-row>
    </v-card-text>
    <v-card-text>
      <RestaurantsList v-if="menu === 'list'" :restaurants="restaurants" />
      <RestaurantsMap v-if="menu === 'map'" :restaurants="restaurants" />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { Restaurant } from '@/models/restaurant';
import RestaurantsList from '@/components/Restaurants/RestaurantsList.vue';
import RestaurantsMap from '@/components/Restaurants/RestaurantsMap.vue';

export default Vue.extend({
  name: 'Restaurants',
  components: {
    RestaurantsList,
    RestaurantsMap,
  },
  data() {
    return {
      name: '',
      excludeVisited: false,
      selectedLoc: 'Valencia',
      locations: ['', 'Valencia', 'Barcelona', 'Menorca', 'London'],
      type: '',
      menu: 'map',
    };
  },
  computed: {
    restaurants(): Restaurant[] {
      let filterRests = this.$store.state.restaurants.restaurants;

      filterRests =
        this.selectedLoc !== ''
          ? filterRests.filter(
              (rest: Restaurant) => rest.location === this.selectedLoc
            )
          : filterRests;

      filterRests =
        this.name !== ''
          ? filterRests.filter((rest: Restaurant) =>
              rest.name.toLowerCase().includes(this.name.toLowerCase())
            )
          : filterRests;
      filterRests =
        this.type !== ''
          ? filterRests.filter((rest: Restaurant) =>
              rest.type.toLowerCase().includes(this.type.toLowerCase())
            )
          : filterRests;
      filterRests = this.excludeVisited
        ? filterRests.filter((rest: Restaurant) => !rest.visited)
        : filterRests;

      return filterRests;
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

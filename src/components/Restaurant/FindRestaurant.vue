<template>
  <gmap-autocomplete
    class="introInput"
    @place_changed="setRestaurant"
    :value="restaurant"
  >
    <template v-slot:input="slotProps">
      <v-text-field
        ref="input"
        data-vv-name="Place"
        v-on:listeners="slotProps.listeners"
        v-on:attrs="slotProps.attrs"
      >
      </v-text-field>
    </template>
  </gmap-autocomplete>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'FindRestaurant',
  data() {
    return {
      restaurant: {},
    };
  },
  methods: {
    setRestaurant(place: any) {
      if (!place) return;

      const position = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      this.restaurant = {
        name: place.name,
        position: position,
        mapsLink: place.url,
        address: place.formatted_address,
        website: place.website ? place.website : '',
      };
      this.$emit('restaurant', this.restaurant);
    },
  },
});
</script>

<template>
  <gmap-autocomplete
    class="introInput"
    :value="restaurant"
    @place_changed="setRestaurant"
  >
    <template #input="slotProps">
      <v-text-field
        ref="input"
        data-vv-name="Place"
        @listeners="slotProps.listeners"
        @attrs="slotProps.attrs"
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

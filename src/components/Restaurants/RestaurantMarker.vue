<template>
  <svg width="40" height="40" viewBox="0 0 40 40">
    <defs>
      <circle id="my-location-a" cx="20" cy="20" r="10" />
    </defs>
    <g fill="none" fill-rule="evenodd">
      <use :fill="fillColor" xlink:href="#my-location-a" />
      <circle
        cx="20"
        cy="20"
        r="11"
        :stroke="strokeColor"
        stroke-opacity="0.3"
        stroke-width="6"
      />
      <circle
        cx="20"
        cy="20"
        r="10"
        stroke="#FFF"
        stroke-linejoin="square"
        stroke-width="2"
      />
    </g>
  </svg>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'RestaurantMarker',
  props: ['fillColor', 'strokeColor'],
});
</script>

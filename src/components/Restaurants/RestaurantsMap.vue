<template>
  <GmapMap
    v-if="!loading"
    :options="mapConfig"
    :center="mapCenter"
    class="gmap"
  >
    <gmap-marker
      v-for="marker in restaurants"
      :key="marker.name"
      :position="getLocation(marker.position)"
      :clickable="true"
      :draggable="false"
      :shape="shape"
      @click="openInfo(marker)"
    ></gmap-marker>
  </GmapMap>
</template>

<script lang="ts">
import Vue from 'vue';
import { GMapOptions } from '@/models/GMapOptions';
import { gmapApi } from 'gmap-vue';

export default Vue.extend({
  name: 'RestaurantsMap',
  props: ['restaurants'],
  data() {
    return {
      mapCenter: {
        lat: 39.462426,
        lng: -0.376303
      },
      loading: false,
      description: '',
      marker: {
        name: '',
        location: {}
      },
      shape: {
        coords: [10, 10, 10, 15, 15, 15, 15, 10],
        type: 'poly'
      }
    };
  },
  computed: {
    google: gmapApi,
    mapConfig(): GMapOptions {
      return {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false,
        zoom: 14
      };
    }
  },
  methods: {
    setLocation() {
      navigator.geolocation.getCurrentPosition(position => {
        this.mapCenter.lat = position.coords.latitude;
        this.mapCenter.lng = position.coords.longitude;
      });
    },
    openInfo(marker: any) {
      this.$router.push({ name: 'Restaurant', params: { name: marker.name } });
    },
    getLocation(position: any) {
      return {
        lat: position.latitude,
        lng: position.longitude
      };
    }
  },
  async created() {
    this.setLocation();
  }
});
</script>

style="width: ; height: 500px"
<style lang="scss" scoped>
.gmap {
  width: 470px;
  height: 400px;
}

@media screen and (max-width: 400px) {
  .gmap {
    width: 300px;
    height: 500px;
  }
}
</style>

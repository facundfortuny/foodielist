<template>
  <GmapMap
    v-if="!loading"
    :options="mapConfig"
    :center="mapCenter"
    class="gmap"
  >
    <template v-if="restaurants.length > 0">
      <gmap-marker
        :key="marker.name"
        v-for="(marker, index) in restaurants"
        :position="getLocation(marker.position)"
        :clickable="true"
        :draggable="false"
        :shape="shape"
        :icon="
          marker.visited
            ? 'http://maps.google.com/mapfiles/ms/micons/yellow.png'
            : 'http://maps.google.com/mapfiles/ms/icons/red.png'
        "
        @click="openInfo(marker, index)"
        @dblclick="openPage(marker)"
      ></gmap-marker>
      <gmap-info-window
        :options="infoOptions"
        :position="infoPosition"
        :opened="infoOpen"
        @closeclick="infoOpen = false"
      >
        <div v-html="infoContent"></div>
      </gmap-info-window>
    </template>
  </GmapMap>
</template>

<script lang="ts">
import Vue from 'vue';
import { GMapOptions } from '@/models/GMapOptions';
import { Restaurant } from '@/models/restaurant';
import { gmapApi } from 'gmap-vue';

export default Vue.extend({
  name: 'RestaurantsMap',
  props: ['restaurants'],
  data() {
    return {
      mapCenter: {
        lat: 39.47002481761118,
        lng: -0.37721269017276177,
      },
      loading: false,
      description: '',
      marker: {
        name: '',
        location: {},
      },
      shape: {
        coords: [10, 10, 10, 15, 15, 15, 15, 10],
        type: 'poly',
      },
      infoContent: '',
      infoPosition: {
        lat: 39.462426,
        lng: -0.376303,
      },
      infoOpen: false,
      currentInfo: -1,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
    };
  },
  computed: {
    google: gmapApi,
    mapConfig(): GMapOptions {
      return {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: true,
        fullscreenControl: true,
        disableDefaultUi: true,
        zoom: 14,
        clickableIcons: false,
      };
    },
  },
  methods: {
    setLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.mapCenter.lat = position.coords.latitude;
        this.mapCenter.lng = position.coords.longitude;
      });
    },
    openInfo(marker: Restaurant, idx: number) {
      this.infoPosition = {
        lat: marker.position.latitude,
        lng: marker.position.longitude,
      };
      this.infoContent = this.getInfoContent(marker);

      if (this.currentInfo == idx) {
        this.infoOpen = !this.infoOpen;
      } else {
        this.infoOpen = true;
        this.currentInfo = idx;
      }
    },
    getInfoContent(marker: Restaurant) {
      return `<h3 style="padding: 5px;">${marker.name}</h3>`;
    },
    openPage(marker: Restaurant) {
      this.$router.push({ name: 'Restaurant', params: { name: marker.name } });
    },
    getLocation(position: { latitude: string; longitude: string }) {
      return {
        lat: position.latitude,
        lng: position.longitude,
      };
    },
  },
  watch: {
    restaurants: {
      handler: function (restaurants) {
        if (restaurants.length === 1) {
          const rest = this.restaurants[0];
          this.mapCenter = {
            lat: rest.position.latitude,
            lng: rest.position.longitude,
          };
          this.marker = rest;
        } else {
          this.setLocation();
        }
      },
      deep: true,
      immediate: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.gmap {
  width: 470px;
  height: 400px;
}

@media screen and (max-width: 400px) {
  .gmap {
    width: 300px;
    height: 400px;
  }
}
</style>

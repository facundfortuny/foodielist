<template>
  <GmapMap
    v-if="!loading"
    :options="mapConfig"
    :center="mapCenter"
    class="gmap"
  >
    <template v-if="restaurants.length > 0">
      <gmap-marker
        v-for="(marker, index) in restaurants"
        :key="marker.name"
        :position="getLocation(marker.position)"
        :clickable="true"
        :draggable="false"
        :shape="shape"
        :icon="getColoredIconUrl(marker.visited)"
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
import { gmapApi } from 'gmap-vue';
import { GMapOptions, Location } from '@/models/GMapOptions';
import { Restaurant } from '@/models/restaurant';
import { defaultCoords, locationCoords } from '@/helpers/locations';
import { getColoredIconUrl } from '@/components/Restaurants/icon-generator';

export default Vue.extend({
  name: 'RestaurantsMap',
  props: {
    restaurants: {
      type: Array as () => Array<Restaurant>,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    useLocation: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      mapCenter: defaultCoords,
      loading: false,
      description: '',
      marker: {
        name: '',
        location: {},
      },
      shape: {
        coords: [0, 0, 60],
        type: 'circle',
      },
      infoContent: '',
      infoPosition: defaultCoords,
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
      if (this.useLocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.mapCenter.lat = position.coords.latitude;
          this.mapCenter.lng = position.coords.longitude;
        });
      } else {
        this.mapCenter = this.getDefaultMapCenter();
      }
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
      return `<h3 style="padding: 5px;">
      					<a href="${window.location.origin}${
        this.$router.resolve({
          name: 'Restaurant',
          params: { name: marker.name },
        }).href
      }" target="_blank" style=" color: ${
        marker.visited ? '#6991FD' : '#FECD52'
      }; text-decoration: none">
						${marker.name}
					</a></h3>`;
    },
    openPage(marker: Restaurant) {
      this.$router.push({ name: 'Restaurant', params: { name: marker.name } });
    },
    getLocation(position: Location) {
      return {
        lat: position.latitude,
        lng: position.longitude,
      };
    },
    getColoredIconUrl(visited: boolean) {
      const color = visited ? '#6991FD' : '#FECD52';
      return getColoredIconUrl(color, color);
    },
    getDefaultMapCenter() {
      return locationCoords[this.location]
        ? locationCoords[this.location]
        : locationCoords['Default'];
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
    location: {
      handler: function () {
        this.setLocation();
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

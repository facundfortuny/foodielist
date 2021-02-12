<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" lg="6" xl="6">
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
          </v-card-text>
          <v-card-text>
            <v-list rounded>
              <v-list-item-group color="primary">
                <v-list-item
                  v-for="(item, i) in restaurants"
                  :key="i"
                  :to="{ name: 'Restaurant', params: { name: item.name } }"
                >
                  <v-list-item-avatar>
                    <v-icon class="primary" dark>
                      mdi-silverware-fork-knife
                    </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                    <v-list-item-subtitle
                      v-text="item.type"
                    ></v-list-item-subtitle>
                    <v-list-item-subtitle
                      class="font-italic"
                      v-text="item.location"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-avatar v-if="item.visited">
                    <v-icon class="info" dark>
                      mdi-checkbox-marked-circle
                    </v-icon>
                  </v-list-item-avatar>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Restaurant } from '@/models/restaurant';

export default Vue.extend({
  name: 'Home',
  data() {
    return {
      name: '',
      excludeVisited: false,
      selectedLoc: 'Valencia',
      locations: ['', 'Valencia', 'Barcelona', 'Menorca', 'London'],
      type: ''
    };
  },
  computed: {
    restaurants(): Restaurant[] {
      let filterRests = this.$store.state.restaurants;

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
    }
  }
});
</script>

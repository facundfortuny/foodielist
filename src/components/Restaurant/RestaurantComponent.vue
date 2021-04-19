<template>
  <v-card class="mx-auto" max-width="500" tile>
    <v-card-title>
      {{ restaurant.name }}
    </v-card-title>

    <v-card-text>
      <v-avatar color="info" v-if="restaurant.visited">
        <v-icon dark> mdi-checkbox-marked-circle </v-icon>
      </v-avatar>
      <div class="my-4 subtitle-1">
        {{ restaurant.type }}
      </div>
      <div class="my-4 subtitle-1">
        <a
          :href="restaurant.website"
          class="mr-0 grey--text text--darken-3"
          rel="noopener"
          target="_blank"
          v-text="restaurant.website"
        />
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-text v-if="restaurant.description !== ''">
      <h3>Description</h3>
      <div>
        {{ restaurant.description }}
      </div>
    </v-card-text>

    <v-divider class="mx-4" v-if="restaurant.description !== ''"></v-divider>

    <v-card-text>
      <v-row>
        <v-col>
          <RestaurantsMap :restaurants="[...restaurant]" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h3 class="mx-4 text-center">
            <a
              :href="restaurant.mapsLink"
              class="mr-0 grey--text text--darken-3"
              rel="noopener"
              target="_blank"
              v-text="restaurant.address"
            />
          </h3>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-btn class="ma-2" outlined color="secondary" @click="cancel">
        Back
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" otulined @click="edit"> Edit </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import RestaurantsMap from '@/components/Restaurants/RestaurantsMap.vue';

export default Vue.extend({
  name: 'RestaurantComponent',
  components: {
    RestaurantsMap,
  },
  props: ['restaurant'],
  methods: {
    cancel() {
      this.$router.push({ name: 'Home' });
    },
    edit() {
      this.$emit('editMode');
    },
  },
});
</script>

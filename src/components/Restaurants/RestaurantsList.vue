<template>
  <v-list rounded>
    <v-list-item-group color="primary">
      <v-list-item
        v-for="(item, i) in restaurants"
        :key="i"
        :to="{ name: 'Restaurant', params: { name: item.name } }"
      >
        <v-list-item-avatar>
          <v-icon class="primary" dark> mdi-silverware-fork-knife </v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
          <v-list-item-subtitle v-text="item.type"></v-list-item-subtitle>
          <v-list-item-subtitle
            class="font-italic"
            v-text="item.location"
          ></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-avatar v-if="item.visited">
          <v-icon class="blue" dark>mdi-checkbox-marked-circle </v-icon>
        </v-list-item-avatar>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'RestaurantsList',
  props: ['restaurants'],
});
</script>

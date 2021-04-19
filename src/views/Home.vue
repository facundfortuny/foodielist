<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" lg="6" xl="6">
        <Restaurants />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Restaurants from '@/components/Restaurants/Restaurants.vue';

export default Vue.extend({
  components: { Restaurants },
  name: 'Home',
});
</script>

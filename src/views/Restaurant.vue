<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" lg="6" xl="6">
        <AddRestaurant />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import AddRestaurant from '@/components/AddRestaurant.vue';

export default {
  name: 'Restaurant',
  components: {
    AddRestaurant
  },
  data() {
    return {
      showPassword: false
    };
  }
};
</script>

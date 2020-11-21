<template>
  <v-app-bar app absolute elevate-on-scroll color="primary accent-4">
    <router-link :to="{ name: 'Home' }">
      <div class="d-flex align-center">
        <v-img
          alt="Restaurants"
          class="shrink mr-2"
          contain
          src="../assets/adventure.svg"
          transition="scale-transition"
          width="40"
        />

        <h1 class="secondary--text">Foodie List</h1>
      </div>
    </router-link>

    <v-spacer></v-spacer>

    <template v-if="user.name">
      <v-btn icon :to="{ name: 'RestaurantCreate' }">
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-btn icon @click="logout()">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      user: state => state.auth.userProfile
    })
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
    }
  }
};
</script>

<style></style>

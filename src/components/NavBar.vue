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

    <v-btn icon :to="{ name: 'RestaurantCreate' }">
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-menu right bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="() => {}">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {};
</script>

<style></style>

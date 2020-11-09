<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" lg="6" xl="6">
        <v-card class="mx-auto" max-width="500" tile>
          <v-list rounded>
            <v-subheader>RESTAURANTS</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item v-for="(item, i) in restaurants" :key="i">
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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Home',
  computed: {
    restaurants() {
      return this.$store.getters.allRest;
    }
  },
  mounted() {
    this.$store.dispatch('setRestaurants');
  }
});
</script>

<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <form @submit.prevent="submit">
      <validation-provider v-slot="{ errors }" name="name" rules="required">
        <v-text-field
          v-model="rest.name"
          :error-messages="errors"
          label="Name"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider v-slot="{ errors }" name="type" rules="required">
        <v-text-field
          v-model="rest.type"
          :error-messages="errors"
          label="Type"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider v-slot="{ errors }" name="location" rules="required">
        <v-select
          v-model="rest.location"
          :items="locations"
          :error-messages="errors"
          label="Location"
          data-vv-name="location"
          required
        ></v-select>
      </validation-provider>
      <validation-provider v-slot="{ errors }" name="visited">
        <v-checkbox
          v-model="rest.visited"
          :error-messages="errors"
          value="1"
          label="Visited"
          type="visited"
        ></v-checkbox>
      </validation-provider>

      <validation-provider
        v-slot="{ errors }"
        name="description"
        rules="max:140"
      >
        <v-text-field
          v-model="rest.description"
          :counter="140"
          :error-messages="errors"
          label="Description"
        ></v-text-field>
      </validation-provider>

      <v-btn class="mr-4" type="submit" :disabled="invalid">
        Save
      </v-btn>
      <v-btn @click="cancel">
        Cancel
      </v-btn>
    </form>
  </validation-observer>
</template>

<script>
import { required, max } from 'vee-validate/dist/rules';
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from 'vee-validate';

setInteractionMode('eager');

extend('required', {
  ...required,
  message: '{_field_} can not be empty'
});

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters'
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  name: 'AddRestaurant',
  props: ['restaurant'],
  data: () => ({
    locations: ['Barcelona', 'Menorca', 'Valencia', 'London']
  }),

  computed: {
    editMode() {
      return !!this.restaurant.id;
    },
    rest() {
      return this.restaurant;
    }
  },

  methods: {
    submit() {
      this.$refs.observer.validate();
      if (this.editMode) {
        this.$store.dispatch('updateRestaurant', this.rest).then(() => {
          this.$router.push({ name: 'Home' });
        });
      } else {
        this.$store.dispatch('saveRestaurant', this.rest).then(() => {
          this.$router.push({ name: 'Home' });
        });
      }
    },
    cancel() {
      this.$refs.observer.reset();
      this.$router.push({ name: 'Home' });
    }
  }
};
</script>

<style></style>

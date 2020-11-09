<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <form @submit.prevent="submit">
      <validation-provider v-slot="{ errors }" name="Name" rules="required">
        <v-text-field
          v-model="name"
          :error-messages="errors"
          label="Name"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider v-slot="{ errors }" name="type" rules="required">
        <v-text-field
          v-model="type"
          :error-messages="errors"
          label="Type"
          required
        ></v-text-field>
      </validation-provider>
      <validation-provider v-slot="{ errors }" name="location" rules="required">
        <v-select
          v-model="location"
          :items="locations"
          :error-messages="errors"
          label="Location"
          data-vv-name="location"
          required
        ></v-select>
      </validation-provider>
      <validation-provider v-slot="{ errors }" name="visited">
        <v-checkbox
          v-model="visited"
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
          v-model="description"
          :counter="140"
          :error-messages="errors"
          label="Description"
        ></v-text-field>
      </validation-provider>

      <v-btn class="mr-4" type="submit" :disabled="invalid">
        Save
      </v-btn>
      <v-btn @click="clear">
        Clear
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
  data: () => ({
    name: '',
    type: '',
    location: null,
    address: '',
    description: '',
    visited: false,
    locations: ['Barcelona', 'Menorca', 'Valencia', 'London']
  }),

  methods: {
    submit() {
      this.$refs.observer.validate();
    },
    clear() {
      this.name = '';
      this.type = '';
      this.location = null;
      this.address = '';
      this.description = '';
      this.visited = false;
      this.$refs.observer.reset();
    }
  }
};
</script>

<style></style>

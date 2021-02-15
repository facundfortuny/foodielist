<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <form @submit.prevent="submit">
      <validation-provider v-slot="{ errors }" name="name" rules="required">
        <v-text-field
          v-model="form.name"
          :error-messages="errors"
          label="Name"
          required
        ></v-text-field>
      </validation-provider>

      <validation-provider v-slot="{ errors }" name="type" rules="required">
        <v-text-field
          v-model="form.type"
          :error-messages="errors"
          label="Type"
          required
        ></v-text-field>
      </validation-provider>

      <validation-provider v-slot="{ errors }" name="location" rules="required">
        <v-select
          v-model="form.location"
          :items="locations"
          :error-messages="errors"
          label="Location"
          data-vv-name="location"
          required
        ></v-select>
      </validation-provider>

      <validation-provider v-slot="{ errors }" name="address" rules="max:140">
        <v-text-field
          v-model="form.address"
          :counter="140"
          :error-messages="errors"
          label="Address"
        ></v-text-field>
      </validation-provider>

      <validation-provider v-slot="{ errors }" name="mapsLink" rules="max:140">
        <v-text-field
          v-model="form.mapsLink"
          :counter="140"
          :error-messages="errors"
          label="GMap Link"
        ></v-text-field>
      </validation-provider>

      <validation-provider
        v-slot="{ errors }"
        name="description"
        rules="max:140"
      >
        <v-text-field
          v-model="form.description"
          :counter="140"
          :error-messages="errors"
          label="Description"
        ></v-text-field>
      </validation-provider>

      <validation-provider v-slot="{ errors }" name="visited">
        <v-checkbox
          v-model="form.visited"
          :error-messages="errors"
          value="1"
          label="Visited"
          type="visited"
        ></v-checkbox>
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
import Vue from 'vue';
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

export default Vue.extend({
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
    form() {
      return { ...this.restaurant };
    }
  },

  methods: {
    submit() {
      this.$refs.observer.validate();
      if (this.editMode) {
        this.$store
          .dispatch('restaurants/updateRestaurant', this.form)
          .then(() => {
            this.$router.push({ name: 'Home' });
          });
      } else {
        this.$store
          .dispatch('restaurants/saveRestaurant', this.form)
          .then(() => {
            this.$router.push({ name: 'Home' });
          });
      }
    },
    cancel() {
      this.$refs.observer.reset();
      this.$router.push({ name: 'Home' });
    }
  }
});
</script>

<style></style>

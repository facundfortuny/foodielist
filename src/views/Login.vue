<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" lg="6" xl="6">
        <v-img
          src="../assets/adventure.svg"
          class="my-3"
          contain
          height="200"
        />
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" lg="3" xl="3">
        <v-card>
          <v-card-title>
            <h1 class="secondary--text">Login</h1>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Username"
                prepend-icon="mdi-account-circle"
              />
              <v-text-field
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
              />
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn block color="primary">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      showPassword: false
    };
  }
};
</script>

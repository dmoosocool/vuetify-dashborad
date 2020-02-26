<template>
  <v-app>
    <h1>hello vuetify</h1>
    <v-row align="center">
      <v-col class="text-center" cols="12" sm="4">
        <v-btn outlined @click="goAuth()">go to auth page.</v-btn>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  methods: {
    goAuth: function() {
      this.$router.push({ name: "Auth" });
    }
  }
};
</script>

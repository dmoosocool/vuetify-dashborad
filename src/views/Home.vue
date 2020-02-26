<template>
  <v-app>
    <Login v-if="!isLogin" />
    <h1 v-else>hello vuetify</h1>
  </v-app>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/Login.vue";
export default {
  name: "Home",
  components: { Login },
  data: function() {
    return {
      isLogin: false
    };
  },
  async mounted() {
    // await this.axios("http://localhost:3000");
  }
};
</script>

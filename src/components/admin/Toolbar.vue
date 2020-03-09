<template>
  <!-- <v-card color="grey lighten-4" flat height="200px" tile>
    <v-toolbar dense dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>-->
  <v-app-bar app tile flat>
    <v-app-bar-nav-icon @click.stop="switchDrawer" />
    <v-toolbar-title>酒店管理后台</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-avatar color="indigo" size="38">
      <v-icon dark>mdi-account-circle</v-icon>
    </v-avatar>
    <v-btn icon>
      <v-icon>mdi-export</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
// Utilities
export default {
  methods: {
    switchDrawer () {
      this.$store.commit('app/toggleMiniVariant');
    }
  }
}
</script>

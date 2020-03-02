<template>
  <v-app>
    <Drawer />
    <router-view></router-view>
  </v-app>
</template>
<script>
import Drawer from "@/components/admin/Drawer.vue";
export default {
  components: {
    Drawer
  }
};
</script>
<style lang="scss">
// @import "@/styles/index.scss";
/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>

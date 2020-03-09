<template>
  <v-app>
    <Drawer />
    <Toolbar />
    <div class="pa-10">
      <v-content>
        <v-slide-x-reverse-transition hide-on-leave>
          <router-view />
        </v-slide-x-reverse-transition>
      </v-content>
    </div>
  </v-app>
</template>
<script>
import Drawer from "@/components/admin/Drawer.vue";
import Toolbar from '@/components/admin/Toolbar.vue';
export default {
  components: {
    Drawer,
    Toolbar
  },
};
</script>
<style lang="scss">
/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>

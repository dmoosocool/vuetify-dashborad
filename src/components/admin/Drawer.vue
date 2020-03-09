
<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="drawer"
    app
    color="grey lighten-4"
    floating
    persistent
    :mini-variant="miniVariant"
    mobile-break-point="991"
    @mini-variant-state-change="miniVariantStateChange"
    width="260"
  >
    <v-card class="mx-auto" max-width="300" tile>
      <v-list dense>
        <v-subheader>Hotel</v-subheader>
        <v-list-item-group>
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.link">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
// Utilities
// import { mapMutations, mapState } from "vuex";
export default {
  data: () => ({
    items: [],
    adminItems: [
      { text: '仪表盘', icon: 'mdi-home', "link": { name: "AdminHome" } },
      { text: '用户管理', icon: 'mdi-account', "link": { name: "AdminUser" } },
      { text: '物资管理', icon: 'mdi-cart', "link": { name: "AdminGood" } },
      { text: '客房管理', icon: 'mdi-home-group', "link": { name: "AdminRoom" } },
    ],

    guestItems: [
      { text: '仪表盘', icon: 'mdi-home', "link": { name: "MemberHome" } },
      { text: '客房管理', icon: 'mdi-door-closed-lock', "link": { name: "MemberRoom" } },
      { text: '会员管理', icon: 'mdi-account-details', "link": { name: "MemberInfo" } },
      { text: '账户管理', icon: 'mdi-account-cog', "link": { name: "MemberAccount" } },
    ]

  }),
  computed: {
    // ...mapState("app", ["drawer", "miniVariant"]),
    drawer: {
      get () {
        return this.$store.state.app.drawer
      },

      set (drawer) {
        this.$store.commit('app/setDrawer', drawer)

      }
    },

    miniVariant: {
      get () {
        return this.$store.state.app.miniVariant
      },

      set (miniVariant) {
        this.$store.commit('app/setMiniVariant', miniVariant)
      }
    }
  },

  mounted () {
    if (this.$route.fullPath.indexOf('member') > -1) {
      this.items = this.guestItems;
    } else {
      this.items = this.adminItems
    }


  },

  methods: {
    miniVariantStateChange: (name) => {
      // this.miniVariantState = !this.miniVariantState;
      console.log(name);
    }
  }
};
</script>

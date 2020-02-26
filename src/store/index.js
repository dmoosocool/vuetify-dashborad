import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import VuePersistence from "vuex-persistedstate";
Vue.use(Vuex);

const vuexLocal = VuePersistence({
  storage: window.localStorage,
  paths: ["auth"]
});

export default new Vuex.Store({
  modules: {
    auth
  },
  plugins: [vuexLocal]
});

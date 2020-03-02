import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import dashboard from "./modules/dashboard";
import VuePersistence from "vuex-persistedstate";
Vue.use(Vuex);

const vuexLocal = VuePersistence({
  storage: window.localStorage,
  paths: ["auth"]
});

export default new Vuex.Store({
  modules: {
    auth,
    app: dashboard
  },
  plugins: [vuexLocal]
});

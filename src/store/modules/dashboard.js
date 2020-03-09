import { set, toggle } from "@/utils/vuex";

// import path from "path";
export default {
  namespaced: true,
  state: {
    drawer: null,
    miniVariant: true
  },
  mutations: {
    setDrawer: set("drawer"),
    toggleDrawer: toggle("drawer"),

    setMiniVariant: set("miniVariant"),
    toggleMiniVariant: toggle("miniVariant")
  }
};

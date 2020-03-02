import { set, toggle } from "@/utils/vuex";

// import path from "path";
export default {
  namespaced: true,
  state: {
    drawer: null,
    color: "success"
    // image: path.relative(
    //   __dirname,
    //   path.join(process.cwd(), "src", "assets", "images", "sidebar-bg.jpg")
    // )
    //image: "./images/sitebar-bg.jpg"
  },
  mutations: {
    setDrawer: set("drawer"),
    setImage: set("image"),
    setColor: set("color"),
    toggleDrawer: toggle("drawer")
  }
};

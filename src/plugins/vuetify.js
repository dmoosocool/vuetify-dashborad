import Vue from "vue";
import Vuetify from "vuetify/lib";
import "material-design-icons-iconfont";
import confirm from "./confirm";
Vue.use(Vuetify);

const vuetify = new Vuetify({
  icons: {
    iconfont: "md"
  }
});
Vue.use(confirm, { vuetify });
export default vuetify;

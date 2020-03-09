import Vue from "vue";
import Vuetify from "vuetify/lib";
import "material-design-icons-iconfont";
import confirm from "./confirm";

import zhHans from "vuetify/es5/locale/zh-Hans";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  lang: {
    locales: { zhHans },
    current: "zhHans"
  },
  icons: {
    iconfont: "md"
  }
});
Vue.use(confirm, { vuetify });
export default vuetify;

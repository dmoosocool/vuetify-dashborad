import axios from "@/plugins/axios";
import store from "@/store";
import router from "@/router";
const api = axios.getAxios();

export default {
  async login({ username, password }) {
    const { data } = await api.post("auth/login", {
      email: username,
      password
    });

    store.dispatch("auth/logined", {
      id: data.id,
      username: data.username,
      email: data.email,
      nickname: data.nickname,
      token: data.token
    });

    router.push({ name: "Home" });
  }
};

// import auth from "@/api/auth";

// initial state
const state = {
  me: {}
};

// getters
const getters = {};

const actions = {
  logined({ commit }, me) {
    commit("login", me);
  },

  logout({ commit }) {
    commit("logout");
  }
};

const mutations = {
  login(state, me) {
    state.me = {
      id: me.id,
      username: me.username,
      email: me.email,
      nickname: me.nickname
    };
    state.token = me.token;
  },

  logout(state) {
    state.token = null;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

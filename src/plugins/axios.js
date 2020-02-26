"use strict";

import Vue from "vue";
import axios from "axios";

import store from "@/store";
// import router from "@/router";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

let config = {
  baseURL: process.env.baseURL || process.env.apiUrl || "",
  timeout: 60 * 1000 // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  config => {
    if (store.state.token && store.state.auth) {
      config.hearders.Authorization = `Bearer ${store.state.token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  response => {
    return response;
  },

  async function(error) {
    if (error.response) {
      const { $confirm } = Vue.prototype;

      if (error.response.data && error.response.data.message) {
        // 如果有message值 则输出.
        const message = error.response.data.message;
        // 使用 confirm 组件提示用户.
        await $confirm(message, {
          buttonTrueText: "确定",
          buttonFalseText: false,
          color: "error",
          title: "温馨提示"
        });
      }

      switch (error.response.status) {
        default:
          if (error.response) {
            return Promise.resolve(error.response);
          }
          break;
      }

      return Promise.reject(error.reponse.data);
    }

    // 返回response 为 null 的情况, 底层不处理.
    return Promise.resolve(error.reponse);
  }
);

Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    }
  });
};

Plugin.getAxios = function() {
  return _axios;
};

Vue.use(Plugin);

export default Plugin;

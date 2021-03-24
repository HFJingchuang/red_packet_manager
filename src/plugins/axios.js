import Vue from "vue";
import axios from "axios";
import { Message } from "element-ui";
import router from "../router";

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.withCredentials = true;

// create axios instant
const instance = axios.create({ timeout: 10000 });

// request interceptors
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

// response interceptors
instance.interceptors.response.use(
  (res) => {
    //TODO 对不同错误的统一处理
    if (res.data) {
      return Promise.resolve(res);
    } else {
      if (res.data.code === 401) {
        router.push({
          path: "/login"
        });
        localStorage.removeItem("vuex");
      }
      return Promise.reject(res);
    }
  },
  (error) => {
    console.log(error);
    let { message } = error;
    if (message === "Network Error") {
      message = "系统接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    Message({
      message: message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default instance;

function plugin(app, axios) {
  if (plugin.installed) {
    return;
  }

  if (!axios) {
    console.error("You have to create axios instance");
    return;
  }

  plugin.installed = true;

  Object.defineProperties(app.prototype, {
    $axios: {
      get: function get() {
        return axios;
      }
    }
  });

  app.$axios = axios;
}

Vue.use(plugin, instance);

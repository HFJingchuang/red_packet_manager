import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// Plugins
import "./plugins";
// Directives
// Components
import "./components";
//styles
import "normalize.css/normalize.css";
import "@/assets/styles/index.scss";
import i18n from "./i18n";

import VueClipboards from "vue-clipboard2";
Vue.use(VueClipboards);

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  render: (h) => h(App)
}).$mount("#app");

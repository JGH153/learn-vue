import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router/routes";
import store from "./store/root.store";
import vuetify from "./plugins/vuetify";
import "./plugins/composition-api";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

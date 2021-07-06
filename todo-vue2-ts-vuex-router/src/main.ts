import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "vue-class-component/hooks"; // enables auto-complete

// use index pattern in folders?
import "./directives/Striked";
import "./filters/NumberToText";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

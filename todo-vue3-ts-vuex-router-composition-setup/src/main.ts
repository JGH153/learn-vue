import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/routes";
import { store } from "./store/root.store";

createApp(App).use(store).use(router).mount("#app");

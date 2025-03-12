import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import eventBus from "./plugins/event-bus";
import "./assets/styles.scss";

const app = createApp(App);

app.use(eventBus);
app.use(createPinia());
app.use(router);

app.mount("#app");

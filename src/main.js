import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import eventBus from "./plugins/event-bus";
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
    onNeedRefresh() {
        const userConfirmed = confirm("A new version is available. Reload now?");
        if (userConfirmed) {
            updateSW();
        }
    },
    onOfflineReady() {
        alert("The app is ready to work offline!");
    },
});

const app = createApp(App);

app.use(eventBus);
app.use(createPinia());
app.use(router);

app.mount("#app");

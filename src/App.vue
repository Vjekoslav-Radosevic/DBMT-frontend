<template>
    <router-view />
    <OfflineModal ref="offlineModal" />
</template>

<script>
import OfflineModal from "@/components/OfflineModal.vue";
import { registerSW } from "virtual:pwa-register";

export default {
    name: "App",
    components: { OfflineModal },
    mounted() {
        const updateSW = registerSW({
            onNeedRefresh: () => {
                const userConfirmed = confirm("A new version is available. Reload now?");
                if (userConfirmed) {
                    updateSW();
                }
            },
            onOfflineReady: () => {
                this.$refs.offlineModal.showModal();
            },
        });
    },
};
</script>

<style>
html,
body {
    width: 100vw;
    height: 100vh;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

#app {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    font-family: "DM Sans", sans-serif;
    font-optical-sizing: auto;
    font-weight: 500;
    font-size: 15px;
}

input {
    background-color: rgb(234, 234, 234);
    border: none;
    border-bottom: 2px solid green;
    padding: 8px;
    width: 100%;
    font-size: 15px;
}
</style>

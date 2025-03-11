<template>
    <router-view />
    <OfflineModal ref="offlineModalRef" />
    <NewVersionModal ref="newVersionModalRef" @reload-page="handleReload" />
</template>

<script>
import OfflineModal from "@/components/OfflineModal.vue";
import NewVersionModal from "@/components/NewVersionModal.vue";
import { registerSW } from "virtual:pwa-register";

export default {
    name: "App",
    components: { OfflineModal, NewVersionModal },
    data() {
        return {
            updateSW: null,
        };
    },
    mounted() {
        this.updateSW = registerSW({
            onNeedRefresh: () => {
                this.$refs.newVersionModalRef.show();
            },
            onOfflineReady: () => {
                this.$refs.offlineModalRef.showModal();
            },
        });
    },
    methods: {
        handleReload(reload) {
            if (reload) {
                this.updateSW();
            }
        },
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

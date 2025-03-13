<template>
    <AppHeader></AppHeader>
    <router-view />
    <OfflineModal ref="offlineModalRef" />
    <NewVersionModal ref="newVersionModalRef" @reload-page="handleReload" />
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import OfflineModal from "@/components/OfflineModal.vue";
import NewVersionModal from "@/components/NewVersionModal.vue";
import { registerSW } from "virtual:pwa-register";

export default {
    name: "App",
    components: { AppHeader, OfflineModal, NewVersionModal },
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

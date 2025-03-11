<template>
    <div v-if="visible" class="modal">
        <p>Ready to work offline!</p>
        <X class="offline-modal-x" @click="closeModal" />
    </div>
</template>

<script>
import { X } from "lucide-vue-next";
export default {
    name: "OfflineModal",
    components: { X },
    data() {
        return {
            visible: false,
        };
    },
    methods: {
        showModal() {
            this.visible = true;
        },
        closeModal() {
            this.visible = false;
        },
    },
};
</script>

<style scoped>
.modal {
    position: absolute;
    bottom: 12px;
    left: 12px;

    display: flex;
    justify-content: center;
    align-items: center;

    background: rgb(185, 185, 185);
    padding: 10px;
    border-radius: 5px;
}

.offline-modal-x {
    margin-left: 10px;
}

.offline-modal-x:hover {
    cursor: pointer;
}
</style>

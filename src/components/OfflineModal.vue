<template>
    <div v-if="visible" class="offline-dial">
        <p>Ready to work offline!</p>
        <X class="offline-dial__x" @click="closeModal" />
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

<style scoped lang="scss">
.offline-dial {
    position: absolute;
    bottom: 12px;
    left: 12px;

    display: flex;
    justify-content: center;
    align-items: center;

    background: rgb(185, 185, 185);
    padding: 10px;
    border-radius: 5px;

    &__x {
        margin-left: 10px;

        &:hover {
            cursor: pointer;
        }
    }
}
</style>

<template>
    <dialog ref="dialogRef" class="down-dial" @click="handleDialogClick">
        <div class="down-dial__content">
            <img :src="canvasImage" alt="Diagram Preview" v-if="canvasImage" class="down-dial__image" />
            <div>
                <input type="checkbox" id="transparency" class="down-dial__input" v-model="transparentBack" />
                <label for="transparency">Transparent background</label>
            </div>
            <div class="down-dial__buttons">
                <div class="down-dial__button down-dial__button--cancel" @click="closeDialog">Close</div>
                <div class="down-dial__button down-dial__button--confirm" @click="downloadImage">Download</div>
            </div>
        </div>
    </dialog>
</template>

<script>
export default {
    name: "DownloadDialog",
    props: ["canvasImage"],
    data() {
        return {
            transparentBack: false,
        };
    },
    methods: {
        closeDialog() {
            this.transparentBack = false;
            this.$refs.dialogRef.close();
        },
        handleDialogClick(event) {
            // Close the dialog if the click is outside the content
            const dialogContent = event.target.closest(".down-dial__content");
            if (!dialogContent) {
                this.closeDialog();
            }
        },
        downloadImage() {
            this.$eventBus.emit("download-image", this.transparentBack);
        },
    },
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.down-dial {
    border: none;
    border-radius: 5px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &::backdrop {
        background-color: rgba(0, 0, 0, 0.5);
    }

    &__content {
        padding: 20px;
    }

    &__image {
        width: 900px;
        height: auto;
        margin: 10px;
        border: 1px solid $system-tert;
        border-radius: 5px;
    }

    &__input {
        width: auto;
        font-size: 15px;
        margin: 10px;
        padding: 8px;
        border: none;
        border-bottom: 2px solid $accept-prim;
        background-color: $system-prim;
    }

    &__buttons {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    &__button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px 0;
        margin-left: 10px;
        padding: 8px;
        font-size: 12px;
        border-radius: 3px;

        &:hover {
            cursor: pointer;
            color: $text-sec;
        }

        &--confirm {
            color: $text-sec;
            background-color: $accept-prim;
            border: 1px solid $accept-prim;

            &:hover {
                background-color: $accept-sec;
            }
        }

        &--cancel {
            color: $text-sec;
            border: 1px solid $danger-prim;
            background-color: $danger-prim;

            &:hover {
                border: 1px solid $danger-sec;
                background-color: $danger-sec;
            }
        }
    }
}
</style>

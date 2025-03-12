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
            const dialogContent = event.target.closest(".dialog-content");
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
.down-dial {
    border: none;
    border-radius: 5px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &::backdrop {
        background-color: rgba(0, 0, 0, 0.5);
    }

    &__image {
        width: 900px;
        height: auto;
        margin: 10px;
        border: 1px solid black;
        border-radius: 5px;
    }

    &__input {
        width: auto;
        font-size: 15px;
        margin: 10px;
        padding: 8px;
        border: none;
        border-bottom: 2px solid green;
        background-color: rgb(234, 234, 234);
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
            color: white;
        }

        &--confirm {
            color: white;
            background-color: green;
            border: 1px solid green;

            &:hover {
                background-color: rgb(1, 151, 1);
            }
        }

        &--cancel {
            color: white;
            border: 1px solid rgb(213, 0, 0);
            background-color: rgb(213, 0, 0);

            &:hover {
                border: 1px solid red;
                background-color: red;
            }
        }
    }
}
</style>

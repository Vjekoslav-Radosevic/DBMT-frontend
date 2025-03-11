<template>
    <dialog ref="dialogRef" class="custom-dialog" @click="handleDialogClick">
        <div class="dialog-content">
            <img :src="canvasImage" alt="Canvas Preview" v-if="canvasImage" />
            <div>
                <input type="checkbox" id="transparency" v-model="transparentBack" />
                <label for="transparency">Transparent background</label>
            </div>
            <div class="element-buttons-container">
                <div class="element-button cancel-button" @click="closeDialog">Close</div>
                <div class="element-button confirm-button" @click="downloadImage">Download</div>
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

<style scoped>
.custom-dialog {
    border: none;
    border-radius: 5px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 50%; /* Vertically center */
    left: 50%; /* Horizontally center */
    transform: translate(-50%, -50%);
}

.custom-dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
}

img {
    width: 900px;
    height: auto; /* Maintain aspect ratio */
    margin: 10px;
    border: 1px solid black;
    border-radius: 5px;
}

#transparency {
    width: auto;
    margin: 10px;
}

.element-buttons-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.element-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    margin-left: 10px;
    padding: 8px;
    font-size: 12px;
    border-radius: 3px;
}

.element-button:hover {
    cursor: pointer;
    color: white;
}

.confirm-button {
    color: white;
    background-color: green;
    border: 1px solid green;
}

.confirm-button:hover {
    background-color: rgb(1, 151, 1);
}

.cancel-button {
    color: white;
    border: 1px solid rgb(213, 0, 0);
    background-color: rgb(213, 0, 0);
}

.cancel-button:hover {
    border: 1px solid red;
    background-color: red;
}
</style>

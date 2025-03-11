<template>
    <dialog ref="dialogRef" class="custom-dialog">
        <div class="dialog-content">
            <h2>A new version is available. Reload?</h2>
            <p>Warning: Unsaved diagram progress on all open tabs will be lost.</p>
            <div class="element-buttons-container">
                <div class="element-button cancel-button" @click="CancelReload">Cancel</div>
                <div class="element-button confirm-button" @click="AcceptReload">Reload</div>
            </div>
        </div>
    </dialog>
</template>

<script>
export default {
    name: "NewVersionModal",
    methods: {
        show() {
            this.$refs.dialogRef.showModal(); // Open the dialog
        },
        AcceptReload() {
            this.$emit("reload-page", true);
            this.$refs.dialogRef.close();
        },
        CancelReload() {
            this.$emit("reload-page", false);
            this.$refs.dialogRef.close();
        },
    },
};
</script>

<style scoped>
.custom-dialog {
    border: none;
    outline: none;
    border-radius: 5px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 20%; /* Vertically center */
    left: 50%; /* Horizontally center */
    transform: translate(-50%, -50%);
    border: none;
}

.custom-dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
}

h2 {
    margin: 10px;
}

p {
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

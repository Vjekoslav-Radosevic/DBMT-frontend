<template>
    <dialog ref="dialogRef" class="version-dial">
        <div class="dialog-content">
            <h2 class="version-dial__title">A new version is available. Reload?</h2>
            <p class="version-dial__parag">Warning: Unsaved diagram progress on all open tabs will be lost.</p>
            <div class="version-dial__buttons">
                <div class="version-dial__button version-dial__buttons--cancel" @click="CancelReload">Cancel</div>
                <div class="version-dial__button version-dial__buttons--accept" @click="AcceptReload">Reload</div>
            </div>
        </div>
    </dialog>
</template>

<script>
export default {
    name: "NewVersionModal",
    methods: {
        show() {
            this.$refs.dialogRef.showModal();
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

<style scoped lang="scss">
.version-dial {
    border: none;
    outline: none;
    border-radius: 5px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: none;

    &::backdrop {
        background-color: rgba(0, 0, 0, 0.5);
    }

    &__title {
        margin: 10px;
    }

    &__parag {
        margin: 10px;
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

        &--accept {
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

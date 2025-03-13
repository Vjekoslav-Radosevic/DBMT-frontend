<template>
    <dialog ref="dialogRef" class="version-dial">
        <div class="version-dial__content">
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
@use "@/assets/styles/variables" as *;

.version-dial {
    border: none;
    outline: none;
    border-radius: 5px;
    padding: 20px;
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
            color: $text-sec;
        }

        &--accept {
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

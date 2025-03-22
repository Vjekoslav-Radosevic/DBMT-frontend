<template>
    <dialog ref="dialogRef" class="create-dial" @click="handleDialogClick">
        <div class="create-dial__content">
            <input type="text" v-model="diagramName" placeholder="Diagram name" class="create-dial__name" />
            <div class="create-dial__type">
                <div class="create-dial__option">
                    <input type="radio" id="er-diagram-radio" value="ER Diagram" v-model="diagramType" />
                    <label for="er-diagram-radio" class="create-dial__label">ER Diagram</label>
                </div>
                <div class="create-dial__option">
                    <input
                        type="radio"
                        id="relational-diagram-radio"
                        value="Relational Diagram"
                        v-model="diagramType"
                    />
                    <label for="relational-diagram-radio" class="create-dial__label">Relational Diagram</label>
                </div>
            </div>
            <div class="create-dial__button create-dial__button--cancel" @click="closeDialog">Cancel</div>
            <div class="create-dial__button create-dial__button--accept" @click="createDiagram">Create</div>
        </div>
    </dialog>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
export default {
    name: "CreateDiagramModal",
    data() {
        return {
            diagramName: "",
            diagramType: "ER Diagram",
        };
    },
    methods: {
        show() {
            this.$refs.dialogRef.showModal();
        },
        closeDialog() {
            this.$refs.dialogRef.close();
            this.diagramName = "";
            this.diagramType = "ER Diagram";
        },
        handleDialogClick(event) {
            // Close the dialog if the click is outside the content
            const dialogContent = event.target.closest(".create-dial__content");
            if (!dialogContent) {
                this.$refs.dialogRef.close();
            }
        },
        createDiagram() {
            const diagram = {
                id: uuidv4(),
                name: this.diagramName,
                type: this.diagramType,
                dateTimeCreated: new Date().toISOString(),
                lastModified: new Date().toISOString(),
                elements: null,
                connections: null,
            };
            this.$emit("create-diagram", diagram);
            this.closeDialog();
        },
    },
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.create-dial {
    border: none;
    outline: none;
    border-radius: 10px;
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: none;

    &::backdrop {
        background-color: rgba(0, 0, 0, 0.5);
    }

    &__content {
        width: 30vw;
        padding: 20px;
    }

    &__name {
        width: 100%;
        border: none;
        border-bottom: 2px solid $text-prim;
        padding: 8px;
        font-size: 17px;
    }

    &__option {
        margin-bottom: 5px;
    }

    &__type {
        margin: 30px 0;
        font-size: 17px;
    }

    &__label {
        margin-left: 10px;
    }

    &__button {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        background-color: aqua;
        margin-right: 10px;
        color: $text-sec;
        border-radius: 5px;

        &:hover {
            cursor: pointer;
            color: $text-sec;
        }

        &--accept {
            background-color: $accept-prim;
            border: 1px solid $accept-prim;

            &:hover {
                border: 1px solid $accept-prim;
                background-color: $accept-sec;
            }
        }

        &--cancel {
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

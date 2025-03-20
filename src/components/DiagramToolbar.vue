<template>
    <div class="toolbar">
        <div class="toolbar__button toolbar__button--sys" @click="openDownloadDialog">Download</div>
        <div class="toolbar__button toolbar__button--sys" @click="exportFile">Export file</div>
        <div class="toolbar__button toolbar__button--sys">Save</div>
        <div class="toolbar__button toolbar__button--sys">Undo</div>
        <div class="toolbar__button toolbar__button--sys">Redo</div>
        <div
            class="toolbar__button toolbar__button--add"
            :class="{ 'toolbar__button--active': isEntity }"
            @click="createEntity"
        >
            Entity
        </div>
        <div
            class="toolbar__button toolbar__button--add"
            :class="{ 'toolbar__button--active': isRelationship }"
            @click="createRelationship"
        >
            Relationship
        </div>
        <div
            class="toolbar__button toolbar__button--add"
            :class="{ 'toolbar__button--active': isLabel }"
            @click="createLabel"
        >
            Label
        </div>
    </div>
</template>

<script>
import { Entity } from "@/erDiagram/models/Entity.js";
import { Label } from "@/erDiagram/models/Label";
import { Relationship } from "@/erDiagram/models/Relationship.js";
export default {
    name: "diagramToolbar",
    props: ["newElement"],
    computed: {
        isEntity() {
            return this.newElement instanceof Entity;
        },
        isRelationship() {
            return this.newElement instanceof Relationship;
        },
        isLabel() {
            return this.newElement instanceof Label;
        },
    },
    methods: {
        createEntity() {
            this.$emit("create-entity");
        },
        createRelationship() {
            this.$emit("create-relationship");
        },
        createLabel() {
            this.$emit("create-label");
        },
        openDownloadDialog() {
            this.$emit("open-download-dialog");
        },
        exportFile() {
            this.$emit("export-file");
        },
    },
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.toolbar {
    width: 100vw;
    height: 6vh;
    background-color: $system-prim;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &__button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 3px 3px;
        padding: 8px;
        font-size: 12px;
        border-radius: 3px;

        &:hover {
            cursor: pointer;
            color: $text-sec;
        }

        &--sys {
            color: $system-tert;
            border: 1px solid $system-tert;

            &:hover {
                background-color: $system-tert;
            }
        }

        &--add {
            color: $accept-prim;
            border: 1px solid $accept-prim;

            &:hover {
                background-color: $accept-prim;
            }
        }

        &--active {
            color: $text-sec;
            background-color: $accept-prim;
        }
    }
}
</style>

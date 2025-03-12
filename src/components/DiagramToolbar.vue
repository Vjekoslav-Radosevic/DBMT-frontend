<template>
    <div class="toolbar">
        <div class="toolbar__button toolbar__button--sys" @click="openDownloadDialog">Download</div>
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
    },
};
</script>

<style scoped lang="scss">
.toolbar {
    width: 100%;
    height: 40%;
    background-color: rgb(234, 234, 234);
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
            color: white;
        }

        &--sys {
            color: rgb(92, 92, 92);
            border: 1px solid rgb(92, 92, 92);

            &:hover {
                background-color: rgb(92, 92, 92);
            }
        }

        &--add {
            color: green;
            border: 1px solid green;

            &:hover {
                background-color: green;
            }
        }

        &--active {
            color: white;
            background-color: green;
        }
    }
}
</style>

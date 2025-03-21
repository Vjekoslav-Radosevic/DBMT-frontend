<template>
    <div class="toolbar">
        <Download class="toolbar__icon" @click="download" />
        <Save class="toolbar__icon" />
        <Undo class="toolbar__icon" />
        <Redo class="toolbar__icon" />
        <div class="toolbar__text" :class="{ 'toolbar__text--active': isEntity }" @click="createEntity">Entity</div>
        <div class="toolbar__text" :class="{ 'toolbar__text--active': isRelationship }" @click="createRelationship">
            Relationship
        </div>
        <div class="toolbar__text" :class="{ 'toolbar__text--active': isLabel }" @click="createLabel">Label</div>
    </div>
</template>

<script>
import { Download, Save, Undo, Redo } from "lucide-vue-next";
import { Entity } from "@/erDiagram/models/Entity.js";
import { Label } from "@/erDiagram/models/Label";
import { Relationship } from "@/erDiagram/models/Relationship.js";
export default {
    name: "diagramToolbar",
    props: ["newElement"],
    components: { Download, Save, Undo, Redo },
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
        importDiagram(event) {
            this.$emit("import-diagram", event);
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

    &__icon {
        height: 75%;
        width: auto;
        aspect-ratio: 1;
        margin-left: 5px;
        padding: 6px;
        border-radius: 5px;
        border: 1px solid $system-tert;

        &:hover {
            cursor: pointer;
            background-color: $system-tert;
            color: $text-sec;
        }
    }

    &__text {
        height: 75%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 5px;
        border-radius: 5px;
        padding: 0 6px;
        font-size: 12px;
        color: $accept-prim;
        border: 1px solid $accept-prim;

        &:hover {
            cursor: pointer;
            color: $text-sec;
            background-color: $accept-prim;
        }

        &--active {
            color: $text-sec;
            background-color: $accept-prim;
        }
    }
}
</style>

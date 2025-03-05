<template>
    <div class="toolbar">
        <div class="toolbar-button system-button" @click="openDownloadDialog">Download</div>
        <div class="toolbar-button system-button">Save</div>
        <div class="toolbar-button system-button">Undo</div>
        <div class="toolbar-button system-button">Redo</div>
        <div class="toolbar-button er-button" :class="{ active: isEntity }" @click="createEntity">Entity</div>
        <div class="toolbar-button er-button" :class="{ active: isRelationship }" @click="createRelationship">
            Relationship
        </div>
        <div class="toolbar-button er-button" :class="{ active: isLabel }" @click="createLabel">Label</div>
    </div>
</template>

<script>
import { Entity } from "@/erDiagram/models/Entity.js";
import { Label } from "@/erDiagram/models/Label";
import { Relationship } from "@/erDiagram/models/Relationship.js";
export default {
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
            this.$emit("createEntity");
        },
        createRelationship() {
            this.$emit("createRelationship");
        },
        createLabel() {
            this.$emit("createLabel");
        },
        openDownloadDialog() {
            this.$emit("open-download-dialog");
        },
    },
};
</script>

<style scoped>
.toolbar {
    width: 100%;
    height: 40%;
    background-color: rgb(234, 234, 234);
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.toolbar-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3px 3px;
    padding: 8px;
    font-size: 12px;
    border-radius: 3px;
}

.system-button {
    color: rgb(92, 92, 92);
    border: 1px solid rgb(92, 92, 92);
}

.er-button {
    color: green;
    border: 1px solid green;
}

.toolbar-button:hover {
    cursor: pointer;
    color: white;
}

.system-button:hover {
    background-color: rgb(92, 92, 92);
}

.er-button:hover {
    background-color: green;
}

.active {
    color: white;
    background-color: green;
}
</style>

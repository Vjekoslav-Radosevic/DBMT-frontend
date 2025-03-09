<template>
    <div class="element-buttons-container">
        <div v-if="attributesAllowed" @click="addAttribute" class="element-button er-button">Add attribute</div>
        <div @click="deleteElement" class="element-button danger-button">Delete element</div>
    </div>
</template>

<script>
import { DegenerativeEntity } from "@/erDiagram/models/entities/DegenerativeEntity.js";
import { Attribute } from "@/erDiagram/models/Attribute.js";
import { Entity } from "@/erDiagram/models/Entity.js";
import { Relationship } from "@/erDiagram/models/Relationship.js";
import { Label } from "@/erDiagram/models/Label.js";
export default {
    name: "ElementButtons",
    props: ["element"],
    computed: {
        attributesAllowed() {
            if (this.element instanceof Attribute && !this.element.properties.composite) return false;
            if (this.element instanceof DegenerativeEntity) return false;
            if (this.element instanceof Label) return false;
            if (
                (this.element instanceof Entity || this.element instanceof Relationship) &&
                this.element.attributeSchema
            )
                return false;

            return true;
        },
    },
    methods: {
        deleteElement() {
            this.$eventBus.emit("delete-element");
        },
        addAttribute() {
            this.$eventBus.emit("add-attribute");
        },
    },
};
</script>

<style scoped>
.element-buttons-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.element-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    padding: 8px;
    font-size: 12px;
    border-radius: 3px;
}

.element-button:hover {
    cursor: pointer;
    color: white;
}

.er-button {
    color: green;
    border: 1px solid green;
}

.er-button:hover {
    background-color: green;
}

.danger-button {
    color: white;
    border: 1px solid rgb(213, 0, 0);
    background-color: rgb(213, 0, 0);
}

.danger-button:hover {
    border: 1px solid red;
    background-color: red;
}
</style>

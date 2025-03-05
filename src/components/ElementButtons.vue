<template>
    <div class="element-buttons-container">
        <div class="element-button er-button" v-if="attributesAllowed" @click="addAttribute">Add attribute</div>
        <div class="element-button danger-button" @click="deleteElement">Delete element</div>
    </div>
</template>

<script>
import { DegenerativeEntity } from "@/erDiagram/models/entities/DegenerativeEntity.js";
import { Attribute } from "@/erDiagram/models/Attribute.js";
import { Label } from "@/erDiagram/models/Label.js";
export default {
    props: ["element"],
    computed: {
        attributesAllowed() {
            if (this.element instanceof Attribute) {
                if (!this.element.properties.composite) return false;
            }
            if (this.element instanceof DegenerativeEntity) return false;
            if (this.element instanceof Label) return false;
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

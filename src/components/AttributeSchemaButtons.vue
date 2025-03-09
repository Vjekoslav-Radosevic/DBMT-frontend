<template>
    <div
        v-if="!element.attributeSchema && element.attributes.length"
        class="element-button er-button"
        @click="createAttributeSchema"
    >
        Create attribute schema
    </div>
    <div v-if="element.attributeSchema" class="element-button danger-button" @click="removeAttributeSchema">
        Remove attribute schema
    </div>
</template>

<script>
export default {
    name: "AttributeSchemaButtons",
    props: ["element"],
    methods: {
        createAttributeSchema() {
            this.$eventBus.emit("create-attribute-schema");
        },
        removeAttributeSchema() {
            this.$eventBus.emit("remove-attribute-schema");
        },
    },
};
</script>

<style scoped>
.element-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
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

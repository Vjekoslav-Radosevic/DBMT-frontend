<template>
    <div
        v-if="!element.attributeSchema && element.attributes.length"
        class="button button--add"
        @click="createAttributeSchema"
    >
        Create attribute schema
    </div>
    <div v-if="element.attributeSchema" class="button button--danger" @click="removeAttributeSchema">
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

<style scoped lang="scss">
.button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    padding: 8px;
    font-size: 12px;
    border-radius: 3px;

    &:hover {
        cursor: pointer;
        color: white;
    }

    &--add {
        color: green;
        border: 1px solid green;

        &:hover {
            background-color: green;
        }
    }

    &--danger {
        color: white;
        border: 1px solid rgb(213, 0, 0);
        background-color: rgb(213, 0, 0);

        &:hover {
            border: 1px solid red;
            background-color: red;
        }
    }
}
</style>

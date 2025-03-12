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
@use "@/assets/styles/variables" as *;

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
        color: $text-sec;
    }

    &--add {
        color: $accept-prim;
        border: 1px solid $accept-prim;

        &:hover {
            background-color: $accept-prim;
        }
    }

    &--danger {
        color: $text-sec;
        border: 1px solid $danger-prim;
        background-color: $danger-prim;

        &:hover {
            border: 1px solid $danger-sec;
            background-color: $danger-sec;
        }
    }
}
</style>

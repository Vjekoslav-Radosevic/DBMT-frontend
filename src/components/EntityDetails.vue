<template>
    <div class="details-container">
        <div v-for="type in entityTypes" :key="type" class="type-container">
            <input
                type="radio"
                :id="type"
                :value="type"
                v-model="element.type"
                @change="changeEntityType"
                :disabled="isDisabled(type)"
            />
            <label :for="type">{{ type }}</label>
        </div>
    </div>
    <div v-if="entityIsSuperType" class="details-container">
        <div v-for="specializationType in specializationTypes" :key="specializationType" class="type-container">
            <input
                type="radio"
                :id="specializationType"
                :value="specializationType"
                v-model="element.specializationType"
            />
            <label :for="specializationType">{{ specializationType }}</label>
        </div>
        <div @click="addEntity" class="element-button er-button">Add entity</div>
    </div>
    <div
        v-if="!element.attributeSchemaActive && element.attributes.length"
        class="element-button er-button"
        @click="createAttributeSchema"
    >
        Create attribute schema
    </div>
    <div v-if="element.attributeSchemaActive" class="element-button danger-button" @click="removeAttributeSchema">
        Remove attribute schema
    </div>
</template>

<script>
import { SuperTypeEntity } from "@/erDiagram/models/entities/SuperTypeEntity";
export default {
    props: ["element"],
    data() {
        return {
            entityTypes: ["Regular", "Degenerative", "Weak", "Associative", "SuperType"],
            specializationTypes: ["Disjointed", "Overlapping"],
        };
    },
    computed: {
        entityIsSuperType() {
            return this.element instanceof SuperTypeEntity;
        },
        parentIsSuperType() {
            if (this.element.parentElement) {
                return this.element.parentElement instanceof SuperTypeEntity;
            }
            return false;
        },
    },
    methods: {
        changeEntityType() {
            this.$eventBus.emit("change-entity-type", this.element.type);
        },
        addEntity() {
            this.$eventBus.emit("add-entity");
        },
        isDisabled(type) {
            return (type === "Degenerative" || type === "Weak" || type === "Associative") && this.parentIsSuperType;
        },
        createAttributeSchema() {
            this.$eventBus.emit("create-attribute-schema");
            this.element.attributeSchemaActive = true;
        },
        removeAttributeSchema() {
            this.$eventBus.emit("remove-attribute-schema");
            this.element.attributeSchemaActive = false;
        },
    },
};
</script>

<style scoped>
.details-container {
    border: 1px solid green;
    border-radius: 4px;
    margin: 10px;
}
.type-container {
    padding: 10px;
}
input {
    width: auto;
    margin-right: 10px;
}
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

<template>
    <div class="entity">
        <div v-for="type in entityTypes" :key="type" class="entity__prop">
            <input
                type="radio"
                :id="type"
                :value="type"
                v-model="element.type"
                class="entity__input"
                @change="changeEntityType"
                :disabled="isDisabled(type)"
            />
            <label :for="type">{{ type }}</label>
        </div>
    </div>
    <SuperTypeEntityDetails v-if="entityIsSuperType" :element="element" />
    <AttributeSchemaButtons :element="element" />
</template>

<script>
import { SuperTypeEntity } from "@/erDiagram/models/entities/SuperTypeEntity";
import SuperTypeEntityDetails from "./SuperTypeEntityDetails.vue";
import AttributeSchemaButtons from "./AttributeSchemaButtons.vue";
export default {
    name: "EntityDetails",
    props: ["element"],
    components: { SuperTypeEntityDetails, AttributeSchemaButtons },
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
        isDisabled(type) {
            return (type === "Degenerative" || type === "Weak" || type === "Associative") && this.parentIsSuperType;
        },
    },
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.entity {
    border: 1px solid $accept-prim;
    border-radius: 4px;
    margin: 10px;

    &__prop {
        padding: 10px;
    }

    &__input {
        width: auto;
        margin-right: 10px;
        background-color: $system-prim;
        border: none;
        border-bottom: 2px solid $accept-prim;
        padding: 8px;
        font-size: 15px;
    }
}
</style>

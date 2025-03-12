<template>
    <div class="details">
        <div v-if="element">
            <input v-if="!isLabel" type="text" v-model="element.name" class="details__input" />
            <EntityDetails v-if="isEntity" :element="element" />
            <AttributeDetails v-if="isAttribute" :element="element" />
            <RelationshipDetails v-if="isRelationship" :element="element" :elements="elements" />
            <LabelDetails v-if="isLabel" :element="element" />
            <ElementButtons :element="element" />
        </div>
    </div>
</template>

<script>
import { Entity } from "@/erDiagram/models/Entity.js";
import { Relationship } from "@/erDiagram/models/Relationship.js";
import { Attribute } from "@/erDiagram/models/Attribute.js";
import EntityDetails from "./EntityDetails.vue";
import RelationshipDetails from "./RelationshipDetails.vue";
import AttributeDetails from "./AttributeDetails.vue";
import LabelDetails from "./LabelDetails.vue";
import ElementButtons from "./ElementButtons.vue";
import { Label } from "@/erDiagram/models/Label";
export default {
    name: "ElementDetails",
    props: ["element", "elements"],
    components: { EntityDetails, RelationshipDetails, AttributeDetails, LabelDetails, ElementButtons },
    computed: {
        isEntity() {
            return this.element instanceof Entity;
        },
        isRelationship() {
            return this.element instanceof Relationship;
        },
        isAttribute() {
            return this.element instanceof Attribute;
        },
        isLabel() {
            return this.element instanceof Label;
        },
    },
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.details {
    width: 15vw;
    height: 100%;
    background-color: $system-prim;

    &__input {
        margin: 10px;
        margin-bottom: 0;
        background-color: $system-prim;
        border: none;
        border-bottom: 2px solid $accept-prim;
        padding: 8px;
        width: 90%;
        font-size: 15px;
    }
}
</style>

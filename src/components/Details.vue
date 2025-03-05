<template>
    <div class="details">
        <div v-if="element">
            <div v-if="!elementIsLabel" class="detail-element">
                <input type="text" v-model="element.name" />
            </div>
            <EntityDetails v-if="elementIsEntity" :element="element" />
            <AttributeDetails v-if="elementIsAttribute" :element="element" />
            <RelationshipDetails v-if="elementIsRelationship" :element="element" :elements="elements" />
            <LabelDetails v-if="elementIsLabel" :element="element" />
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
    props: ["element", "elements"],
    components: { EntityDetails, RelationshipDetails, AttributeDetails, LabelDetails, ElementButtons },
    computed: {
        elementIsEntity() {
            return this.element instanceof Entity;
        },
        elementIsRelationship() {
            return this.element instanceof Relationship;
        },
        elementIsAttribute() {
            return this.element instanceof Attribute;
        },
        elementIsLabel() {
            return this.element instanceof Label;
        },
    },
};
</script>

<style scoped>
.details {
    width: 15vw;
    height: 100%;
    background-color: rgb(234, 234, 234);
}
.detail-element {
    margin: 10px;
}
</style>

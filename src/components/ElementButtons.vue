<template>
    <div class="container">
        <div v-if="attributesAllowed" @click="addAttribute" class="container__button container__button--add">
            Add attribute
        </div>
        <div @click="deleteElement" class="container__button container__button--danger">Delete element</div>
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

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.container {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &__button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 10px;
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
            color: white;
            border: 1px solid $danger-prim;
            background-color: $danger-prim;

            &:hover {
                border: 1px solid $danger-sec;
                background-color: $danger-sec;
            }
        }
    }
}
</style>

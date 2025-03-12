<template>
    <div class="attribute">
        <div v-for="attributeProp in attributeProps" :key="attributeProp" class="attribute__prop">
            <input
                type="checkbox"
                class="attribute__input"
                :id="attributeProp.text"
                v-model="element.properties[attributeProp.propName]"
                @change="checkCompositeProp(attributeProp.text)"
            />
            <label :for="attributeProp.text">{{ attributeProp.text }}</label>
        </div>
    </div>
</template>

<script>
export default {
    name: "AttributeDetails",
    props: ["element"],
    data() {
        return {
            attributeProps: [
                { text: "Composite", propName: "composite" },
                { text: "Multivalued", propName: "multiValued" },
                { text: "Unique", propName: "unique" },
                { text: "Optional", propName: "optional" },
                { text: "Derived", propName: "derived" },
            ],
        };
    },
    methods: {
        checkCompositeProp(propText) {
            // if user turned off composite property
            if (!this.element.properties.composite && propText === "Composite") {
                this.$eventBus.emit("remove-all-attributes");
            }
        },
    },
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.attribute {
    margin: 10px;
    border-radius: 4px;
    border: 1px solid $accept-prim;

    &__prop {
        padding: 10px;
    }

    &__input {
        width: auto;
        font-size: 15px;
        margin-right: 10px;
        padding: 8px;
        border: none;
        border-bottom: 2px solid $accept-prim;
        background-color: $system-prim;
    }
}
</style>

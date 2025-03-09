<template>
    <div class="detail-element">
        <div v-for="attributeProp in attributeProps" :key="attributeProp" class="property-container">
            <input
                type="checkbox"
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

<style scoped>
.detail-element {
    margin: 10px;
    border-radius: 4px;
    border: 1px solid green;
}
.property-container {
    padding: 10px;
}
input {
    width: auto;
    margin-right: 10px;
}
</style>

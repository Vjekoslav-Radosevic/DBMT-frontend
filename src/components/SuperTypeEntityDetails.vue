<template>
    <div class="details-container">
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
</template>

<script>
export default {
    name: "SuperTypeEntityDetails",
    props: ["element"],
    data() {
        return {
            specializationTypes: ["Disjointed", "Overlapping"],
        };
    },
    methods: {
        addEntity() {
            this.$eventBus.emit("add-entity");
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
</style>

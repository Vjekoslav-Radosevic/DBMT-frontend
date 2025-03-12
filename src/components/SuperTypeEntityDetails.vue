<template>
    <div class="supertype">
        <div v-for="specializationType in specializationTypes" :key="specializationType" class="supertype__type">
            <input
                type="radio"
                :id="specializationType"
                :value="specializationType"
                class="supertype__input"
                v-model="element.specializationType"
            />
            <label :for="specializationType">{{ specializationType }}</label>
        </div>
        <div @click="addEntity" class="supertype__button supertype__button--add">Add sub-entity</div>
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

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.supertype {
    border: 1px solid $accept-prim;
    border-radius: 4px;
    margin: 10px;

    &__type {
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

    &__button {
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
    }
}
</style>

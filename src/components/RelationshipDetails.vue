<template>
    <div class="relationship">
        <input type="checkbox" id="identifying" v-model="element.identifying" class="relationship__input" />
        <label for="identifying">Indentifying</label>
    </div>
    <div v-for="relEntity in eligibleEntities" :key="relEntity" class="connections">
        <div>
            {{ relEntity.text }}:
            <select
                v-model="relEntity.entity"
                @focus="storeOldEntity(relEntity.text, relEntity)"
                @change="setNewEntity(relEntity)"
                class="connections__select"
            >
                <option v-for="entity in entities" :key="entity" :value="entity">
                    {{ entity ? entity.name : "None" }}
                </option>
            </select>
        </div>
        <div class="connections__entity">
            <label :for="relEntity.text + 'min'">Lower bound: </label>
            <input
                type="text"
                :name="relEntity.text + 'min'"
                v-model="relEntity.min"
                @input="validateMin(relEntity)"
                class="connections__input"
                :class="{ 'connections__input--invalid': relEntity.errorMin }"
            />
        </div>
        <div class="connections__entity">
            <label :for="relEntity.text + 'max'">Upper bound: </label>
            <input
                type="text"
                :name="relEntity.text + 'max'"
                v-model="relEntity.max"
                @input="validateMax(relEntity)"
                class="connections__input"
                :class="{ 'connections__input--invalid': relEntity.errorMax }"
            />
        </div>
    </div>
    <AttributeSchemaButtons :element="element" />
</template>

<script>
import { Entity } from "@/erDiagram/models/Entity.js";
import AttributeSchemaButtons from "./AttributeSchemaButtons.vue";
export default {
    name: "RelationshipDetails",
    props: ["element", "elements"],
    components: { AttributeSchemaButtons },
    data() {
        return {
            oldEntities: {},
        };
    },
    computed: {
        entities() {
            const entities = this.elements.filter((element) => element instanceof Entity);
            return [...entities, null];
        },
        eligibleEntities() {
            const reflexiveEntity = this.element.isReflexive();

            if (!reflexiveEntity) return this.element.entities;

            // if relationship is reflexsive, return only relationship's entities that store references to that one entity
            return Object.values(this.element.entities).filter(
                (relEntity) => relEntity.entity && relEntity.entity.id === reflexiveEntity.entity.id,
            );
        },
    },
    methods: {
        storeOldEntity(key, value) {
            this.oldEntities[key] = { ...value };
        },
        setNewEntity(relEntity) {
            let change = {
                oldEntity: this.oldEntities[relEntity.text].entity,
                newEntity: relEntity.entity,
                entityText: relEntity.text,
            };
            this.$eventBus.emit("set-relationship-entity", change);
            this.storeOldEntity(relEntity.text, relEntity);
        },
        validateMin(entity) {
            if (!Number.isInteger(Number(entity.min))) {
                entity.errorMin = "Value must be integer";
                return;
            }

            if (entity.max != "" && Number.isInteger(Number(entity.max)) && Number(entity.min) > Number(entity.max)) {
                entity.errorMin = "Value must not be greater than max";
                return;
            }

            entity.errorMin = "";
        },
        validateMax(entity) {
            if (!Number.isInteger(Number(entity.max)) && entity.max != "" && entity.max != "N" && entity.max != "n") {
                entity.errorMax = "Value must be integer or N/n";
                return;
            }

            if (Number.isInteger(Number(entity.max)) && entity.min != "" && Number(entity.min) > Number(entity.max)) {
                entity.errorMax = "Value must be greater than min";
                return;
            }

            entity.errorMax = "";
        },
    },
};
</script>

<style scoped lang="scss">
.relationship {
    margin: 10px;
    padding: 10px;
    border-radius: 4px;

    &__input {
        width: 30px;
        font-size: 15px;
        margin-right: 10px;
        padding: 5px;
        border: none;
        border-bottom: 2px solid green;
        background-color: rgb(234, 234, 234);
    }
}

.connections {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    margin: 10px;
    padding: 10px;
    border: 1px solid green;
    border-radius: 4px;

    &__entity {
        margin-top: 10px;
    }

    &__select {
        padding: 5px;
        border: 0px solid rgb(234, 234, 234);
        border-bottom: 2px solid green;
        background-color: rgb(234, 234, 234);
        font-size: 14px;
        appearance: none;
        cursor: pointer;
    }

    &__input {
        width: 30px;
        font-size: 15px;
        margin-right: 10px;
        padding: 5px;
        border: none;
        border-bottom: 2px solid green;
        background-color: rgb(234, 234, 234);

        &--invalid {
            background-color: rgb(255, 159, 159);
            border-bottom: 2px solid rgb(201, 0, 0);
            border-radius: 4px 4px 0 0;
        }
    }
}
</style>

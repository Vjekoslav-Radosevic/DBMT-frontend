<template>
    <div class="detail-element">
        <input type="checkbox" id="identifying" v-model="element.identifying" />
        <label for="identifying">Indentifying</label>
    </div>
    <div v-for="relEntity in element.entities" :key="relEntity" class="entity-container">
        <div v-if="showContainer(relEntity.entity)">
            <div>
                {{ relEntity.text }}:
                <select
                    v-model="relEntity.entity"
                    @focus="storeOldEntity(relEntity.text, relEntity)"
                    @change="setNewEntity(relEntity)"
                >
                    <option v-for="entity in entities" :key="entity" :value="entity">
                        {{ entity ? entity.name : "None" }}
                    </option>
                </select>
            </div>
            <div class="entity-element">
                <label :for="relEntity.text + 'min'">Lower bound: </label>
                <input
                    type="text"
                    :name="relEntity.text + 'min'"
                    v-model="relEntity.min"
                    @input="validateMin(relEntity)"
                    :class="{ invalid: relEntity.errorMin }"
                />
            </div>
            <div class="entity-element">
                <label :for="relEntity.text + 'max'">Upper bound: </label>
                <input
                    type="text"
                    :name="relEntity.text + 'max'"
                    v-model="relEntity.max"
                    @input="validateMax(relEntity)"
                    :class="{ invalid: relEntity.errorMax }"
                />
            </div>
        </div>
    </div>
    <AttributeSchemaButtons :element="element" />
</template>

<script>
import { Entity } from "@/erDiagram/models/Entity.js";
import AttributeSchemaButtons from "./AttributeSchemaButtons.vue";
export default {
    props: ["element", "elements"],
    components: { AttributeSchemaButtons },
    data() {
        return {
            oldEntities: {},
        };
    },
    methods: {
        entities() {
            const entities = this.elements.filter((element) => element instanceof Entity);
            return [...entities, null];
        },
        showContainer(entity) {
            const reflexiveEntity = this.element.isReflexive();
            if (!reflexiveEntity) {
                // console.log("RelationshipDetails: NIJE refleksivna veza");
                return true;
            }

            if (!entity) {
                // console.log("veza je refleksivna, entity je null");
                return false;
            }

            if (reflexiveEntity.entity.id !== entity.id) {
                // console.log("veza je refleksivna, entity je neki drugi");
                return false;
            }

            return true;
        },
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

<style scoped>
.detail-element {
    margin: 10px;
    padding: 10px;
    border-radius: 4px;
}
#identifying {
    width: auto;
    margin-right: 10px;
}
.entity-container {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    margin: 10px;
    padding: 10px;
    border: 1px solid green;
    border-radius: 4px;
}
.entity-element {
    margin-top: 10px;
}
input[type="text"] {
    width: 30px;
    border-bottom: 2px solid green;
    padding: 5px;
}
select {
    padding: 5px;
    border: 0px solid rgb(234, 234, 234);
    border-bottom: 2px solid green;
    background-color: rgb(234, 234, 234);
    font-size: 14px;
    appearance: none; /* Removes default styling for dropdown arrow */
    cursor: pointer;
}
input[type="text"].invalid {
    background-color: rgb(255, 159, 159);
    border-bottom: 2px solid rgb(201, 0, 0);
    border-radius: 4px 4px 0 0;
}
</style>

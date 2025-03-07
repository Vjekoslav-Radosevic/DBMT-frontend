<template>
    <div class="detail-element">
        <input type="checkbox" id="identifying" v-model="element.identifying" />
        <label for="identifying">Indentifying</label>
    </div>
    <div v-for="relEntity in element.entities" :key="relEntity" class="entity-container">
        <div>
            {{ relEntity.text }}:
            <select
                v-model="relEntity.entity"
                @focus="storeOldEntity(relEntity.text, relEntity)"
                @change="setNewEntity(relEntity)"
            >
                <option v-for="entity in entities(relEntity.entity)" :key="entity" :value="entity">
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
    <div
        v-if="!element.attributeSchema && element.attributes.length"
        class="element-button er-button"
        @click="createAttributeSchema"
    >
        Create attribute schema
    </div>
    <div v-if="element.attributeSchema" class="element-button danger-button" @click="removeAttributeSchema">
        Remove attribute schema
    </div>
</template>

<script>
import { Entity } from "@/erDiagram/models/Entity.js";
export default {
    props: ["element", "elements"],
    data() {
        return {
            oldEntities: {},
        };
    },
    methods: {
        entities(entity) {
            let relationEntities = Object.values(this.element.entities).map((value) => value.entity);
            relationEntities = relationEntities.filter((element) => element != entity);
            let entities = this.elements.filter(
                (element) => element instanceof Entity && !relationEntities.includes(element),
            );
            return [...entities, null];
        },
        storeOldEntity(key, value) {
            this.oldEntities[key] = { ...value };
        },
        setNewEntity(relEntity) {
            let change = {
                relationship: this.element,
                oldEntity: this.oldEntities[relEntity.text].entity,
                newEntity: relEntity.entity,
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
        createAttributeSchema() {
            this.$eventBus.emit("create-attribute-schema");
        },
        removeAttributeSchema() {
            this.$eventBus.emit("remove-attribute-schema");
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

.danger-button {
    color: white;
    border: 1px solid rgb(213, 0, 0);
    background-color: rgb(213, 0, 0);
}

.danger-button:hover {
    border: 1px solid red;
    background-color: red;
}
</style>

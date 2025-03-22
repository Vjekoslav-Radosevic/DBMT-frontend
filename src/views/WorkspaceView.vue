<template>
    <div class="buttons">
        <Plus class="buttons__button" @click="this.$refs.createDiagramModalRef.show()" />
        <label>
            <Upload class="buttons__button" />
            <input type="file" @change="importDiagram" accept=".json" style="display: none" />
        </label>
        <Trash2 class="buttons__button" />
    </div>
    <div v-for="diagram in diagrams" :key="diagram.id" class="diagram" @click="openDiagram($event, diagram.id)">
        <div class="diagram__right">
            <Diamond class="diagram__icon" />
            <div>
                <h3 class="diagram__name">{{ diagram.name }}</h3>
                <p>{{ diagram.type }}</p>
            </div>
        </div>
        <div class="diagram__left">
            <p class="diagram__date">{{ diagram.dateTimeCreated }}</p>
            <MenuIcon class="diagram__options" />
        </div>
    </div>
    <div v-if="!diagrams.length" class="no-diagrams">
        <h1 class="no-diagrams__title">No diagrams yet</h1>
        <p class="no-diagrams__description">When you create some, they will appear here.</p>
    </div>
    <CreateDiagramModal ref="createDiagramModalRef" @create-diagram="createDiagram" />
</template>

<script>
import { Diamond, Menu as MenuIcon, Plus, Upload, Trash2 } from "lucide-vue-next";
import CreateDiagramModal from "@/components/CreateDiagramModal.vue";
export default {
    name: "WorkspaceView",
    components: { Diamond, MenuIcon, Plus, Upload, Trash2, CreateDiagramModal },
    data() {
        return {
            diagrams: [],
            apiUrl: import.meta.env.VITE_API_URL,
        };
    },
    mounted() {
        // this.fetchDiagrams();
    },
    methods: {
        async fetchDiagrams() {
            try {
                const response = await fetch(`${this.apiUrl}/api/diagrams`, { credentials: "include" });
                if (response.ok) {
                    this.diagrams = await response.json();
                } else {
                    console.error("Cannot fetch diagrams, server responded with status", response.status);
                }
            } catch (error) {
                console.error("An error occured while fetching diagrams: ", error);
            }
        },
        openDiagram(event, id) {
            if (event.target.classList.contains("diagram__options")) return;
            this.$router.push({ name: "diagram", params: { id: id } });
        },
        createDiagram(newDiagram) {
            this.diagrams.unshift(newDiagram);
            this.saveDiagram(JSON.stringify(newDiagram));
        },
        importDiagram(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const diagramJson = e.target.result;
                    const newDiagram = JSON.parse(diagramJson);
                    this.diagrams.unshift(newDiagram);
                    this.saveDiagram(diagramJson);
                } catch (error) {
                    console.error("Invalid JSON file:", error);
                }
            };
            reader.readAsText(file);
        },
        async saveDiagram(diagram) {
            try {
                const response = await fetch(`${this.apiUrl}/api/diagrams`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: diagram,
                });

                if (response.ok) {
                    console.log("Diagram successfully saved");
                } else {
                    console.error("Cannot save diagram, server responded with status", response.status);
                }
            } catch (error) {
                console.error("An error occured while saving diagram: ", error);
            }
        },
    },
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.buttons {
    position: absolute;
    top: 8vh;
    left: 0;
    width: 15vw;
    display: flex;
    flex-direction: column;

    &__button {
        width: 45px;
        height: 45px;
        padding: 12px;
        margin-top: 15px;
        margin-left: 15px;
        border-radius: 10px;
        border: 1px solid $system-tert;

        &:hover {
            cursor: pointer;
            color: $text-sec;
            background-color: $system-tert;
        }
    }
}

.diagram {
    width: 70vw;
    height: 10vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px auto;
    border-radius: 10px;
    border: 1px solid $system-tert;

    &:hover {
        cursor: pointer;
    }

    &__right {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    &__left {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    &__name {
        margin-bottom: 5px;
    }

    &__icon {
        width: 30px;
        height: 30px;
        margin: 40px;
    }

    &__options {
        width: 42px;
        height: 42px;
        padding: 10px;
        margin: 30px;
        border-radius: 10px;

        &:hover {
            background-color: $system-sec;
            cursor: pointer;
        }
    }

    &__date {
        justify-self: flex-end;
    }
}

.no-diagrams {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 52vh;
    text-align: center;

    &__title {
        font-size: 35px;
        margin-bottom: 15px;
    }

    &__description {
        font-size: 20px;
    }
}
</style>

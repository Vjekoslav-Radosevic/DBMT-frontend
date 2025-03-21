<template>
    <div v-for="diagram in diagrams" :key="diagram.id" class="diagram" @click="openDiagram($event, diagram.id)">
        <div class="diagram__right">
            <Diamond class="diagram__icon" />
            <div>
                <h3 class="diagram__name">{{ diagram.name }}</h3>
                <p>{{ diagram.type }}</p>
            </div>
        </div>
        <div class="diagram__left">
            <p class="diagram__date">{{ diagram.dateCreated }}</p>
            <MenuIcon class="diagram__options" />
        </div>
    </div>
    <div v-if="!diagrams.length" class="no-diagrams">
        <h1 class="no-diagrams__title">No diagrams yet</h1>
        <p class="no-diagrams__description">When you create some, they will appear here.</p>
    </div>
</template>

<script>
import { Diamond, Menu as MenuIcon } from "lucide-vue-next";
export default {
    name: "WorkspaceView",
    components: { Diamond, MenuIcon },
    data() {
        return {
            diagrams: [
                { id: "1", name: "Moj prvi ER dijagram", type: "ER diagram", dateCreated: "2025-03-14T12:23:40" },
                { id: "2", name: "Drugi dijagram", type: "ER diagram", dateCreated: "2025-03-14T12:23:40" },
            ],
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
                    console.error(`Cannot fetch diagrams, server responded with status ${response.status}`);
                }
            } catch (error) {
                console.error("An error occured while fetching diagrams: ", error);
            }
        },
        openDiagram(event, id) {
            if (event.target.classList.contains("diagram__options")) return;
            this.$router.push({ name: "diagram", params: { id: id } });
        },
    },
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.diagram {
    width: 70vw;
    height: 10vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px auto;
    border-radius: 10px;
    border: 1px solid black;

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
        border-radius: 50%;

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

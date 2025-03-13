import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DiagramView from "../views/DiagramView.vue";
import NotFoundView from "../views/NotFoundView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/diagram",
            name: "diagram",
            component: DiagramView,
        },
        {
            path: "/:catchAll(.*)",
            name: "notFound",
            component: NotFoundView,
        },
    ],
});

export default router;

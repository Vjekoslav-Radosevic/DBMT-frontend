<template>
    <AppTitle />
    <AppFunctionality
        v-for="functionality in functionalities"
        :key="functionality.title"
        :functionality="functionality"
    />
</template>

<script>
import AppTitle from "../components/AppTitle.vue";
import AppFunctionality from "../components/AppFunctionality.vue";
export default {
    name: "HomeView",
    components: { AppTitle, AppFunctionality },
    data() {
        return {
            functionalities: [
                {
                    title: "Entity-Relationship Diagrams",
                    imageSrc: "/images/ER_diagram.png",
                    imageAlt: "Image of ER Diagram",
                    description:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum veniam, nihil nulla molestias molestiae \
                blanditiis repudiandae accusantium pariatur, incidunt repellat aspernatur eaque vitae, rerum ut \
                voluptate. Nemo, dignissimos necessitatibus, at ipsam non voluptates similique dicta omnis quo dolorem \
                voluptatem error molestiae, asperiores porro praesentium nesciunt ipsa! Unde aliquid amet saepe.",
                },
                {
                    title: "Relational Diagrams",
                    imageSrc: "/images/ER_diagram.png",
                    imageAlt: "Image of relational Diagram",
                    description:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum veniam, nihil nulla molestias molestiae \
                blanditiis repudiandae accusantium pariatur, incidunt repellat aspernatur eaque vitae, rerum ut \
                voluptate. Nemo, dignissimos necessitatibus, at ipsam non voluptates similique dicta omnis quo dolorem \
                voluptatem error molestiae, asperiores porro praesentium nesciunt ipsa! Unde aliquid amet saepe.",
                },
                {
                    title: "SQL Scripts",
                    imageSrc: "/images/ER_diagram.png",
                    imageAlt: "Image of SQL script",
                    description:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum veniam, nihil nulla molestias molestiae \
                blanditiis repudiandae accusantium pariatur, incidunt repellat aspernatur eaque vitae, rerum ut \
                voluptate. Nemo, dignissimos necessitatibus, at ipsam non voluptates similique dicta omnis quo dolorem \
                voluptatem error molestiae, asperiores porro praesentium nesciunt ipsa! Unde aliquid amet saepe.",
                },
            ],
        };
    },
};
</script>

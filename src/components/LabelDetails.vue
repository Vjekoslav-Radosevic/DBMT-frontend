<template>
    <textarea v-model="element.text" :placeholder="placeholderText" class="label-textarea"></textarea>
</template>

<script>
export default {
    name: "LabelDetails",
    props: ["element"],
    data() {
        return {
            placeholderText: "Label content...",
        };
    },
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.label-textarea {
    width: 90%;
    height: 200px;
    margin: 10px;
    padding: 10px;
    font-family: "DM Sans", sans-serif;
    font-size: 15px;
    border: 1px solid $accept-prim;
    border-radius: 4px;
}
</style>

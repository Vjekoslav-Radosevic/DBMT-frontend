<template>
    <div class="function">
        <img :src="functionality.imageSrc" :alt="functionality.imageAlt" class="function__image" />
        <div class="function__text">
            <h3 class="function__title">{{ functionality.title }}</h3>
            <p class="function__description">{{ functionality.description }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "AppFunctionality",
    props: ["functionality"],
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.function {
    width: 80vw;
    height: 52vh;
    margin: 0 auto 100px auto;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    &__image {
        height: 52vh;
        margin-right: 50px;
        border: 1px solid $system-tert;
    }

    &__text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    &__title {
        margin-bottom: 20px;
        font-size: 28px;
    }

    &__description {
        font-size: 17px;
    }
}
</style>

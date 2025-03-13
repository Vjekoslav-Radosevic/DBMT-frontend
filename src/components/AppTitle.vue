<template>
    <div class="title">
        <h1 class="title__slogan">Veliki slogan</h1>
        <h3 class="title__description">Manja recenica koja je duza od ovoga iznad</h3>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.title {
    width: 80vw;
    height: 40vh;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__slogan {
        margin-bottom: 30px;
        color: $accept-prim;
        font-size: 50px;
    }

    &__description {
        font-size: 20px;
    }
}
</style>

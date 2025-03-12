<template>
    <div class="header">
        <div class="header__group header__group--left">
            <div class="header__button">ER Diagram</div>
            <div class="header__button">Workspace</div>
        </div>
        <div class="header__group header__group--right">
            <div class="header__button">Profile</div>
            <div class="header__button">About</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.header {
    width: 100%;
    height: 60%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $system-prim;
    border-bottom: 1px solid gray;

    &__group {
        display: flex;

        &--left {
            justify-content: flex-start;
        }

        &--right {
            justify-content: flex-end;
        }
    }

    &__button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0px 25px;
        padding: 0;
        font-size: 16px;
        font-weight: 500;
        letter-spacing: 0.3px;
        border: 2px solid $system-prim;

        &:hover {
            cursor: pointer;
            border-bottom: 2px solid $system-tert;
        }
    }
}
</style>

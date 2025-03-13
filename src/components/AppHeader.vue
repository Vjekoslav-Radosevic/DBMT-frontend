<template>
    <div class="header">
        <div class="header__group header__group--left">
            <router-link to="/" class="header__button">
                <img src="/icons/logo.png" alt="DBMT logo" class="header__logo" />
                <p class="header__title">Database Modeling Tool</p>
            </router-link>
            <div class="header__button header__button--click">Workspace</div>
        </div>
        <div class="header__group header__group--right">
            <div class="header__button header__button--click">Profile</div>
            <div class="header__button header__button--click">About</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.header {
    max-width: 100vw;
    height: 8vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $system-prim;
    border-bottom: 1px solid $system-tert;

    &__group {
        display: flex;
        align-items: center;

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
        text-decoration: none;
        border: 2px solid $system-prim;

        &:hover {
            cursor: pointer;
        }

        &--click:hover {
            border-bottom: 2px solid $system-tert;
        }
    }

    &__logo {
        width: 40px;
    }

    &__title {
        width: 60px;
        margin-left: 5px;
        font-size: 10px;
        color: $accept-prim;
    }
}
</style>

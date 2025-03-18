<template>
    <div class="header">
        <div class="header__group header__group--left">
            <router-link to="/" class="header__button header__button--left">
                <img src="/icons/logo.png" alt="DBMT logo" class="header__logo" />
                <p class="header__title">Database Modeling Tool</p>
            </router-link>
            <router-link to="/workspace" class="header__button header__button--click header__button--left"
                >Workspace</router-link
            >
        </div>
        <div class="header__group header__group--right">
            <div v-if="!user" class="header__button header__button--click header__button--right" @click="showSignUp">
                Sign Up
            </div>
            <div v-else>Profile image</div>
        </div>
    </div>
    <SignUp ref="signUpRef" @sign-up-success="updateUser" />
</template>

<script>
import SignUp from "./SignUp.vue";
import { useAuthStore } from "../stores/auth.js";
import { mapActions } from "pinia";

export default {
    name: "AppHeader",
    components: { SignUp },
    data() {
        return {
            apiUrl: import.meta.env.VITE_API_URL + "api/auth/me",
            user: null,
        };
    },
    mounted() {
        this.checkForUser();
    },
    methods: {
        ...mapActions(useAuthStore, ["setUser"]),
        showSignUp() {
            this.$refs.signUpRef.showDialog();
        },
        async checkForUser() {
            try {
                const response = await fetch(this.apiUrl, { credentials: "include" });
                if (response.ok) {
                    this.user = await response.json();
                    this.setUser(this.user);
                } else {
                    console.log("No valid user session! -> showing sign up button");
                }
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        },
        updateUser(user) {
            this.user = user;
            this.setUser(user);
        },
    },
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.header {
    max-width: 100vw;
    height: 8vh;
    position: sticky;
    top: 0;
    z-index: 1000;
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
        padding: 0;
        color: $text-prim;
        font-size: 16px;
        font-weight: 500;
        letter-spacing: 0.3px;
        text-decoration: none;
        border: 2px solid $system-prim;

        &:hover {
            cursor: pointer;
        }

        &--left {
            margin-left: 40px;
        }

        &--right {
            margin-right: 40px;
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

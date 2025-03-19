<template>
    <dialog ref="userProfileRef" class="profile" @click="handleDialogClick">
        <div class="profile__content">
            <img :src="user.picture" alt="user profile picture" class="profile__picture" />
            <div class="profile__name">{{ user.givenName + " " + user.familyName }}</div>
            <div class="profile__email">{{ user.email }}</div>
            <div class="profile__button profile__button--margin" @click="signOut">Sign out</div>
            <div class="profile__button" @click="deleteAccount">Delete account</div>
        </div>
    </dialog>
</template>

<script>
export default {
    name: "UserProfile",
    props: ["user"],
    data() {
        return {};
    },
    methods: {
        showDialog() {
            this.$refs.userProfileRef.showModal();
        },
        closeDialog() {
            this.$refs.userProfileRef.close();
        },
        handleDialogClick(event) {
            // Close the dialog if the click is outside the content
            const dialogContent = event.target.closest(".profile__content");
            if (!dialogContent) {
                this.$refs.userProfileRef.close();
            }
        },
        signOut() {
            this.$emit("sign-out");
        },
        deleteAccount() {
            this.$emit("delete-account");
        },
    },
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.profile {
    position: fixed;
    top: 9vh;
    left: 78vw;
    outline: none;
    border: none;
    border-radius: 5px;

    &__content {
        width: 20vw;
        padding: 30px;
    }

    &__picture {
        display: block;
        width: 90px;
        border-radius: 50%;
        margin: auto;
        margin-bottom: 30px;
    }

    &__name {
        font-size: 18px;
        margin-bottom: 7px;
    }

    &__email {
        font-weight: 300;
        font-size: 14px;
        margin-bottom: 30px;
    }

    &__button {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        color: $text-prim;
        border-radius: 5px;
        border: 1px solid $system-prim;

        &:hover {
            background-color: $system-prim;
            cursor: pointer;
        }

        &--margin {
            margin-bottom: 15px;
        }
    }
}
</style>

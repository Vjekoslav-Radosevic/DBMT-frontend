<template>
    <dialog ref="signUpRef" class="signup" @click="handleDialogClick">
        <div class="signup__content">
            <div class="signup__title">Sign Up</div>
            <div ref="googleLoginRef"></div>
        </div>
    </dialog>
</template>

<script>
export default {
    name: "SignUp",
    methods: {
        showDialog() {
            this.$refs.signUpRef.showModal();
        },
        closeDialog() {
            this.$refs.signUpRef.close();
        },
        handleDialogClick(event) {
            // Close the dialog if the click is outside the content
            const dialogContent = event.target.closest(".signup__content");
            if (!dialogContent) {
                this.$refs.signUpRef.close();
            }
        },
    },
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.signup {
    position: fixed;
    top: 9vh;
    left: 78vw;
    outline: none;
    border: none;
    border-radius: 5px;

    &::backdrop {
        background-color: rgba(0, 0, 0, 0.5);
    }

    &__content {
        width: 20vw;
        padding: 30px;
    }

    &__title {
        font-size: 20px;
        color: $text-prim;
        margin-bottom: 20px;
        text-align: center;
    }
}
</style>

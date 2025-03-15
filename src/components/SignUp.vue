<template>
    <dialog ref="dialogRef" class="signup" @click="handleDialogClick">
        <div class="signup__content">
            <div ref="googleLoginRef"></div>
        </div>
    </dialog>
</template>

<script>
export default {
    name: "NewVersionModal",
    mounted() {
        const gClientId = "592191942585-v6496s1r4olc6olr0ht938gk6ekg9f9b.apps.googleusercontent.com";
        window.google.accounts.id.initialize({
            client_id: gClientId,
            callback: this.handleCredentialResponse,
        });
        window.google.accounts.id.renderButton(this.$refs.googleLoginRef, { theme: "outline", size: "large" });
    },
    methods: {
        showDialog() {
            this.$refs.dialogRef.showModal();
        },
        handleDialogClick(event) {
            // Close the dialog if the click is outside the content
            const dialogContent = event.target.closest(".signup__content");
            if (!dialogContent) {
                this.$refs.dialogRef.close();
            }
        },
        handleCredentialResponse(response) {
            console.log(response);
        },
    },
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.signup {
    border: none;
    outline: none;
    border-radius: 5px;
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: none;

    &::backdrop {
        background-color: rgba(0, 0, 0, 0.5);
    }

    &__content {
        width: 40vw;
        height: 40vh;
    }
}
</style>

<template>
    <dialog ref="signUpRef" class="signup" @click="handleDialogClick">
        <div class="signup__content">
            <div ref="googleLoginRef"></div>
        </div>
    </dialog>
</template>

<script>
export default {
    name: "SignUp",
    data() {
        return {
            apiUrl: import.meta.env.VITE_API_URL + "api/users",
            clientId: import.meta.env.VITE_CLIENT_ID,
        };
    },
    mounted() {
        this.isGoogleAuthAvailable();
    },
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
        isGoogleAuthAvailable() {
            if (window.google && window.google.accounts) {
                this.initializeGoogleAuth();
            } else {
                setTimeout(this.isGoogleAuthAvailable, 100); // Retry after 100ms
            }
        },
        initializeGoogleAuth() {
            window.google.accounts.id.initialize({
                client_id: this.clientId,
                callback: this.handleCredentialResponse,
            });
            window.google.accounts.id.renderButton(this.$refs.googleLoginRef, { theme: "outline", size: "large" });
        },
        async handleCredentialResponse(response) {
            const token = response.credential;
            try {
                const response = await fetch(this.apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ token }),
                });

                if (response.ok) {
                    const user = response.json();
                    this.$emit("sign-up-success", user);
                } else {
                    console.error("Request failed with status:", response.status);
                }
            } catch (error) {
                console.error("Error occurred:", error);
            }
        },
    },
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.signup {
    position: fixed;
    top: 30vh;
    left: 50%;
    transform: translate(-50%, -50%);
    outline: none;
    border: none;
    border-radius: 5px;

    &::backdrop {
        background-color: rgba(0, 0, 0, 0.5);
    }

    &__content {
        width: 40vw;
        height: 40vh;
    }
}
</style>

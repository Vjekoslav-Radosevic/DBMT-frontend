<template>
    <dialog ref="dialogRef" class="signup" @click="handleDialogClick">
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
            this.$refs.dialogRef.showModal();
        },
        handleDialogClick(event) {
            // Close the dialog if the click is outside the content
            const dialogContent = event.target.closest(".signup__content");
            if (!dialogContent) {
                this.$refs.dialogRef.close();
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
            const decodedJwt = this.decodeJwtResponse(response.credential);
            const user = {
                email: decodedJwt.email,
                familyName: decodedJwt.family_name,
                givenName: decodedJwt.given_name,
                picture: decodedJwt.picture,
            };

            try {
                const response = await fetch(this.apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(user),
                });

                if (response.ok) {
                    this.$emit("sign-up-success", user);
                } else {
                    console.error("Request failed with status:", response.status);
                }
            } catch (error) {
                console.error("Error occurred:", error);
            }
        },
        decodeJwtResponse(token) {
            let base64Url = token.split(".")[1];
            let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            let jsonPayload = decodeURIComponent(
                atob(base64)
                    .split("")
                    .map(function (c) {
                        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                    })
                    .join(""),
            );

            return JSON.parse(jsonPayload);
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

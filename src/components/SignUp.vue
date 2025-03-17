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
            backendUrl: "http://localhost:8080/api/users",
        };
    },
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
        async handleCredentialResponse(response) {
            const user = this.decodeJwtResponse(response.credential);
            const requestBody = {
                email: user.email,
                familyName: user.family_name,
                givenName: user.given_name,
                picture: user.picture,
            };

            console.log(requestBody);

            // try {
            //     const response = await fetch(this.backendUrl, {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json",
            //         },
            //         body: JSON.stringify(requestBody),
            //     });

            //     if (response.ok) {
            //         const responseData = await response.text(); // Convert response to JSON
            //         console.log("JWT Token:", responseData);
            //     } else {
            //         console.error("Request failed with status:", response.status);
            //     }
            // } catch (error) {
            //     console.error("Error occurred:", error);
            // }
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

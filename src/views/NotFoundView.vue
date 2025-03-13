<template>
    <div class="not-found">
        <h1>404</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <router-link to="/" class="home-link">Go Back Home</router-link>
    </div>
</template>

<script>
export default {
    name: "NotFoundView",
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 92vh;
    text-align: center;
}

h1 {
    font-size: 6rem;
    color: $danger-prim;
    margin-bottom: 10px;
}

p {
    font-size: 1.5rem;
    color: $text-prim;
}

.home-link {
    margin-top: 20px;
    font-size: 1.2rem;
    color: $accept-prim;
    text-decoration: none;
    border: 2px solid $accept-prim;
    padding: 10px 20px;
    border-radius: 5px;
    transition: all 0.3s ease;
}

.home-link:hover {
    background: $accept-prim;
    color: $text-sec;
}
</style>

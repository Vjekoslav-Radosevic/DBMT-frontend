<template>
    <router-view />
</template>

<style>
html,
body {
    width: 100vw;
    height: 100vh;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

#app {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    font-family: "DM Sans", sans-serif;
    font-optical-sizing: auto;
    font-weight: 500;
    font-size: 15px;
}

input {
    background-color: rgb(234, 234, 234);
    border: none;
    border-bottom: 2px solid green;
    padding: 8px;
    width: 100%;
    font-size: 15px;
}
</style>

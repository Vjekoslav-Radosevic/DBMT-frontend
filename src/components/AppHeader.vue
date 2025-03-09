<template>
    <div class="header">
        <div class="left">
            <div class="header-button">ER Diagram</div>
            <div class="header-button">Home</div>
            <div class="header-button">Workspace</div>
        </div>
        <div class="right">
            <div class="header-button">About</div>
            <div class="header-button">Profile</div>
        </div>
    </div>
</template>

<style scoped>
.header {
    width: 100%;
    height: 60%;
    background-color: rgb(185, 185, 185);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 25px;
    padding-bottom: 3px;
    font-size: 18px;
}

.header-button:hover {
    cursor: pointer;
    border-bottom: 2px solid black;
}

.left,
.right {
    display: flex;
}

.left {
    justify-content: flex-start;
}

.right {
    justify-content: flex-end;
}
</style>

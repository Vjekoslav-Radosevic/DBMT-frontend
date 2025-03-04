import { defineStore } from "pinia";

export const useCanvasStore = defineStore("canvas", {
    state: () => ({
        ctx: null,
        canvasWidth: null,
        canvasHeight: null,
    }),
    getters: {
        getContext: (state) => state.ctx,
        getCanvasWidth: (state) => state.canvasWidth,
        getCanvasHeight: (state) => state.canvasHeight,
    },
    actions: {
        setContext(ctx) {
            this.ctx = ctx;
        },
        setCanvasWidth(width) {
            this.canvasWidth = width;
        },
        setCanvasHeight(height) {
            this.canvasHeight = height;
        },
    },
});

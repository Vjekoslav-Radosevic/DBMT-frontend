<template>
    <div ref="canvasContainerRef" class="canvas-container">
        <canvas
            ref="canvasRef"
            @mousedown="startDragging"
            @mousemove="drag"
            @mouseup="stopDragging"
            @mouseleave="stopDragging"
        ></canvas>
        <div class="canvas-size">
            <input
                v-model="canvas.width.current"
                @input="updateCanvasSize"
                type="text"
                :class="{ invalid: canvas.width.error }"
            />
            x
            <input
                v-model="canvas.height.current"
                @input="updateCanvasSize"
                type="text"
                :class="{ invalid: canvas.height.error }"
            />
        </div>
    </div>
</template>

<script>
import { useCanvasStore } from "../stores/index.js";
import { mapActions } from "pinia";
import { Relationship } from "@/erDiagram/models/Relationship.js";
import { Attribute } from "@/erDiagram/models/Attribute.js";
export default {
    name: "DiagramCanvas",
    props: ["elements", "connections", "attributeSchemas", "addingElement"],
    data() {
        return {
            pixelRatio: window.devicePixelRatio,
            isMouseDown: false,
            canvas: {
                width: { min: null, current: null, error: false },
                height: { min: null, current: null, error: false },
            },
        };
    },
    mounted() {
        const div = this.$refs.canvasContainerRef;

        const width = Math.round(div.clientWidth * this.pixelRatio);
        const height = Math.round(div.clientHeight * this.pixelRatio);

        this.canvas.width.min = width;
        this.canvas.height.min = height;

        this.canvas.width.current = width;
        this.canvas.height.current = height;

        this.setUpCanvas();
        this.setUpContext();
    },
    computed: {
        connectionsLength() {
            return this.connections.length;
        },
    },
    watch: {
        elements: {
            handler: function () {
                this.redrawCanvas();
            },
            deep: true,
        },
        connectionsLength: "redrawCanvas",
        attributeSchemas: {
            handler: function () {
                this.redrawCanvas();
            },
            deep: true,
        },
    },
    methods: {
        ...mapActions(useCanvasStore, ["setContext", "setCanvasWidth", "setCanvasHeight"]),

        setUpCanvas() {
            const canvas = this.$refs.canvasRef;

            canvas.width = this.canvas.width.current;
            canvas.height = this.canvas.height.current;

            this.setCanvasWidth(this.canvas.width.current);
            this.setCanvasHeight(this.canvas.height.current);
        },
        setUpContext() {
            const canvas = this.$refs.canvasRef;
            const ctx = canvas.getContext("2d");

            ctx.font = "14px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.lineWidth = 1;

            this.setContext(ctx);
        },
        updateCanvasSize() {
            let invalidInput = false;

            let inputWidth = this.canvas.width.current;
            let inputHeight = this.canvas.height.current;

            // Check if input is a valid number
            const isValidWidth = !isNaN(inputWidth) && inputWidth !== "";
            const isValidHeight = !isNaN(inputHeight) && inputHeight !== "";

            if (isValidWidth) {
                inputWidth = Number(inputWidth);
                if (inputWidth >= this.canvas.width.min) {
                    this.canvas.width.error = false;
                } else {
                    invalidInput = true;
                    this.canvas.width.error = true;
                }
            } else {
                invalidInput = true;
                this.canvas.width.error = true;
            }

            if (isValidHeight) {
                inputHeight = Number(inputHeight);
                if (inputHeight >= this.canvas.height.min) {
                    this.canvas.height.error = false;
                } else {
                    invalidInput = true;
                    this.canvas.height.error = true;
                }
            } else {
                invalidInput = true;
                this.canvas.height.error = true;
            }

            if (invalidInput) return;

            this.setUpCanvas();
            this.redrawCanvas();
        },
        startDragging(event) {
            // if the user is in the process of adding new element
            if (this.addingElement) {
                this.$emit("new-element-added", event);
                return;
            }

            this.isMouseDown = true;
            const { offsetX, offsetY } = event;

            const elementsAndSchemas = this.elements.concat(this.attributeSchemas);
            let elementActivated = false;
            for (let i = elementsAndSchemas.length - 1; i >= 0; i--) {
                // if attribute is part of attribute schema and is not present on canvas
                if (elementsAndSchemas[i] instanceof Attribute && !elementsAndSchemas[i].willDraw) continue;

                if (elementsAndSchemas[i].shape.startDragging(offsetX, offsetY)) {
                    this.$emit("activate-element", elementsAndSchemas[i]);
                    elementActivated = true;
                    break;
                }
            }

            // if neither one element was clicked, deativate currently active element
            if (!elementActivated) this.$emit("deactivate-element");
        },

        drag(event) {
            if (!this.isMouseDown) return;

            const { offsetX, offsetY } = event;
            this.elements.forEach((element) => {
                element.drag(offsetX, offsetY);
            });

            this.attributeSchemas.forEach((schema) => {
                schema.drag(offsetX, offsetY);
            });

            this.redrawCanvas();
        },

        stopDragging() {
            if (this.addingElement) return;

            this.isMouseDown = false;

            this.elements.forEach((element) => {
                element.shape.stopDragging();
            });

            this.attributeSchemas.forEach((schema) => {
                schema.shape.stopDragging();
            });
        },

        redrawCanvas() {
            const canvas = this.$refs.canvasRef;
            const ctx = canvas.getContext("2d");

            ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
            this.elements.forEach((element) => {
                if (element instanceof Relationship) {
                    element.freeEndpoints();
                }
            });
            this.connections.forEach((connection) => {
                connection.draw();
            });
            this.elements.forEach((element) => {
                element.draw();
            });
            this.attributeSchemas.forEach((schema) => {
                schema.draw();
            });
        },
        redrawWithWhiteBack() {
            const canvas = this.$refs.canvasRef;
            const ctx = canvas.getContext("2d");

            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height); // paint canvas background white

            this.elements.forEach((element) => {
                if (element instanceof Relationship) {
                    element.freeEndpoints();
                }
            });
            this.connections.forEach((connection) => {
                connection.draw();
            });
            this.elements.forEach((element) => {
                element.draw();
            });
            this.attributeSchemas.forEach((schema) => {
                schema.draw();
            });
        },
    },
};
</script>

<style scoped>
.canvas-container {
    width: 85vw;
    height: 100%;
    flex: 1;
    overflow: scroll;
}

.canvas-size {
    position: absolute;
    bottom: 30px;
    right: 30px;
    padding: 5px;
    border-radius: 4px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    background-color: rgb(234, 234, 234);
}

input {
    width: 55px;
    padding: 5px;
    font-size: 14px;
    text-align: center; /* Center text horizontally */
    vertical-align: middle; /* Align text vertically (helps slightly) */
    line-height: normal;
    background-color: rgb(234, 234, 234);
    border-bottom: 1px solid black;
}
.invalid {
    background-color: rgb(255, 159, 159);
    border-bottom: 2px solid rgb(201, 0, 0);
    border-radius: 4px 4px 0 0;
}
</style>

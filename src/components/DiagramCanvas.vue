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
                v-model.number="canvas.width.current"
                @input="updateCanvasSize"
                type="text"
                :class="{ invalid: invalidInput.width }"
            />
            x
            <input
                v-model.number="canvas.height.current"
                @input="updateCanvasSize"
                type="text"
                :class="{ invalid: invalidInput.height }"
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
                width: { min: null, current: null },
                height: { min: null, current: null },
            },
            invalidInput: { width: false, height: false },
        };
    },
    mounted() {
        const div = this.$refs.canvasContainerRef;
        this.canvas.width.min = div.clientWidth;
        this.canvas.height.min = div.clientHeight;
        this.setUpCanvas(div.clientWidth, div.clientHeight - 5); // there is some problem with height
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

        setUpCanvas(width, height) {
            const canvas = this.$refs.canvasRef;

            canvas.width = width * this.pixelRatio;
            canvas.height = height * this.pixelRatio;

            this.canvas.width.current = canvas.width;
            this.canvas.height.current = canvas.height;

            this.setCanvasWidth(canvas.width);
            this.setCanvasHeight(canvas.height);
        },
        setUpContext() {
            const canvas = this.$refs.canvasRef;
            const ctx = canvas.getContext("2d");

            ctx.font = "14px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";

            this.setContext(ctx);
        },
        updateCanvasSize() {
            let invalid = false;
            if (!Number.isInteger(this.canvas.width.current) || this.canvas.width.current < this.canvas.width.min) {
                invalid = true;
                this.invalidInput.width = true;
            } else {
                this.invalidInput.width = false;
            }

            if (!Number.isInteger(this.canvas.height.current) || this.canvas.height.current < this.canvas.height.min) {
                invalid = true;
                this.invalidInput.height = true;
            } else {
                this.invalidInput.height = false;
            }

            if (invalid) return;

            this.setUpCanvas(this.canvas.width.current, this.canvas.height.current);
            this.setUpContext();
            this.redrawCanvas();
        },
        startDragging(event) {
            if (this.addingElement) {
                // if the user is in the process of adding new element
                this.$emit("new-element-added", event);
            } else {
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
            }
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

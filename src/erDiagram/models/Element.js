import { Shape } from "../shapes/Shape.js";
import { v4 as uuidv4 } from "uuid";

export class Element {
    constructor(name, ctx, x, y, width, height) {
        this.id = uuidv4();
        this.name = name;
        this.ctx = ctx;
        this.active = false;
        this.shape = new Shape(ctx, x, y, width, height);
    }

    draw() {
        const textColor = "black";
        const backgroundColor = this.active ? "rgb(52, 235, 219)" : "white";
        this.shape.draw(this.name, backgroundColor, textColor);
    }

    getCenter() {
        return this.shape.getCenter();
    }

    toString() {
        return `Element {id: ${this.id}, name: ${this.name}}`;
    }
}

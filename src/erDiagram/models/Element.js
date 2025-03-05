import { Shape } from "../shapes/Shape.js";
import { v4 as uuidv4 } from "uuid";

export class Element {
    constructor(name, ctx, x, y, width, height) {
        this.id = uuidv4();
        this.name = name;
        this.ctx = ctx;
        this.active = false;
        this.shape = new Shape(ctx, x, y, width, height);

        this.textColor = "black";
        this.backgroundColor = "white";
        this.borderColor = "black";
    }

    draw() {
        const backgroundColor = this.active ? "rgb(52, 235, 219)" : this.backgroundColor;
        this.shape.draw(this.name, backgroundColor, this.textColor, this.borderColor);
    }

    getCenter() {
        return this.shape.getCenter();
    }

    toString() {
        return `Element {id: ${this.id}, name: ${this.name}}`;
    }
}

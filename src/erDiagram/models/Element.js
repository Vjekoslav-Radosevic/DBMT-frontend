import { Shape } from "../shapes/Shape.js";
import { v4 as uuidv4 } from "uuid";

export class Element {
    constructor(name, ctx, x, y, width, height) {
        this.shape = new Shape(ctx, x, y, width, height);
        this.id = uuidv4();
        this.name = name;
        this.active = false;

        this.textColor = "black";
        this.borderColor = "gray";
        this.inactiveBgColor = "white";
        this.activeBgColor = "rgb(44, 255, 44)";
    }

    draw() {
        const backgroundColor = this.active ? this.activeBgColor : this.inactiveBgColor;
        this.shape.draw(this.name, backgroundColor, this.textColor, this.borderColor);
    }

    getCenter() {
        return this.shape.getCenter();
    }

    toString() {
        return `Element {id: ${this.id}, name: ${this.name}}`;
    }
}

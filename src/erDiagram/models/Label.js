import { LabelShape } from "../shapes/LabelShape.js";
import { Element } from "./Element.js";

export class Label extends Element {
    constructor(name, ctx, x, y, width, height) {
        super(name, ctx, x, y, width, height);
        this.shape = new LabelShape(ctx, x, y, width, height);

        this.text = "";
        this.textColor = "black";
        this.backgroundColor = "white";
        this.borderColor = "gray";
    }

    drag(mouseX, mouseY) {
        this.shape.drag(mouseX, mouseY, []);
    }

    draw() {
        const backgroundColor = this.active ? "rgb(136, 235, 226)" : this.backgroundColor;
        this.shape.draw(this.text, backgroundColor, this.textColor, this.borderColor);
    }

    // eslint-disable-next-line no-unused-vars
    getAllElementsRecursive(includeMyself, includeMyAttributes) {
        return [this];
    }

    toString() {
        return `Label {id: ${this.id}, name: ${this.name}}`;
    }
}

import { LabelShape } from "../shapes/LabelShape.js";
import { Element } from "./Element.js";

export class Label extends Element {
    constructor(name, ctx, x, y, width, height, isDragging, offset, text) {
        super(name, ctx, x, y, width, height, isDragging, offset);
        this.shape = new LabelShape(ctx, x, y, width, height, isDragging, offset);
        this.text = text;
    }

    drag(mouseX, mouseY) {
        this.shape.drag(mouseX, mouseY);
    }

    draw() {
        const backgroundColor = this.active ? this.activeBgColor : this.inactiveBgColor;
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

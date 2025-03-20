import { LabelShape } from "../shapes/LabelShape.js";
import { Element } from "./Element.js";

export class Label extends Element {
    constructor(name, ctx, x, y, width, height) {
        super(name, ctx, x, y, width, height);
        this.shape = new LabelShape(ctx, x, y, width, height);
        this.type = "Label";
        this.text = "";
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

    stringify() {
        let shape = JSON.parse(JSON.stringify(this.shape));
        delete shape.ctx;
        delete shape.isDragging;
        delete shape.offset;

        return {
            id: this.id,
            name: this.name,
            type: this.type,
            text: this.text,
            shape,
        };
    }

    toString() {
        return `Label {id: ${this.id}, name: ${this.name}}`;
    }
}

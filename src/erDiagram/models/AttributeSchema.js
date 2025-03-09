import { AttributeSchemaShape } from "../shapes/AttributeSchemaShape.js";
import { Element } from "./Element.js";

export class AttributeSchema extends Element {
    constructor(name, ctx, x, y, width, height, entity) {
        super(name, ctx, x, y, width, height);
        this.shape = new AttributeSchemaShape(ctx, x, y, width, height);
        this.entity = entity; // entity to which attributes belong
    }

    drag(mouseX, mouseY) {
        this.shape.drag(mouseX, mouseY, []);
    }

    draw() {
        const backgroundColor = this.active ? this.activeBgColor : this.inactiveBgColor;
        this.shape.draw(this.entity.name, this.entity.attributes, backgroundColor, this.textColor, this.borderColor);
    }

    // getAllElementsRecursive(includeMyself, includeMyAttributes) {
    //     return [this];
    // }

    toString() {
        return `AttributeSchema {id: ${this.id}, name: ${this.name}}`;
    }
}

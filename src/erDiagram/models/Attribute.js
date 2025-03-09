import { Element } from "./Element.js";
import { AttributeShape } from "../shapes/AttributeShape.js";

export class Attribute extends Element {
    constructor(name, ctx, x, y, width, height, parentElement) {
        super(name, ctx, x, y);
        this.parentElement = parentElement;
        this.shape = new AttributeShape(ctx, x, y, width, height);
        this.attributes = [];
        this.properties = {
            composite: false,
            multiValued: false,
            unique: false,
            optional: false,
            derived: false,
        };
        this.willDraw = true; // if parent entity attribute schema is active, this is false
    }

    draw() {
        if (!this.willDraw) return;
        const backgroundColor = this.active ? this.activeBgColor : this.inactiveBgColor;
        this.shape.draw(this.name, this.properties, backgroundColor, this.textColor, this.borderColor);
    }

    drag(mouseX, mouseY) {
        const delta = this.shape.drag(mouseX, mouseY);
        if (!delta) return;
        this.attributes.forEach((attr) => attr.updatePosition(delta.deltaX, delta.deltaY));
    }

    updatePosition(deltaX, deltaY) {
        this.shape.x += deltaX;
        this.shape.y += deltaY;
        this.attributes.forEach((attribute) => {
            attribute.updatePosition(deltaX, deltaY);
        });
    }

    addAttribute(name, width, height, canvasWidth, canvasHeight) {
        let positions = [
            [0, 0.75 * width],
            [width * 1.25, 0.75 * width],
            [width * -1.25, 0.75 * width],
            [width * 1.25, 0],
            [width * -1.25, 0],
            [width * 1.25, -0.75 * width],
            [width * -1.25, -0.75 * width],
            [0, -0.75 * width],
        ];

        let x, y;
        for (let factor = 1; factor < 5; factor++) {
            for (let i = 0; i < positions.length; i++) {
                let position = positions[i];
                x = this.shape.x + position[0] * factor;
                y = this.shape.y + position[1] * factor;

                let inside = this.attributes.some(
                    (attribute) =>
                        attribute.shape.isInsideRect(x, y) ||
                        x >= canvasWidth - width ||
                        x < 0 ||
                        y >= canvasHeight - height ||
                        y < 0,
                );

                if (!inside) {
                    let newAttribute = new Attribute(name, this.shape.ctx, x, y, width, height, this);
                    this.attributes.push(newAttribute);
                    return newAttribute;
                }
            }
        }

        let newAttribute = new Attribute(
            name,
            this.shape.ctx,
            this.shape.x + positions[0][0],
            this.shape.y + positions[0][1],
            width,
            height,
            this,
        );
        this.attributes.push(newAttribute);
        return newAttribute;
    }

    removeAttribute(attribute) {
        this.attributes = this.attributes.filter((attr) => attr.id != attribute.id);
    }

    removeAllAttributes() {
        this.attributes = [];
    }

    removeFromParent() {
        this.parentElement.removeAttribute(this);
    }

    getAllElementsRecursive(includeMyself, includeMyAttributes) {
        let allElements = [];

        if (includeMyself) allElements.push(this);

        if (includeMyAttributes) {
            this.attributes.forEach((attribute) => {
                allElements = allElements.concat(attribute.getAllElementsRecursive(true, true));
            });
        }

        return allElements;
    }

    toString() {
        return `Attribute { 
    id: ${this.id}
    name: ${this.name},
    parentElement: ${this.parentElement.name},
    composite: ${this.properties.composite}
    multi-valued: ${this.properties.multiValued}
    unique: ${this.properties.unique}
    optional: ${this.properties.optional}
    derived: ${this.properties.derived}
}`;
    }
}

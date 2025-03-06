import { RegularEntityShape } from "../shapes/entities/RegularEntityShape.js";
import { Element } from "./Element.js";
import { Attribute } from "./Attribute.js";

export class Entity extends Element {
    constructor(name, ctx, x, y, width, height, attributes = []) {
        super(name, ctx, x, y, width, height);
        this.shape = new RegularEntityShape(ctx, x, y, width, height);
        this.attributes = attributes;
        this.attributes.forEach((attribute) => (attribute.parentElement = this)); // make this Entity the parent of every attribute from it's attributes list
        this.attributeSchemaActive = false;
    }

    drag(mouseX, mouseY) {
        this.shape.drag(mouseX, mouseY, this.attributes);
    }

    getNearestPoint(coordinates) {
        return this.shape.getNearestPoint(coordinates);
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

    removeAllAttributes() {
        this.attributes = [];
    }

    getAllElementsRecursive(includeMyself, includeMyAttributes) {
        let allElements = [];

        if (includeMyself) allElements.push(this);

        // Include my attributes if requested (and their attributes)
        if (includeMyAttributes) {
            this.attributes.forEach((attribute) => {
                allElements = allElements.concat(attribute.getAllElementsRecursive(true, true));
            });
        }

        if (this.entities) {
            this.entities.forEach((entity) => {
                allElements = allElements.concat(entity.getAllElementsRecursive(true, true));
            });
        }

        return allElements;
    }

    removeAttribute(attribute) {
        this.attributes = this.attributes.filter((attr) => attr.id != attribute.id);
    }

    toString() {
        return `Entity {id: ${this.id}, name: ${this.name}, attributes: ${this.attributes}}`;
    }
}

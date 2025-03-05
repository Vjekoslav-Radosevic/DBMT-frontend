import { Element } from "./Element.js";
import { Attribute } from "./Attribute.js";
import { RelationshipShape } from "../shapes/RelationshipShape.js";

export class Relationship extends Element {
    constructor(name, ctx, x, y, width, height) {
        super(name, ctx, x, y, width, height);
        this.shape = new RelationshipShape(ctx, x, y, width, height);
        this.identifying = false;
        this.attributes = [];
        this.entities = {
            entity1: {
                text: "Entity 1",
                entity: null,
                min: "",
                max: "",
                errorMin: "",
                errorMax: "",
            },
            entity2: {
                text: "Entity 2",
                entity: null,
                min: "",
                max: "",
                errorMin: "",
                errorMax: "",
            },
            entity3: {
                text: "Entity 3",
                entity: null,
                min: "",
                max: "",
                errorMin: "",
                errorMax: "",
            },
        };
        this.textColor = "black";
        this.backgroundColor = "white";
        this.borderColor = "black";
    }

    drag(mouseX, mouseY) {
        this.shape.drag(mouseX, mouseY, this.attributes);
    }

    draw() {
        const backgroundColor = this.active ? "rgb(52, 235, 219)" : this.backgroundColor;
        this.shape.draw(this.name, this.identifying, backgroundColor, this.textColor, this.borderColor);
    }

    getNearestEndpoint(x, y) {
        return this.shape.getNearestEndpoint(x, y);
    }

    freeEndpoints() {
        this.shape.freeEndpoints();
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

        return allElements;
    }

    removeAttribute(attribute) {
        this.attributes = this.attributes.filter((attr) => attr.id != attribute.id);
    }

    toString() {
        return `Relationship {id: ${this.id}, name: ${this.name}, identifying: ${this.identifying}, attributes: ${this.attributes}}`;
    }
}

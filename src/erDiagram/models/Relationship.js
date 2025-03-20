import { Element } from "./Element.js";
import { Attribute } from "./Attribute.js";
import { RelationshipShape } from "../shapes/RelationshipShape.js";

export class Relationship extends Element {
    constructor(name, ctx, x, y, width, height) {
        super(name, ctx, x, y, width, height);
        this.shape = new RelationshipShape(ctx, x, y, width, height);
        this.type = "Relationship";
        this.identifying = false;
        this.attributes = [];
        this.attributeSchema = null;
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
    }

    drag(mouseX, mouseY) {
        const delta = this.shape.drag(mouseX, mouseY);
        if (!delta) return;
        this.attributes.forEach((attr) => attr.updatePosition(delta.deltaX, delta.deltaY));
    }

    draw() {
        const backgroundColor = this.active ? this.activeBgColor : this.inactiveBgColor;
        this.shape.draw(this.name, this.identifying, backgroundColor, this.textColor, this.borderColor);
    }

    getNearestEndpoint(x, y) {
        let nearestEndpoint = this.shape.getNearestEndpoint(x, y);

        if (this.isReflexive()) {
            nearestEndpoint = this.shape.getReflexiveEndpoint(nearestEndpoint);
            this.shape.endpoints[nearestEndpoint.prop] = true;
        } else {
            // Mark the nearest endpoint as taken
            this.shape.endpoints[nearestEndpoint.prop] = true;
        }

        return nearestEndpoint;
    }

    freeEndpoints() {
        this.shape.freeEndpoints();
    }

    isReflexive() {
        const counts = {};
        let entities = Object.values(this.entities).map((value) => value.entity);
        entities = entities.filter((entity) => entity); // filter out null values

        for (const entity of entities) {
            if (!counts[entity.id]) {
                counts[entity.id] = { entity: entity, appearance: 1 };
            } else {
                counts[entity.id].appearance++;
            }
        }

        const duplicates = Object.values(counts).filter((value) => value.appearance > 1);

        if (duplicates.length) {
            return duplicates[0];
        } else {
            return null;
        }
    }

    resetEntity(entityText, resetActualEntity) {
        Object.values(this.entities).forEach((entity) => {
            if (entity.text === entityText) {
                entity.min = "";
                entity.max = "";
                entity.errorMin = "";
                entity.errorMax = "";

                if (resetActualEntity) {
                    entity.entity = null;
                }
            }
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

    stringify() {
        let shape = JSON.parse(JSON.stringify(this.shape));
        delete shape.ctx;

        let attributes = [];
        if (this.attributes) {
            this.attributes.forEach((attr) => {
                attributes.push(attr.stringify());
            });
        }

        let attributeSchema = null;
        if (this.attributeSchema) {
            attributeSchema = this.attributeSchema.stringify();
        }

        let entities = {
            entity1: {
                text: "Entity 1",
                entity: this.entities.entity1.entity?.id || null,
                min: this.entities.entity1.min,
                max: this.entities.entity1.max,
                errorMin: this.entities.entity1.errorMin,
                errorMax: this.entities.entity1.errorMax,
            },
            entity2: {
                text: "Entity 2",
                entity: this.entities.entity2.entity?.id || null,
                min: this.entities.entity2.min,
                max: this.entities.entity2.max,
                errorMin: this.entities.entity2.errorMin,
                errorMax: this.entities.entity2.errorMax,
            },
            entity3: {
                text: "Entity 3",
                entity: this.entities.entity3.entity?.id || null,
                min: this.entities.entity3.min,
                max: this.entities.entity3.max,
                errorMin: this.entities.entity3.errorMin,
                errorMax: this.entities.entity3.errorMax,
            },
        };

        return {
            id: this.id,
            name: this.name,
            type: this.type,
            identifying: this.identifying,
            shape,
            attributes: [...attributes],
            attributeSchema: attributeSchema,
            entities: { ...entities },
        };
    }

    toString() {
        return `Relationship {id: ${this.id}, name: ${this.name}, identifying: ${this.identifying}, attributes: ${this.attributes}}`;
    }
}

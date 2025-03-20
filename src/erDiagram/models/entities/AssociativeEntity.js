import { AssociativeEntityShape } from "../../shapes/entities/AssociativeEntityShape.js";
import { Entity } from "../Entity.js";
import { RegularEntity } from "./RegularEntity.js";
import { WeakEntity } from "./WeakEntity.js";
import { DegenerativeEntity } from "./DegenerativeEntity.js";
import { SuperTypeEntity } from "./SuperTypeEntity.js";

export class AssociativeEntity extends Entity {
    constructor(name, ctx, x, y, width, height, isDragging, offset, attributes, attributeSchema) {
        super(name, ctx, x, y, width, height, isDragging, offset, attributes, attributeSchema);
        this.shape = new AssociativeEntityShape(ctx, x, y, width, height, isDragging, offset);
        this.type = "Associative";
    }

    turnToRegularEntity() {
        return new RegularEntity(
            this.name,
            this.ctx,
            this.shape.x,
            this.shape.y,
            this.shape.width,
            this.shape.height,
            this.shape.isDragging,
            this.shape.offset,
            this.attributes,
            this.attributeSchema,
            null,
        );
    }

    turnToDegenerativeEntity() {
        return new DegenerativeEntity(
            this.name,
            this.ctx,
            this.shape.x,
            this.shape.y,
            this.shape.width,
            this.shape.height,
            this.shape.isDragging,
            this.shape.offset,
            [],
            null,
        );
    }

    turnToWeakEntity() {
        return new WeakEntity(
            this.name,
            this.ctx,
            this.shape.x,
            this.shape.y,
            this.shape.width,
            this.shape.height,
            this.shape.isDragging,
            this.shape.offset,
            this.attributes,
            this.attributeSchema,
        );
    }

    turnToSuperTypeEntity() {
        return new SuperTypeEntity(
            this.name,
            this.ctx,
            this.shape.x,
            this.shape.y,
            this.shape.width,
            this.shape.height,
            this.shape.isDragging,
            this.shape.offset,
            this.attributes,
            this.attributeSchema,
            null,
        );
    }

    toString() {
        return `AssociativeEntity {id: ${this.id}, name: ${this.name}, attributes: ${this.attributes}}`;
    }
}

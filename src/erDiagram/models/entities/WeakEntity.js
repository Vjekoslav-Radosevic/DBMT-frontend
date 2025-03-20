import { Entity } from "../Entity.js";
import { RegularEntity } from "./RegularEntity.js";
import { AssociativeEntity } from "./AssociativeEntity.js";
import { DegenerativeEntity } from "./DegenerativeEntity.js";
import { WeakEntityShape } from "../../shapes/entities/WeakEntityShape.js";
import { SuperTypeEntity } from "./SuperTypeEntity.js";

export class WeakEntity extends Entity {
    constructor(name, ctx, x, y, width, height, isDragging, offset, attributes) {
        super(name, ctx, x, y, width, height, isDragging, offset, attributes);
        this.type = "Weak";
        this.shape = new WeakEntityShape(ctx, x, y, width, height, isDragging, offset);
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
        );
    }

    turnToAssociativeEntity() {
        return new AssociativeEntity(
            this.name,
            this.ctx,
            this.shape.x,
            this.shape.y,
            this.shape.width,
            this.shape.height,
            this.shape.isDragging,
            this.shape.offset,
            this.attributes,
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
            null,
        );
    }

    toString() {
        return `WeakEntity {id: ${this.id}, name: ${this.name}, attributes: ${this.attributes}}`;
    }
}

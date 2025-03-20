import { DegenerativeEntityShape } from "../../shapes/entities/DegenerativeEntityShape.js";
import { Entity } from "../Entity.js";
import { RegularEntity } from "./RegularEntity.js";
import { WeakEntity } from "./WeakEntity.js";
import { AssociativeEntity } from "./AssociativeEntity.js";
import { SuperTypeEntity } from "./SuperTypeEntity.js";

export class DegenerativeEntity extends Entity {
    constructor(name, ctx, x, y, width, height, isDragging, offset) {
        super(name, ctx, x, y, width, height, isDragging, offset);
        this.type = "Degenerative";
        this.shape = new DegenerativeEntityShape(ctx, x, y, width, height, isDragging, offset);
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
            [],
            null,
        );
    }

    turnToWeakEntity() {
        return new WeakEntity(this.name, this.ctx, this.shape.x, this.shape.y, this.shape.width, this.shape.height, []);
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
            [],
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
            [],
            null,
        );
    }

    addAttribute() {}

    removeAttribute() {}

    toString() {
        return `DegenerativeEntity {id: ${this.id}, name: ${this.name}}`;
    }
}

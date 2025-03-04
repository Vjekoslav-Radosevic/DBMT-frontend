import { RegularEntityShape } from "../../shapes/entities/RegularEntityShape.js";
import { Entity } from "../Entity.js";
import { WeakEntity } from "./WeakEntity.js";
import { AssociativeEntity } from "./AssociativeEntity.js";
import { DegenerativeEntity } from "./DegenerativeEntity.js";
import { SuperTypeEntity } from "./SuperTypeEntity.js";

export class RegularEntity extends Entity {
    constructor(name, ctx, x, y, width, height, attributes, parentElement) {
        super(name, ctx, x, y, width, height, attributes);
        this.type = "Regular";
        this.shape = new RegularEntityShape(ctx, x, y, width, height);
        this.parentElement = parentElement;
    }

    updatePosition(deltaX, deltaY) {
        this.shape.x += deltaX;
        this.shape.y += deltaY;
        this.attributes.forEach((attribute) => {
            attribute.updatePosition(deltaX, deltaY);
        });
    }

    turnToDegenerativeEntity() {
        return new DegenerativeEntity(
            this.name,
            this.ctx,
            this.shape.x,
            this.shape.y,
            this.shape.width,
            this.shape.height,
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
            this.attributes,
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
            this.attributes,
        );
    }

    turnToSuperTypeEntity() {
        let superTypeEntity = new SuperTypeEntity(
            this.name,
            this.ctx,
            this.shape.x,
            this.shape.y,
            this.shape.width,
            this.shape.height,
            this.attributes,
            this.parentElement,
        );

        if (this.parentElement) {
            this.parentElement.removeEntity(this);
            this.parentElement.addEntityToList(superTypeEntity);
        }
        return superTypeEntity;
    }

    removeFromParent() {
        if (this.parentElement) this.parentElement.removeEntity(this);
    }

    toString() {
        return `RegularEntity {id: ${this.id}, name: ${this.name}, attributes: ${this.attributes}}`;
    }
}

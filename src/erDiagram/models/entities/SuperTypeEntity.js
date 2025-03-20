import { SuperTypeEntityShape } from "../../shapes/entities/SuperTypeEntityShape.js";
import { Entity } from "../Entity.js";
import { RegularEntity } from "./RegularEntity.js";
import { WeakEntity } from "./WeakEntity.js";
import { AssociativeEntity } from "./AssociativeEntity.js";
import { DegenerativeEntity } from "./DegenerativeEntity.js";
import { SuperTypeConnection } from "../connections/SuperTypeConnection.js";

export class SuperTypeEntity extends Entity {
    constructor(name, ctx, x, y, width, height, isDragging, offset, attributes, parentElement) {
        super(name, ctx, x, y, width, height, isDragging, offset, attributes);
        this.type = "SuperType";
        this.shape = new SuperTypeEntityShape(ctx, x, y, width, height, isDragging, offset);
        this.parentElement = parentElement;
        this.specializationType = "Disjointed";
        this.entities = [];
    }

    draw() {
        const backgroundColor = this.active ? this.activeBgColor : this.inactiveBgColor;
        this.shape.draw(
            this.name,
            this.specializationType[0].toLowerCase(),
            backgroundColor,
            this.textColor,
            this.borderColor,
        );
    }

    drag(mouseX, mouseY) {
        const delta = this.shape.drag(mouseX, mouseY);
        if (!delta) return;
        this.attributes.forEach((attr) => attr.updatePosition(delta.deltaX, delta.deltaY));
        this.entities.forEach((entity) => entity.updatePosition(delta.deltaX, delta.deltaY));
    }

    getCircleCenter() {
        return this.shape.getCircleCenter();
    }

    updatePosition(deltaX, deltaY) {
        this.shape.x += deltaX;
        this.shape.y += deltaY;

        this.entities.forEach((entity) => {
            entity.updatePosition(deltaX, deltaY);
        });

        this.attributes.forEach((attribute) => {
            attribute.updatePosition(deltaX, deltaY);
        });
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
            this.parentElement,
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

    addEntity(name, width, height, canvasWidth, canvasHeight) {
        const positions = [0, width * 1.25, -1.25 * width, 2.5 * width, -2.5 * width];

        let x, y;
        for (let factor = 1; factor < 7; factor++) {
            for (let i = 0; i < positions.length; i++) {
                x = this.shape.x + positions[i];
                y = this.shape.y + this.shape.height + (height + this.shape.entityToCircleDistance) * factor;

                let inside = this.entities.some(
                    (entity) =>
                        entity.shape.isInside(x, y) ||
                        x >= canvasWidth - width ||
                        x < 0 ||
                        y >= canvasHeight - height ||
                        y < 0,
                );

                if (!inside) {
                    const newEntity = new RegularEntity(
                        name,
                        this.shape.ctx,
                        x,
                        y,
                        width,
                        height,
                        false,
                        { x: 0, y: 0 },
                        [],
                        this,
                    );
                    this.entities.push(newEntity);
                    const newConnection = new SuperTypeConnection(this.shape.ctx, this, newEntity);

                    return {
                        element: newEntity,
                        connection: newConnection,
                    };
                }
            }
        }

        // calculate fallback X and Y coordinates if all positions above are already taken
        const fallbackX = this.shape.x + positions[0];
        const fallbackY = this.shape.y + this.shape.height + (height + this.shape.entityToCircleDistance);

        const newEntity = new RegularEntity(
            name,
            this.shape.ctx,
            fallbackX,
            fallbackY,
            width,
            height,
            false,
            { x: 0, y: 0 },
            [],
            this,
        );
        this.entities.push(newEntity);
        const newConnection = new SuperTypeConnection(this.shape.ctx, this, newEntity);

        return {
            element: newEntity,
            connection: newConnection,
        };
    }

    removeFromParent() {
        if (this.parentElement) this.parentElement.removeEntity(this);
    }

    removeEntity(entity) {
        this.entities = this.entities.filter((e) => e !== entity);
    }

    addEntityToList(entity) {
        this.entities.push(entity);
    }

    toString() {
        return `SuperTypeEntity {id: ${this.id}, name: ${this.name}, attributes: ${this.attributes}, entities: ${this.entities}}`;
    }
}

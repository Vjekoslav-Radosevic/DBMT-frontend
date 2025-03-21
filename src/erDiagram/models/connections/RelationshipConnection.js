import { RelationshipConnectionShape } from "../../shapes/connections/RelationshipConnectionShape.js";
import { Connection } from "../Connection.js";

export class RelationshipConnection extends Connection {
    constructor(ctx, element1, element2, entityText) {
        super(ctx, element1, element2); // element1 is always Relationship
        this.type = "RelationshipConnection";
        this.entityText = entityText; // 'Entity 1' or 'Entity 2' or 'Entity 3'
        this.connectionShape = new RelationshipConnectionShape(ctx);
    }

    draw() {
        const entityCenter = this.element2.getCenter();
        const relationshipEndpoint = this.element1.getNearestEndpoint(entityCenter.x, entityCenter.y);
        const entityNearestPoint = this.element2.getNearestPoint(relationshipEndpoint);

        const entity = Object.values(this.element1.entities).find(
            (value) => value.entity === this.element2 && value.text === this.entityText,
        );

        if (!entity) return; // if relationship's entities property is not updated yet

        this.connectionShape.draw(entityNearestPoint, relationshipEndpoint, entity, this.lineColor);
    }

    stringify() {
        return {
            id: this.id,
            type: this.type,
            willDraw: this.willDraw,
            element1: this.element1.id,
            element2: this.element2.id,
            entityText: this.entityText,
        };
    }
}

import { RelationshipConnectionShape } from "../../shapes/connections/RelationshipConnectionShape.js";
import { Connection } from "../Connection.js";

export class RelationshipConnection extends Connection {
    constructor(ctx, element1, element2) {
        super(ctx, element1, element2); // element1 is always Relationship

        this.connectionShape = new RelationshipConnectionShape(ctx);
    }

    draw() {
        const entityCenter = this.element2.getCenter();
        const relationshipNearestPoint = this.element1.getNearestEndpoint(entityCenter.x, entityCenter.y);
        const entityNearestPoint = this.element2.getNearestPoint(relationshipNearestPoint);

        let entity = Object.values(this.element1.entities).find((value) => value.entity === this.element2);

        if (!entity) return; // if relationship's entities property is not updated yet

        this.connectionShape.draw(entityNearestPoint, relationshipNearestPoint, entity, this.lineColor);
    }
}

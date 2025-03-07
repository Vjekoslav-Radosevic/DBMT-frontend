import { RelationshipConnectionShape } from "../../shapes/connections/RelationshipConnectionShape.js";
import { Connection } from "../Connection.js";

export class RelationshipConnection extends Connection {
    constructor(ctx, element1, element2) {
        super(ctx, element1, element2); // element1 is always Relationship

        this.connectionShape = new RelationshipConnectionShape(ctx);
    }

    draw() {
        let entityNearestPoint = this.element2.getNearestPoint(this.element1.getCenter());
        let relationshipNearestPoint = this.element1.getNearestEndpoint(entityNearestPoint.x, entityNearestPoint.y);

        let entity = Object.values(this.element1.entities).find((value) => value.entity === this.element2);

        if (!entity) return; // if relationship's entities property is not updated yet

        this.connectionShape.draw(entityNearestPoint, relationshipNearestPoint, entity, this.lineColor);
    }
}

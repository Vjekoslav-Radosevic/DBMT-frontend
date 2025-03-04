import { SuperTypeConnectionShape } from "../../shapes/connections/SuperTypeConnectionShape.js";
import { Connection } from "../Connection.js";

export class SuperTypeConnection extends Connection {
    constructor(ctx, element1, element2) {
        super(ctx, element1, element2);
        this.connectionShape = new SuperTypeConnectionShape(ctx);
    }

    draw() {
        let start = this.element1.getCircleCenter();
        let end = this.element2.getCenter();
        this.connectionShape.draw(start, end);
    }
}

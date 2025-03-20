import { SuperTypeConnectionShape } from "../../shapes/connections/SuperTypeConnectionShape.js";
import { Connection } from "../Connection.js";

export class SuperTypeConnection extends Connection {
    constructor(ctx, element1, element2, willDraw) {
        super(ctx, element1, element2, willDraw); //element1 is always SuperTypeEntity
        this.connectionShape = new SuperTypeConnectionShape(ctx);
    }

    draw() {
        const start = this.element1.getCircleCenter();
        const end = this.element2.getCenter();
        this.connectionShape.draw(start, end, this.lineColor);
    }
}

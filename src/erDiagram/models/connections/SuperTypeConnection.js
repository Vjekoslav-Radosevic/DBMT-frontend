import { SuperTypeConnectionShape } from "../../shapes/connections/SuperTypeConnectionShape.js";
import { Connection } from "../Connection.js";

export class SuperTypeConnection extends Connection {
    constructor(ctx, element1, element2) {
        super(ctx, element1, element2); // element1 is alwasy SuperTypeEntity
        this.connectionShape = new SuperTypeConnectionShape(ctx);
    }

    draw() {
        const start = this.element1.getCircleCenter();
        const end = this.element2.getCenter();
        this.connectionShape.draw(start, end, this.lineColor);
    }

    stringify() {
        return {
            id: this.id,
            type: this.type,
            willDraw: this.willDraw,
            element1: this.element1.id,
            element2: this.element2.id,
        };
    }
}

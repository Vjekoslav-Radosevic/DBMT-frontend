import { ConnectionShape } from "../shapes/ConnectionShape.js";
import { v4 as uuidv4 } from "uuid";

export class Connection {
    constructor(ctx, element1, element2) {
        this.id = uuidv4();
        this.type = "RegularConnection";
        this.element1 = element1;
        this.element2 = element2;
        this.connectionShape = new ConnectionShape(ctx);
        this.willDraw = true; // if it connects to attribute that is hidden because of attribute schema
        this.lineColor = "gray";
    }

    updateConnection(element1, element2) {
        this.element1 = element1;
        this.element2 = element2;
    }

    draw() {
        if (!this.willDraw) return;

        let start = this.element1.getCenter();
        let end = this.element2.getCenter();
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

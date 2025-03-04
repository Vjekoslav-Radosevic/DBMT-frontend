import { ConnectionShape } from "../shapes/ConnectionShape.js";

export class Connection {
    constructor(ctx, element1, element2) {
        this.element1 = element1;
        this.element2 = element2;
        this.connectionShape = new ConnectionShape(ctx);
    }

    updateConnection(element1, element2) {
        this.element1 = element1;
        this.element2 = element2;
    }

    draw() {
        let start = this.element1.getCenter();
        let end = this.element2.getCenter();
        this.connectionShape.draw(start, end);
    }
}

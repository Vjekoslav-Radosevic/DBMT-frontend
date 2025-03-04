export class ConnectionShape {
    constructor(ctx) {
        this.ctx = ctx;
    }

    draw(start, end) {
        this.ctx.beginPath();
        this.ctx.moveTo(start.x, start.y); // Move to the starting point
        this.ctx.lineTo(end.x, end.y); // Draw a line to the ending point
        this.ctx.closePath();
        this.ctx.stroke();
    }
}

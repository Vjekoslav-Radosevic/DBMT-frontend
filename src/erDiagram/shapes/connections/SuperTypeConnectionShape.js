import { ConnectionShape } from "../ConnectionShape.js";

export class SuperTypeConnectionShape extends ConnectionShape {
    constructor(ctx) {
        super(ctx);
        this.halfCircleRadius = 8;
    }

    draw(start, end, lineColor) {
        this.ctx.save();

        this.ctx.strokeStyle = lineColor;

        // draw line from circle center to the subEntity center
        this.ctx.beginPath();
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineTo(end.x, end.y);
        this.ctx.closePath();
        this.ctx.stroke();

        // Calculate one fourth of the line
        const fourthX = start.x + (end.x - start.x) / 4;
        const fourthY = start.y + (end.y - start.y) / 4;

        // Calculate the angle of the line
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const angle = Math.atan2(dy, dx); // Angle of the line in radians

        // Draw the half-circle at the midpoint of the line
        this.ctx.beginPath();
        this.ctx.arc(
            fourthX, // Center of the arc (fourth of the line)
            fourthY, // Center of the arc (fourth of the line)
            this.halfCircleRadius, // Radius of the arc
            angle - Math.PI / 2, // Start angle (90 degrees to the left of the line)
            angle + Math.PI / 2, // End angle (90 degrees to the right of the line)
        );
        this.ctx.stroke();

        this.ctx.restore();
    }
}

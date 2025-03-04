import { ConnectionShape } from "../ConnectionShape.js";

export class RelationshipConnectionShape extends ConnectionShape {
    constructor(ctx) {
        super(ctx);
    }

    draw(start, end, entity) {
        const min = entity.min;
        const max = entity.max;

        if (entity.errorMin || entity.errorMax) this.ctx.strokeStyle = "red";

        this.ctx.beginPath();
        this.ctx.moveTo(start.x, start.y); // Move to the starting point
        this.ctx.lineTo(end.x, end.y); // Draw a line to the ending point
        this.ctx.stroke();

        if (min == "" && max == "") return;

        // Calculate the direction vector of the line
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const lineLength = Math.sqrt(dx * dx + dy * dy);

        // Normalize the direction vector
        const directionX = dx / lineLength;
        const directionY = dy / lineLength;

        // Calculate the text starting point (10px from the start along the line)
        const textStartX = start.x + directionX * 30;
        const textStartY = start.y + directionY * 30;

        // Construct the text
        const text = `${min} .. ${max}`;

        // Calculate the width of the text for background sizing
        const textWidth = this.ctx.measureText(text).width;
        const textHeight = 13; // equal to font size
        const padding = 4;

        this.ctx.fillStyle = "white";
        this.ctx.fillRect(
            textStartX - textWidth / 2 - padding,
            textStartY - textHeight / 2 - padding,
            textWidth + 2 * padding,
            textHeight + 2 * padding,
        );
        this.ctx.fillStyle = "black";

        if (entity.errorMin || entity.errorMax) this.ctx.fillStyle = "red";

        // Draw the text
        this.ctx.fillText(text, textStartX, textStartY);

        this.ctx.strokeStyle = "black";
        this.ctx.fillStyle = "black";
    }
}

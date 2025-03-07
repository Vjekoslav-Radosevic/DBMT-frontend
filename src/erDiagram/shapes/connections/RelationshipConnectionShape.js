import { ConnectionShape } from "../ConnectionShape.js";

export class RelationshipConnectionShape extends ConnectionShape {
    constructor(ctx) {
        super(ctx);
    }

    draw(start, end, entity, lineColor) {
        this.ctx.save();

        const min = entity.min;
        const max = entity.max;

        if (entity.errorMin || entity.errorMax) {
            this.ctx.strokeStyle = "red";
        } else {
            this.ctx.strokeStyle = lineColor;
        }

        // draw line from Relationship endpoint to the center of Entity
        this.ctx.beginPath();
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineTo(end.x, end.y);
        this.ctx.closePath();
        this.ctx.stroke();

        if (min == "" && max == "") {
            this.ctx.restore();
            return;
        }

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

        // background rectangle behind relationship boundaries
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(
            textStartX - textWidth / 2 - padding,
            textStartY - textHeight / 2 - padding,
            textWidth + 2 * padding,
            textHeight + 2 * padding,
        );

        if (entity.errorMin || entity.errorMax) {
            this.ctx.fillStyle = "red";
        } else {
            this.ctx.fillStyle = lineColor;
        }

        this.ctx.fillText(text, textStartX, textStartY);

        this.ctx.restore();
    }
}

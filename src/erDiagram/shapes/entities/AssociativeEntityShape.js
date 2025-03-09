import { Shape } from "../Shape.js";

export class AssociativeEntityShape extends Shape {
    constructor(ctx, x, y, width, height) {
        super(ctx, x, y, width, height);
    }

    // Check if the mouse is inside the rectangle
    isInside(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
    }

    draw(text, backgroundColor, textColor, borderColor) {
        this.ctx.save();

        this.ctx.fillStyle = backgroundColor;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);

        this.ctx.strokeStyle = borderColor;
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);

        // draw inner rhombus
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y + this.height / 2);
        this.ctx.lineTo(this.x + this.width / 2, this.y);
        this.ctx.lineTo(this.x + this.width, this.y + this.height / 2);
        this.ctx.lineTo(this.x + this.width / 2, this.y + this.height);
        this.ctx.lineTo(this.x, this.y + this.height / 2);
        this.ctx.closePath();
        this.ctx.stroke();

        this.ctx.fillStyle = textColor;
        this.ctx.fillText(text, this.x + this.width / 2, this.y + this.height / 2);

        this.ctx.restore();
    }
}

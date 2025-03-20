import { Shape } from "../Shape.js";

export class WeakEntityShape extends Shape {
    constructor(ctx, x, y, width, height, isDragging, offset) {
        super(ctx, x, y, width, height, isDragging, offset);
    }

    // Check if the mouse is inside the rectangle
    isInside(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
    }

    draw(text, backgroundColor, textColor, borderColor) {
        this.ctx.save();

        this.ctx.fillStyle = backgroundColor;
        this.ctx.fillRect(this.x, this.y, this.width, this.height); // Draw the rectangle

        this.ctx.strokeStyle = borderColor;
        this.ctx.strokeRect(this.x, this.y, this.width, this.height); // Draw the outer border
        this.ctx.strokeRect(this.x + 5, this.y + 5, this.width - 10, this.height - 10); // Draw the inner border

        this.ctx.fillStyle = textColor;
        this.ctx.fillText(text, this.x + this.width / 2, this.y + this.height / 2);

        this.ctx.restore();
    }
}

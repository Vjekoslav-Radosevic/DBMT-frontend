import { Shape } from "../Shape.js";

export class DegenerativeEntityShape extends Shape {
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
        this.ctx.fillRect(this.x, this.y, this.width, this.height);

        this.ctx.strokeStyle = borderColor;
        this.ctx.setLineDash([5, 5]); // Set the line dash pattern: 5px dash, 5px gap
        this.ctx.strokeRect(this.x, this.y, this.width, this.height); // Draw the dashed border

        this.ctx.fillStyle = textColor;
        this.ctx.fillText(text, this.x + this.width / 2, this.y + this.height / 2);

        this.ctx.restore();
    }
}

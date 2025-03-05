import { Shape } from "./Shape.js";

export class AttributeShape extends Shape {
    constructor(ctx, x, y, width, height) {
        super(ctx, x, y, width, height);

        this.radiusX = this.width / 2;
        this.radiusY = this.height / 2;
    }

    isInside(mouseX, mouseY) {
        const { x, y } = this.getCenter();

        // Check if the mouse coordinates (mouseX, mouseY) are inside the ellipse
        const normalizedX = (mouseX - x) / this.radiusX;
        const normalizedY = (mouseY - y) / this.radiusY;

        // Apply the ellipse equation
        return normalizedX ** 2 + normalizedY ** 2 <= 1;
    }

    isInsideRect(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
    }

    draw(text, properties, backgroundColor, textColor, borderColor) {
        this.ctx.save();

        const { x, y } = this.getCenter();

        if (properties.derived) this.ctx.setLineDash([5, 5]);

        // draw the outer ellipse
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, this.radiusX, this.radiusY, 0, 0, Math.PI * 2);
        this.ctx.closePath();

        this.ctx.fillStyle = backgroundColor;
        this.ctx.fill();

        this.ctx.strokeStyle = borderColor;
        this.ctx.stroke();

        //draw the inner ellipse if attribute is multivalued
        if (properties.multiValued) {
            this.ctx.beginPath();
            this.ctx.ellipse(x, y, this.radiusX - 5, this.radiusY - 5, 0, 0, Math.PI * 2);
            this.ctx.closePath();
            this.ctx.stroke();
        }

        this.ctx.setLineDash([]); // Reset to solid line

        // Draw the text inside the ellipse
        if (properties.optional) text = text + " (O)";
        if (properties.composite) text = "( " + text + " )";
        this.ctx.fillStyle = textColor;
        this.ctx.fillText(text, x, y);

        // underline text if attribute is unique
        if (properties.unique) {
            const textWidth = this.ctx.measureText(text).width;
            const underlineY = y + 7;

            this.ctx.beginPath();
            this.ctx.moveTo(x - textWidth / 2, underlineY);
            this.ctx.lineTo(x + textWidth / 2, underlineY);
            this.ctx.closePath();
            this.ctx.stroke();
        }

        this.ctx.restore();
    }
}

import { Shape } from "../Shape.js";

export class SuperTypeEntityShape extends Shape {
    constructor(ctx, x, y, width, height) {
        super(ctx, x, y, width, height);

        this.circleRadius = 15;
        this.entityToCircleDistance = 20;
    }

    // Check if the mouse is inside the rectangle
    isInside(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
    }

    getCircleCenter() {
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height + this.circleRadius + this.entityToCircleDistance;
        return { x: centerX, y: centerY };
    }

    drag(mouseX, mouseY, entities, attributes) {
        if (this.isDragging) {
            const deltaX = mouseX - this.offset.x - this.x;
            const deltaY = mouseY - this.offset.y - this.y;

            // Update the entity's position
            this.x = mouseX - this.offset.x;
            this.y = mouseY - this.offset.y;

            entities.forEach((entity) => {
                entity.updatePosition(deltaX, deltaY);
            });

            attributes.forEach((attribute) => {
                attribute.updatePosition(deltaX, deltaY);
            });
        }
    }

    draw(name, type, backgroundColor, textColor, borderColor) {
        this.ctx.save();

        this.ctx.fillStyle = backgroundColor;
        this.ctx.fillRect(this.x, this.y, this.width, this.height); // Draw the rectangle

        this.ctx.strokeStyle = borderColor;
        this.ctx.strokeRect(this.x, this.y, this.width, this.height); // Draw rectangle border

        this.ctx.fillStyle = textColor;
        this.ctx.fillText(name, this.x + this.width / 2, this.y + this.height / 2);

        // position of circle beneath the rectangle
        const circleX = this.x + this.width / 2;
        const circleY = this.y + this.height + this.circleRadius + 20;

        // line from the rectangle to the circle
        this.ctx.beginPath();
        this.ctx.moveTo(circleX, this.y + this.height); // Bottom center of the rectangle
        this.ctx.lineTo(circleX, circleY - this.circleRadius); // Top center of the circle
        this.ctx.closePath();
        this.ctx.stroke();

        //Draw the circle
        this.ctx.beginPath();
        this.ctx.arc(circleX, circleY, this.circleRadius, 0, Math.PI * 2, false);
        this.ctx.closePath();

        this.ctx.fillStyle = backgroundColor;
        this.ctx.fill(); // Fill the circle

        this.ctx.strokeStyle = borderColor;
        this.ctx.stroke(); // Draw the circle border

        this.ctx.fillStyle = textColor;
        this.ctx.fillText(type, circleX, circleY);

        this.ctx.restore();
    }
}

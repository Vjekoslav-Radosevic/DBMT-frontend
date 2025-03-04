export class Shape {
    constructor(ctx, x, y, width, height) {
        this.x = x;
        this.y = y;

        this.width = width; // Width of the rectangle
        this.height = height; // Height of the rectangle

        this.isDragging = false; // To track if the rectangle is being dragged
        this.offset = { x: 0, y: 0 }; // Offset to calculate the drag position

        this.ctx = ctx;
    }

    startDragging(mouseX, mouseY) {
        if (this.isInside(mouseX, mouseY)) {
            this.isDragging = true;
            this.offset.x = mouseX - this.x;
            this.offset.y = mouseY - this.y;
            return true;
        }
        return false;
    }

    drag(mouseX, mouseY, attributes) {
        if (this.isDragging) {
            const deltaX = mouseX - this.offset.x - this.x;
            const deltaY = mouseY - this.offset.y - this.y;

            // Update the entity's position
            this.x = mouseX - this.offset.x;
            this.y = mouseY - this.offset.y;

            attributes.forEach((attribute) => {
                attribute.updatePosition(deltaX, deltaY);
            });
        }
    }

    stopDragging() {
        this.isDragging = false;
    }

    getCenter() {
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        return { x: centerX, y: centerY };
    }

    getNearestPoint(coordinates) {
        let { x, y } = coordinates;
        // Calculate the nearest x coordinate
        const nearestX = Math.max(this.x, Math.min(x, this.x + this.width));
        // Calculate the nearest y coordinate
        const nearestY = Math.max(this.y, Math.min(y, this.y + this.height));

        return { x: nearestX, y: nearestY };
    }
}

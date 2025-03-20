export class Shape {
    constructor(ctx, x, y, width, height, isDragging, offset) {
        this.x = x;
        this.y = y;

        this.width = width; // Width of the rectangle
        this.height = height; // Height of the rectangle

        this.isDragging = isDragging; // To track if the rectangle is being dragged
        this.offset = { x: offset.x, y: offset.y }; // Offset to calculate the drag position

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

    drag(mouseX, mouseY) {
        if (!this.isDragging) return null;

        const newX = mouseX - this.offset.x;
        const newY = mouseY - this.offset.y;
        const deltaX = newX - this.x;
        const deltaY = newY - this.y;

        this.x = newX;
        this.y = newY;

        return { deltaX, deltaY };
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

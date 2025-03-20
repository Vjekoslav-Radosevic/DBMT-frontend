import { Shape } from "./Shape.js";
import { markRaw } from "vue";

export class RelationshipShape extends Shape {
    constructor(ctx, x, y, width, height, isDragging, offset, endpoints) {
        super(ctx, x, y, width, height, isDragging, offset);

        this.endpoints = markRaw({
            topTaken: endpoints.topTaken,
            rightTaken: endpoints.rightTaken,
            bottomTaken: endpoints.bottomTaken,
            leftTaken: endpoints.leftTaken,
        });
    }

    isPointInTriangle(px, py, v1, v2, v3) {
        const area = Math.abs(v1.x * (v2.y - v3.y) + v2.x * (v3.y - v1.y) + v3.x * (v1.y - v2.y)) / 2;
        const area1 = Math.abs(px * (v2.y - v3.y) + v2.x * (v3.y - py) + v3.x * (py - v2.y)) / 2;
        const area2 = Math.abs(v1.x * (py - v3.y) + px * (v3.y - v1.y) + v3.x * (v1.y - py)) / 2;
        const area3 = Math.abs(v1.x * (v2.y - py) + v2.x * (py - v1.y) + px * (v1.y - v2.y)) / 2;
        return Math.abs(area - (area1 + area2 + area3)) < 1e-10;
    }

    isInside(mouseX, mouseY) {
        // Coordinates of the diamond's vertices
        const top = { x: this.x + this.width / 2, y: this.y };
        const left = { x: this.x, y: this.y + this.height / 2 };
        const bottom = { x: this.x + this.width / 2, y: this.y + this.height };
        const right = { x: this.x + this.width, y: this.y + this.height / 2 };

        // Check if the point is in either of the two triangles forming the diamond
        return (
            this.isPointInTriangle(mouseX, mouseY, top, left, right) ||
            this.isPointInTriangle(mouseX, mouseY, bottom, left, right)
        );
    }

    draw(text, identifying, backgroundColor, textColor, borderColor) {
        this.ctx.save();

        // outer rhombus
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y + this.height / 2);
        this.ctx.lineTo(this.x + this.width / 2, this.y);
        this.ctx.lineTo(this.x + this.width, this.y + this.height / 2);
        this.ctx.lineTo(this.x + this.width / 2, this.y + this.height);
        this.ctx.lineTo(this.x, this.y + this.height / 2);
        this.ctx.closePath();

        this.ctx.fillStyle = backgroundColor;
        this.ctx.fill();

        this.ctx.strokeStyle = borderColor;
        this.ctx.stroke();

        // inner rhombus if relationship is identifying
        if (identifying) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.x + 10, this.y + this.height / 2);
            this.ctx.lineTo(this.x + this.width / 2, this.y + 5);
            this.ctx.lineTo(this.x + this.width - 10, this.y + this.height / 2);
            this.ctx.lineTo(this.x + this.width / 2, this.y + this.height - 5);
            this.ctx.lineTo(this.x + 10, this.y + this.height / 2);
            this.ctx.closePath();
            this.ctx.stroke();
        }

        this.ctx.fillStyle = textColor;
        this.ctx.fillText(text, this.x + this.width / 2, this.y + this.height / 2);

        this.ctx.restore();
    }

    getNearestEndpoint(x, y) {
        // Helper function to calculate distance
        const distance = (x1, y1, x2, y2) => {
            return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        };

        // Store distances to non-taken endpoints
        const availableEndpoints = [];

        // Check each endpoint and add if not taken
        let xEndpoint, yEndpoint;
        if (!this.endpoints.topTaken) {
            xEndpoint = this.x + this.width / 2;
            yEndpoint = this.y;
            availableEndpoints.push({
                endpoint: { x: xEndpoint, y: yEndpoint, prop: "topTaken" },
                distance: distance(x, y, xEndpoint, yEndpoint),
            });
        }
        if (!this.endpoints.rightTaken) {
            xEndpoint = this.x + this.width;
            yEndpoint = this.y + this.height / 2;
            availableEndpoints.push({
                endpoint: { x: xEndpoint, y: yEndpoint, prop: "rightTaken" },
                distance: distance(x, y, xEndpoint, yEndpoint),
            });
        }
        if (!this.endpoints.bottomTaken) {
            xEndpoint = this.x + this.width / 2;
            yEndpoint = this.y + this.height;
            availableEndpoints.push({
                endpoint: { x: xEndpoint, y: yEndpoint, prop: "bottomTaken" },
                distance: distance(x, y, xEndpoint, yEndpoint),
            });
        }
        if (!this.endpoints.leftTaken) {
            xEndpoint = this.x;
            yEndpoint = this.y + this.height / 2;
            availableEndpoints.push({
                endpoint: { x: xEndpoint, y: yEndpoint, prop: "leftTaken" },
                distance: distance(x, y, xEndpoint, yEndpoint),
            });
        }

        // If no available endpoints, return null
        if (availableEndpoints.length === 0) {
            return null;
        }

        // Find the nearest available endpoint
        let nearest = availableEndpoints[0];
        for (let i = 1; i < availableEndpoints.length; i++) {
            if (availableEndpoints[i].distance < nearest.distance) {
                nearest = availableEndpoints[i];
            }
        }

        return nearest.endpoint;
    }

    getReflexiveEndpoint(nearestEndpoint) {
        const vertices = {
            top: { x: this.x + this.width / 2, y: this.y, prop: "topTaken" },
            right: { x: this.x + this.width, y: this.y + this.height / 2, prop: "rightTaken" },
            bottom: { x: this.x + this.width / 2, y: this.y + this.height, prop: "bottomTaken" },
            left: { x: this.x, y: this.y + this.height / 2, prop: "leftTaken" },
        };

        switch (nearestEndpoint.prop) {
            case "topTaken":
            case "bottomTaken":
                return this.endpoints.leftTaken ? vertices.right : vertices.left;

            case "rightTaken":
            case "leftTaken":
                return this.endpoints.topTaken ? vertices.bottom : vertices.top;

            default:
                return vertices.top;
        }
    }

    freeEndpoints() {
        this.endpoints.topTaken = false;
        this.endpoints.rightTaken = false;
        this.endpoints.bottomTaken = false;
        this.endpoints.leftTaken = false;
    }
}

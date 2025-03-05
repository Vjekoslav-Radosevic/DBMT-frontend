import { Shape } from "./Shape";

export class LabelShape extends Shape {
    constructor(ctx, x, y, width, height) {
        super(ctx, x, y, width, height);
    }

    isInside(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
    }

    draw(text, backgroundColor, textColor, borderColor) {
        this.ctx.save();

        const lineHeight = 15;
        const textPadding = 10;

        const textLines = this.formTextLines(text, textPadding);
        const textHeight = textLines.length * lineHeight + 2 * textPadding;

        this.drawLabel(backgroundColor, borderColor, textHeight);

        this.ctx.fillStyle = textColor;
        this.drawText(textLines, textPadding, lineHeight);

        this.ctx.restore();
    }

    drawLabel(backgroundColor, borderColor, textHeight) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x + this.width - 10, this.y);
        this.ctx.lineTo(this.x + this.width - 10, this.y + 10);
        this.ctx.lineTo(this.x + this.width, this.y + 10);
        this.ctx.moveTo(this.x + this.width - 10, this.y);
        this.ctx.lineTo(this.x + this.width, this.y + 10);
        this.ctx.lineTo(this.x + this.width, this.y + textHeight);
        this.ctx.lineTo(this.x, this.y + textHeight);
        this.ctx.lineTo(this.x, this.y);
        this.ctx.closePath();

        this.ctx.fillStyle = backgroundColor;
        this.ctx.fill();

        this.ctx.strokeStyle = borderColor;
        this.ctx.stroke();
    }

    formTextLines(text, textPadding) {
        let words = text.split(" ");
        let line = "";
        let lines = [];

        for (let i = 0; i < words.length; i++) {
            let testLine = line + words[i] + " ";
            let testWidth = this.ctx.measureText(testLine).width;
            if (testWidth > this.width - 2 * textPadding && i > 0) {
                lines.push(line);
                line = words[i] + " ";
            } else {
                line = testLine;
            }
        }
        lines.push(line); // Add the last line

        return lines;
    }

    drawText(textLines, textPadding, lineHeight) {
        this.ctx.textAlign = "left";
        this.ctx.textBaseline = "hanging";

        for (let i = 0; i < textLines.length; i++) {
            this.ctx.fillText(textLines[i], this.x + textPadding, this.y + textPadding + i * lineHeight);
        }
    }
}

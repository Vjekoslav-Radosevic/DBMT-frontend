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

        const textLineHeight = 15; // 1px bigger than text alone
        const textPadding = 10;

        const { textLines, maxTextLineWidth } = this.formTextLines(text, textPadding);

        // set wider width if text requires it
        if (this.width < maxTextLineWidth + 2 * textPadding) {
            this.width = maxTextLineWidth + 2 * textPadding;
        }

        //set higher height if text requires it
        if (this.height < textLines.length * textLineHeight + 2 * textPadding) {
            this.height = textLines.length * textLineHeight + 2 * textPadding;
        }

        this.drawLabel(backgroundColor, borderColor);

        this.ctx.fillStyle = textColor;
        this.drawText(textLines, textPadding, textLineHeight);

        this.ctx.restore();
    }

    drawLabel(backgroundColor, borderColor) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x + this.width - 10, this.y);
        this.ctx.lineTo(this.x + this.width - 10, this.y + 10);
        this.ctx.lineTo(this.x + this.width, this.y + 10);
        this.ctx.moveTo(this.x + this.width - 10, this.y);
        this.ctx.lineTo(this.x + this.width, this.y + 10);
        this.ctx.lineTo(this.x + this.width, this.y + this.height);
        this.ctx.lineTo(this.x, this.y + this.height);
        this.ctx.lineTo(this.x, this.y);
        this.ctx.closePath();

        this.ctx.fillStyle = backgroundColor;
        this.ctx.fill();

        this.ctx.strokeStyle = borderColor;
        this.ctx.stroke();
    }

    formTextLines(text, textPadding) {
        let words = text.split(" ");
        let textLine = "";
        let textLines = [];

        let maxTextLineWidth = 0;

        for (let i = 0; i < words.length; i++) {
            let testLine = textLine + words[i] + " ";
            let testWidth = this.ctx.measureText(testLine).width;
            if (testWidth > this.width - 2 * textPadding && i > 0) {
                // set new maxTextLineWidth if necessary
                let textLineWidth = this.ctx.measureText(textLine).width;
                if (maxTextLineWidth < textLineWidth) maxTextLineWidth = textLineWidth;

                textLines.push(textLine);
                textLine = words[i] + " ";
            } else {
                textLine = testLine;
            }
        }
        textLines.push(textLine); // Add the last line

        return { textLines, maxTextLineWidth };
    }

    drawText(textLines, textPadding, textLineHeight) {
        this.ctx.textAlign = "left";
        this.ctx.textBaseline = "hanging";

        for (let i = 0; i < textLines.length; i++) {
            this.ctx.fillText(textLines[i], this.x + textPadding, this.y + textPadding + i * textLineHeight);
        }
    }
}

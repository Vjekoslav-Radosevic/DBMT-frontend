import { Shape } from "./Shape";

export class AttributeSchemaShape extends Shape {
    constructor(ctx, x, y, width, height) {
        super(ctx, x, y, width, height);
    }

    isInside(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height;
    }

    draw(text, attributes, backgroundColor, textColor, borderColor) {
        this.ctx.save();

        const canvasFontSize = parseInt(this.ctx.font.match(/\d+/)[0], 10);
        const textLineHeight = canvasFontSize + 2;
        const textPadding = 10;

        const attributeLines = this.formAttributeLines(attributes, 0);

        let maxTextLineWidth = 0;
        attributeLines.forEach((attributeLine) => {
            const lineWidth = this.ctx.measureText(attributeLine).width;
            if (lineWidth > maxTextLineWidth) maxTextLineWidth = lineWidth;
        });

        this.width = maxTextLineWidth + 2 * textPadding;
        this.height = textLineHeight * attributeLines.length + 2 * textPadding;

        this.ctx.strokeStyle = borderColor;
        this.ctx.strokeRect(this.x, this.y, this.width, this.height); // Draw rectangle border

        this.ctx.fillStyle = backgroundColor;
        this.ctx.fillRect(this.x, this.y, this.width, this.height); // Draw the rectangle

        this.ctx.fillStyle = textColor;
        this.drawText(attributeLines, textPadding, textLineHeight);

        this.ctx.restore();
    }

    formAttributeLines(attributes, level) {
        let attributeLines = [];
        const prefix = "  ".repeat(level);

        for (let i = 0; i < attributes.length; i++) {
            attributeLines.push(prefix + attributes[i].name);
            attributeLines = attributeLines.concat(this.formAttributeLines(attributes[i].attributes, level + 1));
        }

        return attributeLines;
    }

    drawText(textLines, textPadding, textLineHeight) {
        this.ctx.textAlign = "left";
        this.ctx.textBaseline = "hanging";

        for (let i = 0; i < textLines.length; i++) {
            this.ctx.fillText(textLines[i], this.x + textPadding, this.y + textPadding + i * textLineHeight);
        }
    }
}

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
        const entityNameLineHeight = canvasFontSize + 5;
        const textPadding = 10;

        const attributeLines = this.formAttributeLines(attributes, 0);
        const maxTextLineWidth = this.measureMaxTextWidth(text, attributeLines);

        this.width = maxTextLineWidth + 2 * textPadding;
        this.height = 2 * textPadding + entityNameLineHeight + textLineHeight * attributeLines.length;

        this.ctx.fillStyle = backgroundColor;
        this.ctx.fillRect(this.x, this.y, this.width, this.height); // Draw the rectangle

        this.ctx.strokeStyle = borderColor;
        this.ctx.strokeRect(this.x, this.y, this.width, this.height); // Draw rectangle border

        this.ctx.fillStyle = textColor;
        this.drawText(text, attributeLines, textPadding, entityNameLineHeight, textLineHeight);

        this.ctx.restore();
    }

    formAttributeLines(attributes, level) {
        let attributeLines = [];
        const prefix = "  ".repeat(level);

        for (let i = 0; i < attributes.length; i++) {
            let attributeLine = prefix + attributes[i].name;
            if (attributes[i].properties.unique) attributeLine = attributeLine + " (U)";
            if (attributes[i].properties.composite) attributeLine = attributeLine + ":";
            attributeLines.push(attributeLine);
            attributeLines = attributeLines.concat(this.formAttributeLines(attributes[i].attributes, level + 1));
        }

        return attributeLines;
    }

    measureMaxTextWidth(entityName, attributeLines) {
        const oldCanvasfont = this.ctx.font;
        this.ctx.font = "bold " + oldCanvasfont;
        let maxTextLineWidth = this.ctx.measureText(entityName).width;
        this.ctx.font = oldCanvasfont;

        attributeLines.forEach((attributeLine) => {
            const lineWidth = this.ctx.measureText(attributeLine).width;
            if (lineWidth > maxTextLineWidth) maxTextLineWidth = lineWidth;
        });

        return maxTextLineWidth;
    }

    drawText(entityName, textLines, textPadding, entityNameLineHeight, textLineHeight) {
        this.ctx.textAlign = "left";
        this.ctx.textBaseline = "hanging";

        const oldCanvasfont = this.ctx.font;
        this.ctx.font = "bold " + oldCanvasfont;
        this.ctx.fillText(entityName, this.x + textPadding, this.y + textPadding);
        this.ctx.font = oldCanvasfont;

        for (let i = 0; i < textLines.length; i++) {
            this.ctx.fillText(
                textLines[i],
                this.x + textPadding,
                this.y + textPadding + entityNameLineHeight + i * textLineHeight,
            );
        }
    }
}

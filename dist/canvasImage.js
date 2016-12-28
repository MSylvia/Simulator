"use strict";
var lib_1 = require("./lib");
var CanvasImage = (function () {
    function CanvasImage(width, height, backgroundColor) {
        if (width === void 0) { width = 400; }
        if (height === void 0) { height = 300; }
        this.width = width;
        this.height = height;
        this.devicePixelRatio = window.devicePixelRatio || 1;
        this.ctx = lib_1.getNewCtx(width, height);
        this.setSize(width, height);
        if (backgroundColor) {
            this.ctx.fillStyle = backgroundColor;
            this.ctx.fillRect(0, 0, width, height);
        }
    }
    CanvasImage.prototype.getWidth = function () {
        return this.width;
    };
    CanvasImage.prototype.getHeight = function () {
        return this.height;
    };
    CanvasImage.prototype.setSize = function (width, height) {
        var factor = this.devicePixelRatio;
        var canvas = this.ctx.canvas;
        this.width = width;
        this.height = height;
        canvas.width = width * factor;
        canvas.height = height * factor;
        canvas.style.height = height + "px";
        canvas.style.width = width + "px";
        this.ctx.scale(factor, factor);
    };
    CanvasImage.fromText = function (text, fontSize, font, color, style, backgroundColor, height) {
        if (fontSize === void 0) { fontSize = 11; }
        if (font === void 0) { font = 'sans-serif'; }
        if (color === void 0) { color = 'black'; }
        if (style === void 0) { style = 'normal'; }
        if (height === void 0) { height = fontSize * 1.5; }
        //height = fontSize * 1.5; → http://stackoverflow.com/a/11452091/4260143
        var ctx = lib_1.getNewCtx();
        ctx.font = style + " " + fontSize + "px " + font;
        var width = ctx.measureText(text).width;
        var obj = new this(width, height, backgroundColor);
        obj.text(text, style + " " + fontSize + "px " + font, color);
        return obj;
    };
    CanvasImage.prototype.circle = function (x, y, radius, color, outlineOnly, outlineWidth) {
        if (color === void 0) { color = 'black'; }
        if (outlineOnly === void 0) { outlineOnly = false; }
        if (outlineWidth === void 0) { outlineWidth = 1; }
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = color;
        if (outlineOnly) {
            this.ctx.lineWidth = outlineWidth;
            this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
            this.ctx.stroke();
        }
        else {
            this.ctx.lineWidth = 0;
            this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
            this.ctx.fill();
        }
        this.ctx.closePath();
        return this;
    };
    CanvasImage.prototype.image = function (img, x, y, width, height) {
        if (width === void 0) { width = img.width; }
        if (height === void 0) { height = img.height; }
        this.ctx.drawImage(img, x, y, width, height);
    };
    CanvasImage.prototype.text = function (text, font, color, x, y, outlineOnly, outlineWidth) {
        if (color === void 0) { color = 'black'; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (outlineOnly === void 0) { outlineOnly = false; }
        if (outlineWidth === void 0) { outlineWidth = 1; }
        this.ctx.textBaseline = 'top';
        this.ctx.font = font;
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = outlineWidth;
        if (outlineOnly)
            this.ctx.strokeText(text, x, y);
        else
            this.ctx.fillText(text, x, y);
        return this;
    };
    CanvasImage.prototype.getCtx = function () {
        return this.ctx;
    };
    CanvasImage.prototype.setCtx = function (ctx) {
        this.ctx = ctx;
    };
    CanvasImage.prototype.getImage = function () {
        var i = new Image();
        i.src = this.ctx.canvas.toDataURL();
        i.height = this.height;
        i.width = this.width;
        return i;
    };
    return CanvasImage;
}());
exports.CanvasImage = CanvasImage;

"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _1 = require(".");
var Text = (function (_super) {
    __extends(Text, _super);
    function Text(text, fontSize, font, color, style, backgroundColor, height) {
        if (fontSize === void 0) { fontSize = 11; }
        if (font === void 0) { font = 'sans-serif'; }
        if (color === void 0) { color = 'black'; }
        if (style === void 0) { style = 'normal'; }
        if (height === void 0) { height = fontSize * 1.5; }
        var _this = _super.call(this) || this;
        var i = _1.CanvasImage.fromText(text, fontSize, font, color, style, backgroundColor, height).getImage();
        _this.setImage(i);
        return _this;
    }
    return Text;
}(_1.Actor));
exports.Text = Text;

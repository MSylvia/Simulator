"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _1 = require(".");
/**
 * The Text class inherits from the Actor class and is representing just text which is rendered as the image of the Actor automatically.
 * If you have problems with the height of the image (when the text seems cut off at the bottom), try to change the height parameter which defaults to 1.5 * fontSize, which works in most cases but not in all.
 */
var Text = (function (_super) {
    __extends(Text, _super);
    /**
     * Create a new Text object by passing the text and optionally more options.
     */
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

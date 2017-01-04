"use strict";
function getNewCtx(width, height) {
    if (width === void 0) { width = 50; }
    if (height === void 0) { height = 50; }
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas.getContext('2d');
}
exports.getNewCtx = getNewCtx;
function toRadians(degrees) {
    return degrees * Math.PI / 180;
}
exports.toRadians = toRadians;
function toDegrees(radians) {
    return radians * Math.PI / 180;
}
exports.toDegrees = toDegrees;
function scaleImageProportionateToWidth(image, width, callback) {
    image.onload = function () {
        var factor = width / image.width;
        image.width *= factor;
        image.height *= factor;
        callback(image);
    };
}
exports.scaleImageProportionateToWidth = scaleImageProportionateToWidth;
function scaleImageProportionateToHeight(image, height, callback) {
    image.onload = function () {
        var factor = height / image.height;
        image.width *= factor;
        image.height *= factor;
        callback(image);
    };
}
exports.scaleImageProportionateToHeight = scaleImageProportionateToHeight;
var canvasImage_1 = require("./canvasImage");
function coverWithImage(image, tWidth, tHeight, callback, pos) {
    if (pos === void 0) { pos = 'center'; }
    image.onload = function () {
        var width = image.width, height = image.height;
        var result = new Image();
        if (tWidth < width && tHeight < height) {
            var vWidth = tWidth < width ? -1 : 1, vHeight = tHeight < height ? -1 : 1;
            var dWidth = vWidth * (tWidth - width), dHeight = vHeight * (tHeight - height);
            if (dWidth < dHeight) {
                var f = tWidth / width;
                var pHeight = height * f;
                var y = calcPos(tHeight, pHeight, pos);
                var i = new canvasImage_1.CanvasImage(tWidth, tHeight);
                i.image(image, 0, y, tWidth, pHeight);
                result = i.getImage();
            }
            else {
                var f = tHeight / height;
                var pWidth = width * f;
                var x = calcPos(tWidth, pWidth, pos);
                var i = new canvasImage_1.CanvasImage(tWidth, tHeight);
                i.image(image, x, 0, pWidth, tHeight);
                result = i.getImage();
            }
        }
        else {
            var vWidth = tWidth < width ? -1 : 1, vHeight = tHeight < height ? -1 : 1;
            var dWidth = vWidth * (tWidth - width), dHeight = vHeight * (tHeight - height);
            if (dWidth > dHeight) {
                var f = tWidth / width;
                var pHeight = height * f;
                var y = calcPos(tHeight, pHeight, pos);
                var i = new canvasImage_1.CanvasImage(tWidth, tHeight);
                i.image(image, 0, y, tWidth, pHeight);
                result = i.getImage();
            }
            else {
                var f = tHeight / height;
                var pWidth = width * f;
                var x = calcPos(tWidth, pWidth, pos);
                var i = new canvasImage_1.CanvasImage(tWidth, tHeight);
                i.image(image, x, 0, pWidth, tHeight);
                result = i.getImage();
            }
        }
        callback(result);
    };
    function calcPos(target, actual, pos) {
        if (pos == 'center') {
            return (target - actual) / 2;
        }
        else if (pos == 'start') {
            return 0;
        }
        else if (pos == 'end') {
            return target - actual;
        }
    }
}
exports.coverWithImage = coverWithImage;
function repeat(f, i) {
    for (var j = 0; j < i; j++) {
        f();
    }
}
exports.repeat = repeat;

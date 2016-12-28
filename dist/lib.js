"use strict";
/**
 * Returns a new Canvas Context to create/ draw images e.g. for actors
 */
function getNewCtx(width, height) {
    if (width === void 0) { width = 50; }
    if (height === void 0) { height = 50; }
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas.getContext('2d');
}
exports.getNewCtx = getNewCtx;
/**
 * Get a random number between max and min.
 * Min is, if not specified otherwise, equal to zero.
 * If min and max are not specified, the result is between 0 and 1.
 * If intsOnly is true, which it is by default, the generated output will only include integer values
 * If excludeZero is set to true (by default it is false) the function's return value will not be zero
 */
function random(max, min, intsOnly, excludeZero) {
    if (min === void 0) { min = 0; }
    if (intsOnly === void 0) { intsOnly = true; }
    if (excludeZero === void 0) { excludeZero = false; }
    var value = 0;
    do {
        if (max) {
            if (intsOnly)
                value = Math.floor(Math.random() * (max - min + 1) + min);
            else
                value = Math.random() * (max - min + 1) + min;
        }
        else if (max && min) {
            if (intsOnly)
                value = Math.floor(Math.random() * (max - min + 1) + min);
            else
                value = Math.random() * (max - min + 1) + min;
        }
        else {
            value = Math.random();
        }
    } while (value == 0 && excludeZero);
    return value;
}
exports.random = random;
/**
 * Pick a random element from array
 */
function pickRandom(arr) {
    return arr[random(arr.length - 1, 0)];
}
exports.pickRandom = pickRandom;
/**
 * Convert degrees to radians
 */
function toRadians(degrees) {
    return degrees * Math.PI / 180;
}
exports.toRadians = toRadians;
/**
 * Convert radians to degrees
 */
function toDegrees(radians) {
    return radians * Math.PI / 180;
}
exports.toDegrees = toDegrees;
/**
 * Scales the image to a given width while maintainig the aspect ratio.
 * The callback passes back the scaled image
 */
function scaleImageProportionateToWidth(image, width, callback) {
    image.onload = function () {
        var factor = width / image.width;
        image.width *= factor;
        image.height *= factor;
        callback(image);
    };
}
exports.scaleImageProportionateToWidth = scaleImageProportionateToWidth;
/**
 * Scales the image to a given height while maintainig the aspect ratio.
 * The callback passes back the scaled image
 */
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
        //Result to store the scaled Image
        var result = new Image();
        // It just works ¯\_(ツ)_/¯ 😂
        // TODO: Understand and make better
        if (tWidth < width && tHeight < height) {
            var vWidth = tWidth < width ? -1 : 1, vHeight = tHeight < height ? -1 : 1;
            var dWidth = vWidth * (tWidth - width), dHeight = vHeight * (tHeight - height);
            if (dWidth < dHeight) {
                //dWidth is min
                var f = tWidth / width;
                var pHeight = height * f;
                var y = calcPos(tHeight, pHeight, pos);
                var i = new canvasImage_1.CanvasImage(tWidth, tHeight);
                i.image(image, 0, y, tWidth, pHeight);
                result = i.getImage();
            }
            else {
                //dHeight is min
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
                //dWidth is max
                var f = tWidth / width;
                var pHeight = height * f;
                var y = calcPos(tHeight, pHeight, pos);
                var i = new canvasImage_1.CanvasImage(tWidth, tHeight);
                i.image(image, 0, y, tWidth, pHeight);
                result = i.getImage();
            }
            else {
                //dHeight is max
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
/**
 * Repeat the function i times.
 */
function repeat(f, i) {
    for (var j = 0; j < i; j++) {
        f();
    }
}
exports.repeat = repeat;

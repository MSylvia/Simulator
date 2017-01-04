"use strict";
var Vector = (function () {
    function Vector() {
        var components = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            components[_i] = arguments[_i];
        }
        this.components = components;
    }
    Object.defineProperty(Vector.prototype, "x", {
        get: function () {
            return this.components[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "y", {
        get: function () {
            return this.components[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "z", {
        get: function () {
            return this.components[2];
        },
        enumerable: true,
        configurable: true
    });
    return Vector;
}());
exports.Vector = Vector;

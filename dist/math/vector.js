"use strict";
var Vector = (function () {
    function Vector() {
        var components = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            components[_i] = arguments[_i];
        }
        this.components = components;
    }
    Vector.prototype.magnitude = function () {
        var sumSq = this.components.reduce(function (a, b) {
            return a + b * b;
        }, 0);
        return Math.sqrt(sumSq);
    };
    Vector.prototype.magSq = function () {
        var m = this.magnitude();
        return m * m;
    };
    Vector.prototype.normalize = function () {
        var m = this.magnitude();
        this.scale(1 / m);
        return this;
    };
    Vector.prototype.add = function (v) {
        this.components = this.components.map(function (c, i) { return c + v.getComponent(i); });
        return this;
    };
    Vector.prototype.subtract = function (v) {
        this.components = this.components.map(function (c, i) { return c - v.getComponent(i); });
        return this;
    };
    Vector.prototype.multiply = function (v) {
        this.components = this.components.map(function (c, i) { return c * v.getComponent(i); });
        return this;
    };
    Vector.prototype.divide = function (v) {
        this.components = this.components.map(function (c, i) { return c / v.getComponent(i); });
        return this;
    };
    Vector.prototype.scale = function (n) {
        this.components = this.components.map(function (c) { return c * n; });
        return this;
    };
    Vector.prototype.get = function () {
        return new (Vector.bind.apply(Vector, [void 0].concat(this.components)))();
    };
    Vector.prototype.getArray = function () {
        return this.components;
    };
    Object.defineProperty(Vector.prototype, "x", {
        get: function () {
            return this.components[0];
        },
        set: function (val) {
            this.components[0] = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "y", {
        get: function () {
            return this.components[1];
        },
        set: function (val) {
            this.components[1] = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "z", {
        get: function () {
            return this.components[2];
        },
        set: function (val) {
            this.components[2] = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "numberOfComponents", {
        get: function () {
            return this.components.length;
        },
        enumerable: true,
        configurable: true
    });
    Vector.prototype.getComponent = function (i) {
        return this.components[i];
    };
    Vector.prototype.setComponent = function (i, value) {
        this.components[i] = value;
    };
    Vector.add = function (v1, v2) {
        var components = [];
        for (var i = 0; i < v1.components.length; i++) {
            components[i] = v1.getComponent(i) + v2.getComponent(i);
        }
        return new (Vector.bind.apply(Vector, [void 0].concat(components)))();
    };
    Vector.subtract = function (v1, v2) {
        var components = [];
        for (var i = 0; i < v1.components.length; i++) {
            components[i] = v1.getComponent(i) - v2.getComponent(i);
        }
        return new (Vector.bind.apply(Vector, [void 0].concat(components)))();
    };
    Vector.multiply = function (v1, v2) {
        var components = [];
        for (var i = 0; i < v1.components.length; i++) {
            components[i] = v1.getComponent(i) * v2.getComponent(i);
        }
        return new (Vector.bind.apply(Vector, [void 0].concat(components)))();
    };
    Vector.divide = function (v1, v2) {
        var components = [];
        for (var i = 0; i < v1.components.length; i++) {
            components[i] = v1.getComponent(i) / v2.getComponent(i);
        }
        return new (Vector.bind.apply(Vector, [void 0].concat(components)))();
    };
    Vector.scale = function (v1, s) {
        var r = v1.get();
        r.scale(s);
        return r;
    };
    return Vector;
}());
exports.Vector = Vector;

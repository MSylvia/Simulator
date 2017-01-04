"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var actor_1 = require("./actor");
var vector_1 = require("./math/vector");
var Physics = (function (_super) {
    __extends(Physics, _super);
    function Physics(actor, mass) {
        if (mass === void 0) { mass = 1; }
        var _this = _super.call(this) || this;
        _this.actor = actor;
        _this.mass = mass;
        _this.velocity = new vector_1.Vector(0, 0);
        _this.location = new vector_1.Vector(actor.getX(), actor.getY());
        return _this;
    }
    Physics.prototype.applyForce = function (f) {
        this.acceleration.scale(0);
        this.acceleration = f.get().scale(1 / this.mass);
    };
    Physics.prototype.animate = function () {
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
    };
    return Physics;
}(actor_1.Actor));
exports.Physics = Physics;

"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _1 = require(".");
var BodyEnums;
(function (BodyEnums) {
    var AtEdgeBehaviors;
    (function (AtEdgeBehaviors) {
        AtEdgeBehaviors[AtEdgeBehaviors["None"] = 0] = "None";
        AtEdgeBehaviors[AtEdgeBehaviors["Repel"] = 1] = "Repel";
        AtEdgeBehaviors[AtEdgeBehaviors["Destroy"] = 2] = "Destroy";
        AtEdgeBehaviors[AtEdgeBehaviors["Reappear"] = 3] = "Reappear";
    })(AtEdgeBehaviors = BodyEnums.AtEdgeBehaviors || (BodyEnums.AtEdgeBehaviors = {}));
})(BodyEnums = exports.BodyEnums || (exports.BodyEnums = {}));
var Body = (function (_super) {
    __extends(Body, _super);
    function Body(mass, atEdgeBehavior) {
        if (mass === void 0) { mass = 1; }
        if (atEdgeBehavior === void 0) { atEdgeBehavior = BodyEnums.AtEdgeBehaviors.None; }
        var _this = _super.call(this) || this;
        _this.mass = mass;
        _this.atEdgeBehavior = atEdgeBehavior;
        _this.acceleration = new _1.Vector(0, 0);
        _this.velocity = new _1.Vector(0, 0);
        _this.includeWidthAndHeightInEdgeCalc = false;
        _this.resetLocationAtEdges = true;
        return _this;
    }
    Body.prototype.addedToWorld = function (world) {
        this.location = new _1.Vector(this.getX(), this.getY());
    };
    Body.prototype.applyForce = function (f) {
        f = f instanceof _1.Vector ? f : new (_1.Vector.bind.apply(_1.Vector, [void 0].concat(f)))();
        this.acceleration.add(f.get().scale(1 / this.mass));
    };
    Body.prototype.gravity = function (g) {
        this.applyForce(new _1.Vector(0, g).scale(this.mass));
    };
    Body.prototype.animate = function () {
        this.beforeCalc();
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.acceleration.scale(0);
        if (this.isAtEdge(this.includeWidthAndHeightInEdgeCalc)) {
            switch (this.atEdgeBehavior) {
                case BodyEnums.AtEdgeBehaviors.Destroy:
                    this.destroy();
                    break;
                case BodyEnums.AtEdgeBehaviors.None:
                    break;
                case BodyEnums.AtEdgeBehaviors.Repel:
                    this.repelNOC();
                    break;
                case BodyEnums.AtEdgeBehaviors.Reappear:
                    this.reappear();
                    break;
                default:
                    break;
            }
        }
        this.afterCalc();
    };
    Body.prototype.afterCalc = function () {
    };
    Body.prototype.beforeCalc = function () {
    };
    Body.prototype.getSpeed = function () {
        return this.velocity.magnitude();
    };
    Body.prototype.repel = function () {
        switch (this.getEdge(this.includeWidthAndHeightInEdgeCalc)) {
            case _1.Edges.Bottom:
                this.velocity.y *= -1;
                if (this.resetLocationAtEdges)
                    this.location.y = this.includeWidthAndHeightInEdgeCalc ? this.getWorld().getHeight() - this.getHeight() : this.getWorld().getHeight();
                break;
            case _1.Edges.Top:
                this.velocity.y *= -1;
                if (this.resetLocationAtEdges)
                    this.location.y = 0;
                break;
            case _1.Edges.Left:
                this.velocity.x *= -1;
                if (this.resetLocationAtEdges)
                    this.location.x = 0;
                break;
            case _1.Edges.Right:
                this.velocity.x *= -1;
                if (this.resetLocationAtEdges)
                    this.location.x = this.includeWidthAndHeightInEdgeCalc ? this.getWorld().getWidth() - this.getWidth() : this.getWorld().getWidth();
                break;
            default:
                break;
        }
    };
    Body.prototype.repelNOC = function () {
        var width = _super.prototype.getWorld.call(this).getWidth();
        var height = _super.prototype.getWorld.call(this).getHeight();
        if (this.location.x > width) {
            this.location.x = width;
            this.velocity.x *= -1;
        }
        else if (this.location.x < 0) {
            this.velocity.x *= -1;
            this.location.x = 0;
        }
        if (this.location.y > height) {
            this.location.y = height;
            this.velocity.y *= -1;
        }
        else if (this.location.y < 0) {
            this.location.y = 0;
            this.velocity.y *= -1;
        }
    };
    Body.prototype.setResetLocationAtEdges = function (doSo) {
        this.resetLocationAtEdges = doSo;
    };
    Body.prototype.reappear = function () {
        switch (this.getEdge(this.includeWidthAndHeightInEdgeCalc)) {
            case _1.Edges.Top:
                this.location.y = this.getWorld().getHeight() - this.getHeight();
                break;
            case _1.Edges.Bottom:
                this.location.y = 0;
                break;
            case _1.Edges.Right:
                this.location.x = 0;
                break;
            case _1.Edges.Left:
                this.location.x = this.getWorld().getWidth() - this.getWidth();
                break;
            default:
                break;
        }
    };
    Body.prototype.limitVelocity = function (min, max) {
        this.velocity.components = this.velocity.components.map(function (c) {
            return _1.limit(c, min, max);
        });
    };
    Body.prototype.limitAcceleration = function (min, max) {
        this.acceleration.components = this.acceleration.components.map(function (c) {
            return _1.limit(c, min, max);
        });
    };
    Body.prototype.limitSpeed = function (max) {
        if (this.velocity.magnitude() > max) {
            this.velocity.normalize().scale(max);
        }
    };
    return Body;
}(_1.Actor));
exports.Body = Body;

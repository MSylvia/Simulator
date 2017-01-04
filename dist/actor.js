"use strict";
var Edges;
(function (Edges) {
    Edges[Edges["Top"] = 0] = "Top";
    Edges[Edges["Left"] = 1] = "Left";
    Edges[Edges["Right"] = 2] = "Right";
    Edges[Edges["Bottom"] = 3] = "Bottom";
    Edges[Edges["NoEdge"] = 4] = "NoEdge";
})(Edges = exports.Edges || (exports.Edges = {}));
var Actor = (function () {
    function Actor(imageSrc) {
        this.devicePixelRatio = window.devicePixelRatio || 1;
        this.image = new Image();
        this.opacity = 1;
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
        this.isBeingDragged = false;
        this.birthtime = new Date().getTime();
        if (imageSrc)
            this.setImageSrc(imageSrc);
    }
    Actor.prototype.getClass = function () {
        return this.constructor.name;
    };
    Actor.prototype.addedToWorld = function (world) {
    };
    Actor.prototype.animate = function () {
    };
    Actor.prototype.interactionEvent = function (e) {
    };
    Actor.prototype.dragging = function (x, y) {
    };
    Actor.prototype.getLifetime = function () {
        return new Date().getTime() - this.birthtime;
    };
    Actor.prototype.getClickCoordinatesRelativeToActor = function (clickX, clickY) {
        var cX = clickX, cY = clickY;
        var x = this.getX(), y = this.getY();
        return {
            x: cX - x,
            y: cY - y
        };
    };
    Actor.prototype.setOpacity = function (o) {
        this.opacity = o;
    };
    Actor.prototype.getOpacity = function () {
        return this.opacity;
    };
    Actor.prototype.getX = function () {
        return this.x;
    };
    Actor.prototype.setX = function (x, percent, originAtCenter) {
        if (percent === void 0) { percent = false; }
        if (originAtCenter === void 0) { originAtCenter = false; }
        if (percent) {
            x = this.getWorld().getWidth() * x / 100;
        }
        if (originAtCenter) {
            x -= this.getWidth() / 2;
        }
        this.x = x;
    };
    Actor.prototype.setRotation = function (radians) {
        this.rotation = radians;
    };
    Actor.prototype.getRotation = function () {
        return this.rotation;
    };
    Actor.prototype.getY = function () {
        return this.y;
    };
    Actor.prototype.setY = function (y, percent, originAtCenter) {
        if (percent === void 0) { percent = false; }
        if (originAtCenter === void 0) { originAtCenter = false; }
        if (percent) {
            y = this.getWorld().getHeight() * y / 100;
        }
        if (originAtCenter) {
            y -= this.getHeight() / 2;
        }
        this.y = y;
    };
    Actor.prototype.getWidth = function () {
        return this.image.width;
    };
    Actor.prototype.getHeight = function () {
        return this.image.height;
    };
    Actor.prototype.intersects = function (a) {
        return !(((this.getY() + this.getHeight()) < a.getY()) ||
            (this.getY() > (a.getY() + a.getHeight())) ||
            ((this.getX() + this.getWidth()) < a.getX()) ||
            (this.getX() > (a.getX() + a.getWidth())));
    };
    Actor.prototype.pointIsOnActor = function (x, y) {
        return (this.getX() <= x && this.getX() + this.getWidth() >= x) &&
            (this.getY() <= y && this.getY() + this.getHeight() >= y);
    };
    Actor.prototype.isAtEdge = function (includeWidthAndHeight) {
        if (includeWidthAndHeight === void 0) { includeWidthAndHeight = true; }
        if (includeWidthAndHeight) {
            return (this.x <= 0 || this.x + this.getWidth() >= this.world.getWidth() ||
                this.y <= 0 || this.y + this.getHeight() >= this.world.getHeight());
        }
        else {
            return (this.x <= 0 || this.x >= this.world.getWidth() ||
                this.y <= 0 || this.y >= this.world.getHeight());
        }
    };
    Actor.prototype.getEdge = function (includeWidthAndHeight) {
        if (includeWidthAndHeight === void 0) { includeWidthAndHeight = true; }
        if (includeWidthAndHeight) {
            if (this.x <= 0)
                return Edges.Left;
            if (this.y <= 0)
                return Edges.Top;
            if (this.x + this.getWidth() >= this.world.getWidth())
                return Edges.Right;
            if (this.y + this.getHeight() >= this.world.getHeight())
                return Edges.Bottom;
            return Edges.NoEdge;
        }
        else {
            if (this.x <= 0)
                return Edges.Left;
            if (this.y <= 0)
                return Edges.Top;
            if (this.x >= this.world.getWidth())
                return Edges.Right;
            if (this.y >= this.world.getHeight())
                return Edges.Bottom;
            return Edges.NoEdge;
        }
    };
    Actor.prototype.setLocation = function (x, y, percent, originAtCenter) {
        if (percent === void 0) { percent = false; }
        if (originAtCenter === void 0) { originAtCenter = false; }
        this.setX(x, percent, originAtCenter);
        this.setY(y, percent, originAtCenter);
    };
    Actor.prototype.setLocationVector = function (v) {
        this.setX(v.x);
        this.setY(v.y);
    };
    Actor.prototype.render = function () {
        if (this.image) {
            if (this.getRotation() != 0) {
                var w = this.getWidth();
                var h = this.getHeight();
                this.ctx.save();
                var tX = w / 2 + this.x;
                var tY = h / 2 + this.y;
                this.ctx.translate(tX, tY);
                this.ctx.rotate(this.getRotation());
                this.ctx.drawImage(this.image, -w / 2, -h / 2, this.image.width, this.image.height);
                this.ctx.restore();
            }
            else {
                this.ctx.drawImage(this.image, this.x, this.y, this.image.width, this.image.height);
            }
        }
    };
    Actor.prototype.setCtx = function (ctx) {
        this.ctx = ctx;
    };
    Actor.prototype.setWorld = function (world) {
        this.world = world;
    };
    Actor.prototype.getWorld = function () {
        return this.world;
    };
    Actor.prototype.setImageSrc = function (src) {
        var image = new Image();
        image.src = src;
        this.image = image;
    };
    Actor.prototype.setImage = function (img) {
        this.image = img;
    };
    Actor.prototype.scaleImageProportionateToWidth = function (width) {
        var _this = this;
        var image = this.image;
        image.onload = function () {
            var factor = width / image.width;
            image.width *= factor;
            image.height *= factor;
            _this.setImage(image);
        };
    };
    Actor.prototype.scaleImageProportionateToHeight = function (height) {
        var _this = this;
        var image = this.image;
        image.onload = function () {
            var factor = height / image.height;
            image.width *= factor;
            image.height *= factor;
            _this.setImage(image);
        };
    };
    Actor.prototype.getImage = function () {
        return this.image;
    };
    Actor.prototype.destroy = function () {
        this.world.removeActor(this);
    };
    return Actor;
}());
exports.Actor = Actor;

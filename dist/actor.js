"use strict";
/**
 * The Actor class represents the objects which are contained in an instance of a subclass of the World class.
 * You can create a new Actor by creating a new subclass which inherits from the Actor class.
 */
var Actor = (function () {
    /**
     * Create a new Actor.
     * You can optionally pass the path to an image which will be used by the Actor or you may set it later with the _setImageSrc_ method.
     */
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
    /**
     * Get the class name of the actor
     */
    Actor.prototype.getClass = function () {
        return this.constructor.name;
    };
    // @Overwrite
    /**
     * This method can be overwritten by the class inheriting from the actor class to have a callback once the actor has been added to the world
     */
    Actor.prototype.addedToWorld = function (world) {
    };
    /**
     * This method can be overwritten by the class inheriting from the actor class to animate, which means to change properties of the actor, before the rendering method is called internally
     */
    Actor.prototype.animate = function () {
    };
    //Mouse
    /**
     * This method can be overwritten by the class inheriting from the actor class to react to mouse events
     */
    Actor.prototype.interactionEvent = function (e) {
    };
    /**
     * This method can be overwritten by the class inheriting from the actor class to react to dragging on the actor
     */
    Actor.prototype.dragging = function (x, y) {
    };
    // @Overwrite End
    /**
     * Get the lifetime of the actor in milliseconds
     */
    Actor.prototype.getLifetime = function () {
        return new Date().getTime() - this.birthtime;
    };
    /**
     * Mouse/Dragging helper function for pixel-perfect dragging
     **/
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
    /**
     * Get the x position of the actor relative to the world
     */
    Actor.prototype.getX = function () {
        return this.x;
    };
    /**
     * Set the x position of the actor relative to the world
     */
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
    /**
     * Set the rotation of the actor in radians
     */
    Actor.prototype.setRotation = function (radians) {
        this.rotation = radians;
    };
    /**
     * Get the rotation of the actor in radians
     */
    Actor.prototype.getRotation = function () {
        return this.rotation;
    };
    /**
     * Get the y position of the actor relative to the world
     */
    Actor.prototype.getY = function () {
        return this.y;
    };
    /**
     * Set the y position of the actor relative to the world
     */
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
    /**
     * Get the width of the actor as longs as the image has already loaded.
     * Otherwise the return value will be 0.
     */
    Actor.prototype.getWidth = function () {
        return this.image.width;
    };
    /**
     * Get the height of the actor as longs as the image has already loaded.
     * Otherwise the return value will be 0.
     */
    Actor.prototype.getHeight = function () {
        return this.image.height;
    };
    /**
     * Check whether this actor intersects with another one.
     * Note that this a bounding box collision check.
     */
    Actor.prototype.intersects = function (a) {
        return !(((this.getY() + this.getHeight()) < a.getY()) ||
            (this.getY() > (a.getY() + a.getHeight())) ||
            ((this.getX() + this.getWidth()) < a.getX()) ||
            (this.getX() > (a.getX() + a.getWidth())));
    };
    /**
     * Check whether a give point is located on the 'surface' of the actor
     */
    Actor.prototype.pointIsOnActor = function (x, y) {
        return (this.getX() <= x && this.getX() + this.getWidth() >= x) &&
            (this.getY() <= y && this.getY() + this.getHeight() >= y);
    };
    /**
     * Check whether the actor is at the edge of the world
     */
    Actor.prototype.isAtEdge = function () {
        return (this.x <= 0 || this.x >= this.world.getWidth() ||
            this.y <= 0 || this.y >= this.world.getHeight());
    };
    /**
     * Set the location of the actor.
     */
    Actor.prototype.setLocation = function (x, y, percent, originAtCenter) {
        if (percent === void 0) { percent = false; }
        if (originAtCenter === void 0) { originAtCenter = false; }
        this.setX(x, percent, originAtCenter);
        this.setY(y, percent, originAtCenter);
    };
    /**
     * Internal actor method to allow it to render itself
     */
    Actor.prototype.render = function () {
        if (this.image) {
            // Draw with rotation
            if (this.getRotation() != 0) {
                var w = this.getWidth();
                var h = this.getHeight();
                // Move origin, rotate Canvas, draw image
                this.ctx.save();
                var tX = w / 2 + this.x;
                var tY = h / 2 + this.y;
                this.ctx.translate(tX, tY);
                this.ctx.rotate(this.getRotation());
                this.ctx.drawImage(this.image, -w / 2, -h / 2, this.image.width, this.image.height);
                //Reset translation and rotation of canvas
                this.ctx.restore();
            }
            else {
                this.ctx.drawImage(this.image, this.x, this.y, this.image.width, this.image.height);
            }
        }
    };
    /**
     * This method is used in setup by the world class to specify the rendering context for the render method.
     */
    Actor.prototype.setCtx = function (ctx) {
        this.ctx = ctx;
    };
    /**
     * This method is used in setup by the world class to pass a reference to itself to the actor which can later be accessed by the getWorld() method
     */
    Actor.prototype.setWorld = function (world) {
        this.world = world;
    };
    /**
     * Gets the world in which the actor is located in.
     */
    Actor.prototype.getWorld = function () {
        return this.world;
    };
    /**
     * Sets the source of the actor's image
     */
    Actor.prototype.setImageSrc = function (src) {
        var image = new Image();
        image.src = src;
        this.image = image;
    };
    /**
     * Sets the actor's Image Object
     */
    Actor.prototype.setImage = function (img) {
        this.image = img;
    };
    /**
     * Scales the image of the actor to a specified width while maintaining proportion
     */
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
    /**
     * Scales the image of the actor to a specified height while maintaining proportion
     */
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
    /**
     * Gets the Image Object of the actor
     */
    Actor.prototype.getImage = function () {
        return this.image;
    };
    /**
     * Removes the actor itself from the world.
     */
    Actor.prototype.destroy = function () {
        this.world.removeActor(this);
    };
    return Actor;
}());
exports.Actor = Actor;

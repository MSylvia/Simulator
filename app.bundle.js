(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Simulator_1 = require("../Simulator");
var particle_1 = require("./particle");
var NightSky = (function (_super) {
    __extends(NightSky, _super);
    function NightSky(ctx) {
        var _this = _super.call(this, ctx) || this;
        _this.ctx = ctx;
        _super.prototype.setBackgroundColor.call(_this, 'black');
        ctx.canvas.addEventListener('click', function (e) { return _this.handleMouseClick(e); });
        _this.animate();
        var image = new Image();
        image.src = './NightSky/sky.jpg';
        Simulator_1.scaleImageProportionateToHeight(image, _this.getHeight(), function (image) {
            _this.useBackgroundImage(image);
        });
        _this.addToWorld(new Simulator_1.Text('Copyright © Tim Specht 2016', 12, 'Avenir Next', 'white'), 0, 0);
        var i = _this.registerInterval(function () {
            _this.explosion(Simulator_1.random(_this.getWidth()), Simulator_1.random(_this.getHeight()));
        }, 1000);
        _this.unregisterInterval(i);
        return _this;
    }
    NightSky.prototype.handleMouseClick = function (e) {
        this.explosion(e.offsetX, e.offsetY);
    };
    NightSky.prototype.explosion = function (x, y) {
        var _this = this;
        var min = 100;
        var color = new Simulator_1.Color().setRGBA(Simulator_1.random(255, min), Simulator_1.random(255, min), Simulator_1.random(255, min)).toString();
        Simulator_1.repeat(function () {
            _this.spawnParticle(x, y, color);
        }, 150);
    };
    NightSky.prototype.animate = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.animate(); });
    };
    NightSky.prototype.spawnParticle = function (x, y, color) {
        _super.prototype.addToWorld.call(this, new particle_1.Particle({
            color: color,
            alpha: 1,
            lifetime: 3e3,
            size: Simulator_1.random(15, 2),
            velocity: [Simulator_1.random(3, -3, false, true), Simulator_1.random(3, -3, false, true)],
            acceleration: [-0.03, -0.05]
        }), x, y);
    };
    return NightSky;
}(Simulator_1.World));
exports.NightSky = NightSky;

},{"../Simulator":6,"./particle":2}],2:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Simulator_1 = require("../Simulator");
var Particle = (function (_super) {
    __extends(Particle, _super);
    function Particle(props) {
        var _this = _super.call(this) || this;
        _this.props = props;
        return _this;
    }
    Particle.prototype.addedToWorld = function (world) {
        this.generateImage();
    };
    Particle.prototype.generateImage = function () {
        var ctx = Simulator_1.getNewCtx(this.props.size, this.props.size);
        ctx.globalAlpha = this.props.alpha;
        ctx.fillStyle = this.props.color;
        ctx.beginPath();
        var center = this.props.size / 2;
        ctx.arc(center, center, center, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        //ctx.fillRect(0, 0, this.props.size, this.props.size);
        var image = new Image();
        image.src = ctx.canvas.toDataURL();
        this.setImage(image);
    };
    Particle.prototype.animate = function () {
        var xDirection = this.props.velocity[0] / Math.abs(this.props.velocity[0]);
        this.props.velocity[0] -= -1 * xDirection * this.props.acceleration[0];
        this.props.velocity[1] -= this.props.acceleration[1];
        this.setOpacity(this.getOpacity() * 0.93);
        var x = this.getX() + this.props.velocity[0], y = this.getY() + this.props.velocity[1];
        this.setLocation(x, y);
        if (this.isAtEdge() || this.getLifetime() > this.props.lifetime)
            this.destroy();
    };
    return Particle;
}(Simulator_1.Actor));
exports.Particle = Particle;

},{"../Simulator":6}],3:[function(require,module,exports){
"use strict";
var Actor = (function () {
    function Actor() {
        this.devicePixelRatio = window.devicePixelRatio || 1;
        this.image = new Image();
        this.opacity = 1;
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
        this.isBeingDragged = false;
        this.birthtime = new Date().getTime();
    }
    /**
     * Get the class name of the actor
     */
    Actor.prototype.getClass = function () {
        return this.constructor.name;
    };
    // @Overwrite
    /**
     * This class can be overwritten by the class inheriting from the actor class to have a callback once the actor has been added to the world
     */
    Actor.prototype.addedToWorld = function (world) {
    };
    /**
     * This class can be overwritten by the class inheriting from the actor class to animate, which means to change properties of the actor, before the rendering method is called internally
     */
    Actor.prototype.animate = function () {
    };
    //Mouse
    /**
     * This class can be overwritten by the class inheriting from the actor class to react to mouse events
     */
    Actor.prototype.interactionEvent = function (e) {
    };
    /**
     * This class can be overwritten by the class inheriting from the actor class to react to dragging on the actor
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
     * Mouse/Draggig helper funcition for pixelperfect draggig
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
     * Set the y position of the actor realtive to the world
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
     * This method is used in setup by the world class to pass a refrence to itself to the actor which can later be accessed by the getWorld() method
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
     * Scales the image of the actor to a specifed width while maintaining proportion
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
     * Scales the image of the actor to a specifed height while maintaining proportion
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

},{}],4:[function(require,module,exports){
"use strict";
var lib_1 = require("./lib");
var CanvasImage = (function () {
    function CanvasImage(width, height, backgroundColor) {
        if (width === void 0) { width = 400; }
        if (height === void 0) { height = 300; }
        this.width = width;
        this.height = height;
        this.devicePixelRatio = window.devicePixelRatio || 1;
        this.ctx = lib_1.getNewCtx(width, height);
        this.setSize(width, height);
        if (backgroundColor) {
            this.ctx.fillStyle = backgroundColor;
            this.ctx.fillRect(0, 0, width, height);
        }
    }
    CanvasImage.prototype.getWidth = function () {
        return this.width;
    };
    CanvasImage.prototype.getHeight = function () {
        return this.height;
    };
    CanvasImage.prototype.setSize = function (width, height) {
        var factor = this.devicePixelRatio;
        var canvas = this.ctx.canvas;
        this.width = width;
        this.height = height;
        canvas.width = width * factor;
        canvas.height = height * factor;
        canvas.style.height = height + "px";
        canvas.style.width = width + "px";
        this.ctx.scale(factor, factor);
    };
    CanvasImage.fromText = function (text, fontSize, font, color, style, backgroundColor, height) {
        if (fontSize === void 0) { fontSize = 11; }
        if (font === void 0) { font = 'sans-serif'; }
        if (color === void 0) { color = 'black'; }
        if (style === void 0) { style = 'normal'; }
        if (height === void 0) { height = fontSize * 1.5; }
        //height = fontSize * 1.5; → http://stackoverflow.com/a/11452091/4260143
        var ctx = lib_1.getNewCtx();
        ctx.font = style + " " + fontSize + "px " + font;
        var width = ctx.measureText(text).width;
        var obj = new this(width, height, backgroundColor);
        obj.text(text, style + " " + fontSize + "px " + font, color);
        return obj;
    };
    CanvasImage.prototype.circle = function (x, y, radius, color, outlineOnly, outlineWidth) {
        if (color === void 0) { color = 'black'; }
        if (outlineOnly === void 0) { outlineOnly = false; }
        if (outlineWidth === void 0) { outlineWidth = 1; }
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = color;
        if (outlineOnly) {
            this.ctx.lineWidth = outlineWidth;
            this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
            this.ctx.stroke();
        }
        else {
            this.ctx.lineWidth = 0;
            this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
            this.ctx.fill();
        }
        this.ctx.closePath();
        return this;
    };
    CanvasImage.prototype.image = function (img, x, y, width, height) {
        if (width === void 0) { width = img.width; }
        if (height === void 0) { height = img.height; }
        this.ctx.drawImage(img, x, y, width, height);
    };
    CanvasImage.prototype.text = function (text, font, color, x, y, outlineOnly, outlineWidth) {
        if (color === void 0) { color = 'black'; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (outlineOnly === void 0) { outlineOnly = false; }
        if (outlineWidth === void 0) { outlineWidth = 1; }
        this.ctx.textBaseline = 'top';
        this.ctx.font = font;
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = outlineWidth;
        if (outlineOnly)
            this.ctx.strokeText(text, x, y);
        else
            this.ctx.fillText(text, x, y);
        return this;
    };
    CanvasImage.prototype.getCtx = function () {
        return this.ctx;
    };
    CanvasImage.prototype.setCtx = function (ctx) {
        this.ctx = ctx;
    };
    CanvasImage.prototype.getImage = function () {
        var i = new Image();
        i.src = this.ctx.canvas.toDataURL();
        i.height = this.height;
        i.width = this.width;
        return i;
    };
    return CanvasImage;
}());
exports.CanvasImage = CanvasImage;

},{"./lib":7}],5:[function(require,module,exports){
"use strict";
exports.colorNames = {
    "aliceblue": "#f0f8ff",
    "antiquewhite": "#faebd7",
    "aqua": "#00ffff",
    "aquamarine": "#7fffd4",
    "azure": "#f0ffff",
    "beige": "#f5f5dc",
    "bisque": "#ffe4c4",
    "black": "#000000",
    "blanchedalmond": "#ffebcd",
    "blue": "#0000ff",
    "blueviolet": "#8a2be2",
    "brown": "#a52a2a",
    "burlywood": "#deb887",
    "cadetblue": "#5f9ea0",
    "chartreuse": "#7fff00",
    "chocolate": "#d2691e",
    "coral": "#ff7f50",
    "cornflowerblue": "#6495ed",
    "cornsilk": "#fff8dc",
    "crimson": "#dc143c",
    "cyan": "#00ffff",
    "darkblue": "#00008b",
    "darkcyan": "#008b8b",
    "darkgoldenrod": "#b8860b",
    "darkgray": "#a9a9a9",
    "darkgreen": "#006400",
    "darkgrey": "#a9a9a9",
    "darkkhaki": "#bdb76b",
    "darkmagenta": "#8b008b",
    "darkolivegreen": "#556b2f",
    "darkorange": "#ff8c00",
    "darkorchid": "#9932cc",
    "darkred": "#8b0000",
    "darksalmon": "#e9967a",
    "darkseagreen": "#8fbc8f",
    "darkslateblue": "#483d8b",
    "darkslategray": "#2f4f4f",
    "darkslategrey": "#2f4f4f",
    "darkturquoise": "#00ced1",
    "darkviolet": "#9400d3",
    "deeppink": "#ff1493",
    "deepskyblue": "#00bfff",
    "dimgray": "#696969",
    "dimgrey": "#696969",
    "dodgerblue": "#1e90ff",
    "firebrick": "#b22222",
    "floralwhite": "#fffaf0",
    "forestgreen": "#228b22",
    "fuchsia": "#ff00ff",
    "gainsboro": "#dcdcdc",
    "ghostwhite": "#f8f8ff",
    "gold": "#ffd700",
    "goldenrod": "#daa520",
    "gray": "#808080",
    "green": "#008000",
    "greenyellow": "#adff2f",
    "grey": "#808080",
    "honeydew": "#f0fff0",
    "hotpink": "#ff69b4",
    "indianred": "#cd5c5c",
    "indigo": "#4b0082",
    "ivory": "#fffff0",
    "khaki": "#f0e68c",
    "lavender": "#e6e6fa",
    "lavenderblush": "#fff0f5",
    "lawngreen": "#7cfc00",
    "lemonchiffon": "#fffacd",
    "lightblue": "#add8e6",
    "lightcoral": "#f08080",
    "lightcyan": "#e0ffff",
    "lightgoldenrodyellow": "#fafad2",
    "lightgray": "#d3d3d3",
    "lightgreen": "#90ee90",
    "lightgrey": "#d3d3d3",
    "lightpink": "#ffb6c1",
    "lightsalmon": "#ffa07a",
    "lightseagreen": "#20b2aa",
    "lightskyblue": "#87cefa",
    "lightslategray": "#778899",
    "lightslategrey": "#778899",
    "lightsteelblue": "#b0c4de",
    "lightyellow": "#ffffe0",
    "lime": "#00ff00",
    "limegreen": "#32cd32",
    "linen": "#faf0e6",
    "magenta": "#ff00ff",
    "maroon": "#800000",
    "mediumaquamarine": "#66cdaa",
    "mediumblue": "#0000cd",
    "mediumorchid": "#ba55d3",
    "mediumpurple": "#9370db",
    "mediumseagreen": "#3cb371",
    "mediumslateblue": "#7b68ee",
    "mediumspringgreen": "#00fa9a",
    "mediumturquoise": "#48d1cc",
    "mediumvioletred": "#c71585",
    "midnightblue": "#191970",
    "mintcream": "#f5fffa",
    "mistyrose": "#ffe4e1",
    "moccasin": "#ffe4b5",
    "navajowhite": "#ffdead",
    "navy": "#000080",
    "oldlace": "#fdf5e6",
    "olive": "#808000",
    "olivedrab": "#6b8e23",
    "orange": "#ffa500",
    "orangered": "#ff4500",
    "orchid": "#da70d6",
    "palegoldenrod": "#eee8aa",
    "palegreen": "#98fb98",
    "paleturquoise": "#afeeee",
    "palevioletred": "#db7093",
    "papayawhip": "#ffefd5",
    "peachpuff": "#ffdab9",
    "peru": "#cd853f",
    "pink": "#ffc0cb",
    "plum": "#dda0dd",
    "powderblue": "#b0e0e6",
    "purple": "#800080",
    "rebeccapurple": "#663399",
    "red": "#ff0000",
    "rosybrown": "#bc8f8f",
    "royalblue": "#4169e1",
    "saddlebrown": "#8b4513",
    "salmon": "#fa8072",
    "sandybrown": "#f4a460",
    "seagreen": "#2e8b57",
    "seashell": "#fff5ee",
    "sienna": "#a0522d",
    "silver": "#c0c0c0",
    "skyblue": "#87ceeb",
    "slateblue": "#6a5acd",
    "slategray": "#708090",
    "slategrey": "#708090",
    "snow": "#fffafa",
    "springgreen": "#00ff7f",
    "steelblue": "#4682b4",
    "tan": "#d2b48c",
    "teal": "#008080",
    "thistle": "#d8bfd8",
    "tomato": "#ff6347",
    "turquoise": "#40e0d0",
    "violet": "#ee82ee",
    "wheat": "#f5deb3",
    "white": "#ffffff",
    "whitesmoke": "#f5f5f5",
    "yellow": "#ffff00",
    "yellowgreen": "#9acd32"
};
var lib_1 = require("./lib");
var Color = (function () {
    function Color(color) {
        this.reg = {
            rgb: /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/,
            rgba: /rgba\((\d{1,3}), (\d{1,3}), (\d{1,3}), (\d{1,3}|\d\.\d{1,})\)/,
            hex: /^#([a-zA-Z0-9]{6})/
        };
        if (color)
            this.parse(color);
    }
    Color.prototype.parse = function (color) {
        if (this.reg.rgb.test(color)) {
            var compontents = color.match(this.reg.rgb).slice(1, 4).map(function (c) { return parseFloat(c); });
            ;
            this.r = compontents[0];
            this.g = compontents[1];
            this.b = compontents[2];
            this.a = 1;
        }
        else if (this.reg.rgba.test(color)) {
            var compontents = color.match(this.reg.rgba).slice(1, 5).map(function (c) { return parseFloat(c); });
            this.r = compontents[0];
            this.g = compontents[1];
            this.b = compontents[2];
            this.a = compontents[3];
        }
        else if (this.reg.hex.test(color)) {
            var hexString = color.match(this.reg.hex)[1];
            var compontents = this.hexColorToRGB(hexString);
            this.r = compontents.r;
            this.g = compontents.g;
            this.b = compontents.b;
            this.a = 1;
        }
        else if (exports.colorNames[color.toLowerCase()] != undefined) {
            var hexString = exports.colorNames[color.toLowerCase()];
            var compontents = this.hexColorToRGB(hexString);
            this.r = compontents.r;
            this.g = compontents.g;
            this.b = compontents.b;
            this.a = 1;
        }
        else {
            console.error("Color \"" + color + "\" could not be parsed!");
        }
    };
    Color.prototype.randomize = function (alpha) {
        if (alpha === void 0) { alpha = false; }
        this.r = lib_1.random(255);
        this.g = lib_1.random(255);
        this.b = lib_1.random(255);
        alpha ? this.a = lib_1.random() : this.a = 1;
        return this;
    };
    Color.prototype.setColor = function (color) {
        this.parse(color);
    };
    Color.prototype.setRGBA = function (r, g, b, a) {
        if (a === void 0) { a = 1; }
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        return this;
    };
    Color.prototype.setR = function (r) {
        this.r = r;
    };
    Color.prototype.setG = function (g) {
        this.g = g;
    };
    Color.prototype.setB = function (b) {
        this.b = b;
    };
    Color.prototype.setA = function (a) {
        this.a = a;
    };
    Color.prototype.getR = function () {
        return this.r;
    };
    Color.prototype.getG = function () {
        return this.g;
    };
    Color.prototype.getB = function () {
        return this.b;
    };
    Color.prototype.getA = function () {
        return this.a;
    };
    Color.prototype.hexColorToRGB = function (color) {
        var _this = this;
        color = color.replace('#', '');
        var compontents = [];
        for (var p = 0; p < color.length; p += 2) {
            compontents.push(color.slice(p, p + 2));
        }
        var decComponents = compontents.map(function (c) { return _this.hexToDec(c); });
        return {
            r: decComponents[0],
            g: decComponents[1],
            b: decComponents[2]
        };
    };
    Color.prototype.hexToDec = function (hex) {
        return parseInt(hex.toUpperCase(), 16);
    };
    Color.prototype.toString = function () {
        return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")";
    };
    return Color;
}());
exports.Color = Color;

},{"./lib":7}],6:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./actor"));
__export(require("./lib"));
__export(require("./world"));
__export(require("./color"));
__export(require("./canvasImage"));
__export(require("./text"));

},{"./actor":3,"./canvasImage":4,"./color":5,"./lib":7,"./text":8,"./world":9}],7:[function(require,module,exports){
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

},{"./canvasImage":4}],8:[function(require,module,exports){
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

},{".":6}],9:[function(require,module,exports){
"use strict";
var World = (function () {
    function World(context, width, height) {
        if (width === void 0) { width = 600; }
        if (height === void 0) { height = 400; }
        var _this = this;
        this.context = context;
        this.width = width;
        this.height = height;
        this.actors = [];
        this.renderingOrder = [];
        this.sendMouseDownTo = [];
        this.savedSize = {
            width: 600,
            height: 400
        };
        this.devicePixelRatio = window.devicePixelRatio || 1;
        this.bgColor = 'white';
        this.useImage = false;
        this.bgImage = new Image();
        this.bgPos = {
            x: 0,
            y: 0
        };
        this.registerdIntervals = [];
        this.animationShouldRun = true;
        var canvas = this.context.canvas;
        this.setSize(width, height);
        this.render();
        this.bithtime = new Date().getTime();
        //Listen to Visibility
        document.addEventListener("visibilitychange", function () {
            var state = document.visibilityState;
            if (state == 'visible') {
                _this.start();
            }
            else if (state == 'hidden') {
                _this.pause();
            }
        });
        //Mouse Listeners
        canvas.addEventListener('click', function (e) { return _this.handleMouseEvent(e); });
        canvas.addEventListener('mousedown', function (e) { return _this.handleMouseEvent(e); });
        canvas.addEventListener('mouseup', function (e) { return _this.handleMouseEvent(e); });
        canvas.addEventListener('dblclick', function (e) { return _this.handleMouseEvent(e); });
        canvas.addEventListener('mousemove', function (e) { return _this.handleMouseMove(e); });
        //Touch
        //Todo
    }
    /**
    * Get the class name of the world
    */
    World.prototype.getClass = function () {
        return this.constructor.name;
    };
    /**
     * Internal method for handling mouse events
     */
    World.prototype.handleMouseEvent = function (e) {
        e.preventDefault();
        var x = e.offsetX, y = e.offsetY;
        if (e.type != 'mouseup') {
            for (var _i = 0, _a = this.actors; _i < _a.length; _i++) {
                var actor = _a[_i];
                var a = actor.obj;
                if (a.pointIsOnActor(x, y)) {
                    if (this.hasFunction(a, 'interactionEvent')) {
                        a.interactionEvent(e);
                        if (e.type == 'mousedown') {
                            this.sendMouseDownTo.push(a);
                            a.isBeingDragged = true;
                        }
                    }
                }
            }
        }
        else {
            for (var _b = 0, _c = this.sendMouseDownTo; _b < _c.length; _b++) {
                var actor = _c[_b];
                if (this.hasFunction(actor, 'interactionEvent'))
                    actor.interactionEvent(e);
                actor.isBeingDragged = false;
            }
            this.sendMouseDownTo = [];
        }
    };
    /**
     * Test if an object has a function
     */
    World.prototype.hasFunction = function (obj, functionName) {
        return typeof obj[functionName] == 'function';
    };
    /**
     * Register interval to the world. Returns the id of the interval.
     */
    World.prototype.registerInterval = function (f, i) {
        var id = setInterval(f, i);
        this.registerdIntervals.push({
            id: id,
            i: i,
            function: f,
            active: true
        });
        return id;
    };
    /**
     * Remove interval which has been registered through registerInterval method
     */
    World.prototype.unregisterInterval = function (id) {
        var index = this.registerdIntervals.indexOf(this.registerdIntervals.filter(function (i) { return i.id == id; })[0]);
        clearInterval(this.registerdIntervals[index].id);
        this.registerdIntervals.splice(index, 1);
    };
    /**
     * Pause all active intervals which were registered through registerInterval method
     */
    World.prototype.pauseAllIntervals = function () {
        this.registerdIntervals.filter(function (i) { return i.active; }).forEach(function (i) {
            clearInterval(i.id);
            i.active = false;
        });
    };
    /**
     * Start all paused intervals which were registered through registerInterval method
     */
    World.prototype.startAllIntervals = function () {
        this.registerdIntervals.filter(function (i) { return !i.active; }).forEach(function (i) {
            i.id = setInterval(i.function, i.i);
            i.active = true;
        });
    };
    /**
    * Internal method for handling dragging in conjunction with mouse move
    */
    World.prototype.handleMouseMove = function (e) {
        var x = e.offsetX, y = e.offsetY;
        for (var _i = 0, _a = this.actors; _i < _a.length; _i++) {
            var actor = _a[_i];
            var a = actor.obj;
            if (a.isBeingDragged) {
                if (a.dragging != undefined) {
                    a.dragging(x, y);
                }
            }
        }
    };
    /**
     * Get current lifetime of world in milliseconds
     */
    World.prototype.getLifetime = function () {
        return new Date().getTime() - this.bithtime;
    };
    /**
     * Enter fullscreen mode on canvas element
     */
    World.prototype.enterFullscreen = function () {
        var _this = this;
        this.saveSize();
        this.context.canvas.webkitRequestFullScreen();
        this.setSize(window.innerWidth, window.innerHeight);
        window.addEventListener('resize', function (e) {
            _this.setSize(window.innerWidth, window.innerHeight);
        });
    };
    /**
     * Exit the fullscreen mode on canvas element
     */
    World.prototype.exitFullscreen = function () {
        var _this = this;
        document.webkitExitFullscreen();
        window.removeEventListener('resize', null);
        setTimeout(function () { return _this.restoreSize(); }, 1000);
    };
    ;
    /**
     * Save the size of the canvas
     */
    World.prototype.saveSize = function () {
        this.savedSize.width = this.width;
        this.savedSize.height = this.height;
    };
    /**
     * Restore the canvas to the saved size
     */
    World.prototype.restoreSize = function () {
        this.setSize(this.savedSize.width, this.savedSize.height);
    };
    /**
     * Set the size of the canvas.
     * Resolution gets set automatically
     */
    World.prototype.setSize = function (width, height) {
        var factor = this.devicePixelRatio;
        var canvas = this.context.canvas;
        this.width = width;
        this.height = height;
        canvas.width = width * factor;
        canvas.height = height * factor;
        canvas.style.height = height + "px";
        canvas.style.width = width + "px";
        this.context.scale(factor, factor);
    };
    /**
     * Adds the actor to the world at location x and y.
     * If percent is set to true, x and y are not treated as pixel values but as percentages of width and hight of the world
     */
    World.prototype.addToWorld = function (actor, x, y, percent) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (percent === void 0) { percent = false; }
        //Set drawing context for render handling
        actor.setCtx(this.context);
        // Set World context
        actor.setWorld(this);
        if (percent) {
            x = this.width * x / 100;
            y = this.height * y / 100;
        }
        else {
            //Set x, y
            actor.setX(x);
            actor.setY(y);
        }
        this.actors.push({
            obj: actor,
            className: actor.getClass()
        });
        //Call Method
        if (this.hasFunction(actor, 'addedToWorld'))
            actor.addedToWorld(this);
    };
    /**
     * Removes actor from the world
     */
    World.prototype.removeActor = function (a) {
        var actor = this.actors.filter(function (f) { return f.obj == a; })[0];
        var index = this.actors.indexOf(actor);
        this.actors.splice(index, 1);
    };
    /**
     * Get all actors in the world or just those with the class name specified
     */
    World.prototype.getActors = function (className) {
        var actors = this.actors;
        if (className) {
            actors = actors.filter(function (a) { return a.className == className; });
        }
        return actors.map(function (a) { return a.obj; });
    };
    /**
     * Get the width of the world
     */
    World.prototype.getWidth = function () {
        return this.width;
    };
    /**
     * Get the height of the world
     */
    World.prototype.getHeight = function () {
        return this.height;
    };
    /**
     * Internal method to clear the canvas before each rendering method call.
     * The background is being redrawn
     */
    World.prototype.clear = function () {
        this.context.globalAlpha = 1;
        this.context.fillStyle = this.bgColor;
        this.context.fillRect(0, 0, this.getWidth(), this.getHeight());
        if (this.useImage) {
            this.context.drawImage(this.bgImage, this.bgPos.x, this.bgPos.y, this.bgImage.width, this.bgImage.height);
        }
    };
    /**
     * Sets the background color of the canvas
     */
    World.prototype.setBackgroundColor = function (color) {
        this.bgColor = color;
    };
    /**
     * Set the background image and whether it should be used and the location of the image
     */
    World.prototype.useBackgroundImage = function (image, use, pos) {
        if (use === void 0) { use = true; }
        if (use) {
            this.useImage = true;
            this.bgImage = image;
            if (pos) {
                this.bgPos = pos;
            }
        }
        else {
            this.useImage = false;
        }
    };
    /**
     * Get the background color
     */
    World.prototype.getBackgroundColor = function () {
        return this.bgColor;
    };
    /**
     * Internal method used to render the world with its background and all the actors in it.
     */
    World.prototype.render = function () {
        var _this = this;
        if (!this.animationShouldRun)
            return;
        this.clear();
        var toRender = this.actors.slice();
        // Build a list in which order to render the actors
        var renderingLists = [];
        var _loop_1 = function (orderItemClassName) {
            var associatedActors = toRender.filter(function (r) { return r.className == orderItemClassName; });
            for (var _i = 0, associatedActors_1 = associatedActors; _i < associatedActors_1.length; _i++) {
                var actor = associatedActors_1[_i];
                toRender.splice(toRender.indexOf(actor), 1);
            }
            renderingLists.push(associatedActors);
        };
        // Build list in this.renderingOrder order
        for (var _i = 0, _a = this.renderingOrder; _i < _a.length; _i++) {
            var orderItemClassName = _a[_i];
            _loop_1(orderItemClassName);
        }
        // Add rest
        renderingLists.push(toRender);
        // Go through the list backward, animate and render. The thing last renderd is display first
        for (var i = renderingLists.length - 1; i >= 0; i--) {
            for (var _b = 0, _c = renderingLists[i]; _b < _c.length; _b++) {
                var actor = _c[_b];
                if (this.hasFunction(actor.obj, 'animate'))
                    actor.obj.animate();
                this.context.globalAlpha = actor.obj.getOpacity();
                actor.obj.render();
            }
        }
        requestAnimationFrame(function () {
            if (_this.animationShouldRun) {
                _this.render();
            }
        });
    };
    /**
     * Sets the order on class level in which the actor should be renderd.
     * E.g. first class specified will be rendered on top of all others
     */
    World.prototype.setRenderingOrder = function () {
        var order = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            order[_i - 0] = arguments[_i];
        }
        this.renderingOrder = order;
    };
    /**
     * Starts/ Resumes the rendering of the world
     */
    World.prototype.start = function () {
        if (!this.animationShouldRun) {
            console.info(this.getClass() + " has been started!");
            this.animationShouldRun = true;
            this.startAllIntervals();
        }
        else {
            console.warn(this.getClass() + " is already running!");
        }
    };
    /**
     * Pauses the rendering of the world
     */
    World.prototype.pause = function () {
        console.info(this.getClass() + " has been paused!");
        this.animationShouldRun = false;
        this.pauseAllIntervals();
    };
    return World;
}());
exports.World = World;

},{}],10:[function(require,module,exports){
"use strict";
var nightSky_1 = require("./NightSky/nightSky");
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var image = new Image();
var sky = new nightSky_1.NightSky(ctx);
window['sky'] = sky;
var Simulator_1 = require("./Simulator");
var i = new Image();
i.src = './src/background.png';
Simulator_1.coverWithImage(i, 300, 300, function (image) {
    document.body.appendChild(image);
}, 'end');

},{"./NightSky/nightSky":1,"./Simulator":6}]},{},[10]);

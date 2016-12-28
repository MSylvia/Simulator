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

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
        this.registeredIntervals = [];
        this.animationShouldRun = true;
        var canvas = this.context.canvas;
        this.setSize(width, height);
        this.render();
        this.birthtime = new Date().getTime();
        document.addEventListener("visibilitychange", function () {
            var state = document.visibilityState;
            if (state == 'visible') {
                _this.start();
            }
            else if (state == 'hidden') {
                _this.pause();
            }
        });
        canvas.addEventListener('click', function (e) { return _this.handleMouseEvent(e); });
        canvas.addEventListener('mousedown', function (e) { return _this.handleMouseEvent(e); });
        canvas.addEventListener('mouseup', function (e) { return _this.handleMouseEvent(e); });
        canvas.addEventListener('dblclick', function (e) { return _this.handleMouseEvent(e); });
        canvas.addEventListener('mousemove', function (e) { return _this.handleMouseMove(e); });
    }
    World.prototype.getClass = function () {
        return this.constructor.name;
    };
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
    World.prototype.hasFunction = function (obj, functionName) {
        return typeof obj[functionName] == 'function';
    };
    World.prototype.registerInterval = function (f, i) {
        var id = setInterval(f, i);
        this.registeredIntervals.push({
            id: id,
            i: i,
            function: f,
            active: true
        });
        return id;
    };
    World.prototype.unregisterInterval = function (id) {
        var index = this.registeredIntervals.indexOf(this.registeredIntervals.filter(function (i) { return i.id == id; })[0]);
        clearInterval(this.registeredIntervals[index].id);
        this.registeredIntervals.splice(index, 1);
    };
    World.prototype.pauseAllIntervals = function () {
        this.registeredIntervals.filter(function (i) { return i.active; }).forEach(function (i) {
            clearInterval(i.id);
            i.active = false;
        });
    };
    World.prototype.startAllIntervals = function () {
        this.registeredIntervals.filter(function (i) { return !i.active; }).forEach(function (i) {
            i.id = setInterval(i.function, i.i);
            i.active = true;
        });
    };
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
    World.prototype.getLifetime = function () {
        return new Date().getTime() - this.birthtime;
    };
    World.prototype.enterFullscreen = function () {
        var _this = this;
        this.saveSize();
        this.context.canvas.webkitRequestFullScreen();
        this.setSize(window.innerWidth, window.innerHeight);
        window.addEventListener('resize', function (e) {
            _this.setSize(window.innerWidth, window.innerHeight);
        });
    };
    World.prototype.exitFullscreen = function () {
        var _this = this;
        document.webkitExitFullscreen();
        window.removeEventListener('resize', null);
        setTimeout(function () { return _this.restoreSize(); }, 1000);
    };
    ;
    World.prototype.saveSize = function () {
        this.savedSize.width = this.width;
        this.savedSize.height = this.height;
    };
    World.prototype.restoreSize = function () {
        this.setSize(this.savedSize.width, this.savedSize.height);
    };
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
    World.prototype.addToWorld = function (actor, x, y, percent) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (percent === void 0) { percent = false; }
        actor.setCtx(this.context);
        actor.setWorld(this);
        if (percent) {
            x = this.width * x / 100;
            y = this.height * y / 100;
        }
        else {
            actor.setX(x);
            actor.setY(y);
        }
        this.actors.push({
            obj: actor,
            className: actor.getClass()
        });
        if (this.hasFunction(actor, 'addedToWorld'))
            actor.addedToWorld(this);
    };
    World.prototype.removeActor = function (a) {
        var actor = this.actors.filter(function (f) { return f.obj == a; })[0];
        var index = this.actors.indexOf(actor);
        this.actors.splice(index, 1);
    };
    World.prototype.getActors = function (className) {
        var actors = this.actors;
        if (className) {
            actors = actors.filter(function (a) { return a.className == className; });
        }
        return actors.map(function (a) { return a.obj; });
    };
    World.prototype.getWidth = function () {
        return this.width;
    };
    World.prototype.getHeight = function () {
        return this.height;
    };
    World.prototype.clear = function () {
        this.context.globalAlpha = 1;
        this.context.fillStyle = this.bgColor;
        this.context.fillRect(0, 0, this.getWidth(), this.getHeight());
        if (this.useImage) {
            this.context.drawImage(this.bgImage, this.bgPos.x, this.bgPos.y, this.bgImage.width, this.bgImage.height);
        }
    };
    World.prototype.setBackgroundColor = function (color) {
        this.bgColor = color;
    };
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
    World.prototype.getBackgroundColor = function () {
        return this.bgColor;
    };
    World.prototype.render = function () {
        var _this = this;
        if (!this.animationShouldRun)
            return;
        this.clear();
        var toRender = this.actors.slice();
        var renderingLists = [];
        var _loop_1 = function (orderItemClassName) {
            var associatedActors = toRender.filter(function (r) { return r.className == orderItemClassName; });
            for (var _i = 0, associatedActors_1 = associatedActors; _i < associatedActors_1.length; _i++) {
                var actor = associatedActors_1[_i];
                toRender.splice(toRender.indexOf(actor), 1);
            }
            renderingLists.push(associatedActors);
        };
        for (var _i = 0, _a = this.renderingOrder; _i < _a.length; _i++) {
            var orderItemClassName = _a[_i];
            _loop_1(orderItemClassName);
        }
        renderingLists.push(toRender);
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
    World.prototype.setRenderingOrder = function () {
        var order = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            order[_i] = arguments[_i];
        }
        this.renderingOrder = order;
    };
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
    World.prototype.pause = function () {
        console.info(this.getClass() + " has been paused!");
        this.animationShouldRun = false;
        this.pauseAllIntervals();
    };
    return World;
}());
exports.World = World;

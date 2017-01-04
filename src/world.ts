import { Actor } from './actor';


/**
 * The World class is used to create a container for all the objects (Actors) in it.
 * You can use it by creating a subclass which inherits from the World class.
 */
export abstract class World {

    private actors: {
        className: string,
        obj: Actor
    }[] = [];
    private renderingOrder: string[] = [];
    private sendMouseDownTo: Actor[] = [];
    private birthtime: number;

    private savedSize = {
        width: 600,
        height: 400
    }
    private devicePixelRatio = window.devicePixelRatio || 1;

    private runOwnAnimationBool = false;


    public bgColor = 'white';
    private useImage = false;
    private bgImage = new Image();
    private bgPos = {
        x: 0,
        y: 0
    }

    private registeredIntervals: {
        id: number,
        function: Function,
        i: number,
        active: boolean
    }[] = [];

    private animationShouldRun = true;

    /**
     * Create a new World by passing the CanvasRenderingContext2D and optionally width and height of the world.
     */
    constructor(private context: CanvasRenderingContext2D, private width = 600, private height = 400) {


        let canvas = this.context.canvas;
        this.setSize(width, height);
        this.render();

        this.birthtime = new Date().getTime();

        //Listen to Visibility

        document.addEventListener("visibilitychange", () => {
            let state = document.visibilityState;
            if (state == 'visible') {
                this.start();
            } else if (state == 'hidden') {
                this.pause();
            }
        });


        //Mouse Listeners
        canvas.addEventListener('click', e => this.handleMouseEvent(e));
        canvas.addEventListener('mousedown', e => this.handleMouseEvent(e));
        canvas.addEventListener('mouseup', e => this.handleMouseEvent(e));
        canvas.addEventListener('dblclick', e => this.handleMouseEvent(e));
        canvas.addEventListener('mousemove', e => this.handleMouseMove(e))

        //Touch
        //Todo
    }

    /**
    * Get the class name of the world
    */
    public getClass() {
        return (<any>this.constructor).name;
    }

    /**
     * Internal method for handling mouse events
     */
    private handleMouseEvent(e: MouseEvent) {
        e.preventDefault();
        let x = e.offsetX,
            y = e.offsetY;

        if (e.type != 'mouseup') {
            for (let actor of this.actors) {
                let a = actor.obj;
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

        } else {
            for (let actor of this.sendMouseDownTo) {
                if (this.hasFunction(actor, 'interactionEvent')) actor.interactionEvent(e);
                actor.isBeingDragged = false;
            }
            this.sendMouseDownTo = [];

        }
    }

    /**
     * Test if an object has a function
     */
    private hasFunction(obj: any, functionName) {
        return typeof obj[functionName] == 'function'
    }

    /**
     * Register interval to the world. Returns the id of the interval.
     */
    public registerInterval(f: Function, i: number) {
        let id = setInterval(f, i);
        this.registeredIntervals.push({
            id: id,
            i: i,
            function: f,
            active: true
        });

        return id;
    }

    /**
     * Remove interval which has been registered through registerInterval method
     */
    public unregisterInterval(id: number) {
        let index = this.registeredIntervals.indexOf(this.registeredIntervals.filter(i => i.id == id)[0]);
        clearInterval(this.registeredIntervals[index].id);
        this.registeredIntervals.splice(index, 1);
    }


    /**
     * Pause all active intervals which were registered through registerInterval method
     */
    public pauseAllIntervals() {
        this.registeredIntervals.filter(i => i.active).forEach(i => {
            clearInterval(i.id);
            i.active = false;
        })
    }

    /**
     * Start all paused intervals which were registered through registerInterval method
     */
    public startAllIntervals() {
        this.registeredIntervals.filter(i => !i.active).forEach(i => {
            i.id = setInterval(i.function, i.i);
            i.active = true;
        })
    }

    /**
    * Internal method for handling dragging in conjunction with mouse move
    */
    private handleMouseMove(e: MouseEvent) {
        let x = e.offsetX,
            y = e.offsetY;

        for (let actor of this.actors) {
            let a = actor.obj;
            if (a.isBeingDragged) {
                if (a.dragging != undefined) {
                    a.dragging(x, y);
                }
            }
        }

    }

    /**
     * Get current lifetime of world in milliseconds
     */
    public getLifetime() {
        return new Date().getTime() - this.birthtime;
    }

    /**
     * Enter fullscreen mode on canvas element
     */
    public enterFullscreen() {
        this.saveSize();
        this.context.canvas.webkitRequestFullScreen();
        this.setSize(window.innerWidth, window.innerHeight);
        window.addEventListener('resize', e => {
            this.setSize(window.innerWidth, window.innerHeight);
        });
    }

    /**
     * Exit the fullscreen mode on canvas element
     */
    public exitFullscreen() {
        document.webkitExitFullscreen();
        window.removeEventListener('resize', null);
        setTimeout(() => this.restoreSize(), 1000);
    };

    /**
     * Save the size of the canvas
     */
    public saveSize() {
        this.savedSize.width = this.width;
        this.savedSize.height = this.height;
    }

    /**
     * Restore the canvas to the saved size
     */
    public restoreSize() {
        this.setSize(this.savedSize.width, this.savedSize.height);
    }

    /**
     * Set the size of the canvas.
     * Resolution gets set automatically
     */
    public setSize(width: number, height: number) {
        let factor = this.devicePixelRatio;
        let canvas = this.context.canvas;
        this.width = width;
        this.height = height;

        canvas.width = width * factor;
        canvas.height = height * factor;

        canvas.style.height = `${height}px`;
        canvas.style.width = `${width}px`;
        this.context.scale(factor, factor);
    }

    /**
     * Adds the actor to the world at location x and y. 
     * If percent is set to true, x and y are not treated as pixel values but as percentages of width and hight of the world.
     */
    public addToWorld(actor: Actor, x = 0, y = 0, percent = false) {

        //Set drawing context for render handling
        actor.setCtx(this.context);

        // Set World context
        actor.setWorld(this);



        if (percent) {
            x = this.width * x / 100;
            y = this.height * y / 100;
        } else {
            //Set x, y
            actor.setX(x);
            actor.setY(y);
        }


        this.actors.push({
            obj: actor,
            className: actor.getClass()
        });

        //Call Method
        if (this.hasFunction(actor, 'addedToWorld')) actor.addedToWorld(this);
    }

    /**
     * Removes actor from the world
     */
    public removeActor(a: Actor) {
        let actor = this.actors.filter(f => f.obj == a)[0];
        let index = this.actors.indexOf(actor);
        this.actors.splice(index, 1);
    }

    /**
     * Get all actors in the world or just those with the class name specified
     */
    public getActors(className?: string) {
        let actors = this.actors;
        if (className) {
            actors = actors.filter(a => a.className == className);
        }
        return actors.map(a => a.obj);
    }

    /**
     * Get the width of the world
     */
    public getWidth() {
        return this.width;
    }

    /**
     * Get the height of the world
     */
    public getHeight() {
        return this.height;
    }

    /**
     * Internal method to clear the canvas before each rendering method call.
     * The background is being redrawn 
     */
    private clear() {
        this.context.globalAlpha = 1;
        this.context.fillStyle = this.bgColor;
        this.context.fillRect(0, 0, this.getWidth(), this.getHeight());

        if (this.useImage) {
            this.context.drawImage(this.bgImage, this.bgPos.x, this.bgPos.y, this.bgImage.width, this.bgImage.height);
        }
    }

    /**
     * Sets the background color of the canvas
     */
    public setBackgroundColor(color: string) {
        this.bgColor = color;
    }

    /**
     * Set the background image and whether it should be used and the location of the image
     */
    public useBackgroundImage(image: HTMLImageElement, use = true, pos?: { x: number, y: number }) {
        if (use) {
            this.useImage = true;
            this.bgImage = image;
            if (pos) {
                this.bgPos = pos;
            }
        } else {
            this.useImage = false;
        }
    }

    /**
     * Get the background color
     */
    public getBackgroundColor() {
        return this.bgColor;
    }

    // @Overwrite
    public animate(){

    }
    public runOwnAnimation(run = true){
        this.runOwnAnimationBool = run;
    }

    /**
     * Internal method used to render the world with its background and all the actors in it.
     */
    private render() {

        if (!this.animationShouldRun) return;

        if(this.runOwnAnimationBool) this.animate();

        this.clear();


        let toRender = this.actors.slice();

        // Build a list in which order to render the actors

        let renderingLists: {
            className: string,
            obj: Actor
        }[][] = [];

        // Build list in this.renderingOrder order
        for (let orderItemClassName of this.renderingOrder) {

            let associatedActors = toRender.filter(r => r.className == orderItemClassName);
            for (let actor of associatedActors) {
                toRender.splice(toRender.indexOf(actor), 1);
            }

            renderingLists.push(associatedActors);
        }

        // Add rest
        renderingLists.push(toRender);


        // Go through the list backward, animate and render. The thing last rendered is display first
        for (let i = renderingLists.length - 1; i >= 0; i--) {
            for (let actor of renderingLists[i]) {
                if (this.hasFunction(actor.obj, 'animate')) actor.obj.animate();
                this.context.globalAlpha = actor.obj.getOpacity();
                actor.obj.render();
            }
        }


        requestAnimationFrame(() => {
            if (this.animationShouldRun) {
                this.render();
            }
        })


    }



    /**
     * Sets the order on class level in which the actor should be rendered.
     * E.g. first class specified will be rendered on top of all others.
     */
    public setRenderingOrder(...order) {
        this.renderingOrder = order;
    }

    /**
     * Starts/ Resumes the rendering of the world
     */
    public start() {
        if (!this.animationShouldRun) {
            console.info(`${this.getClass()} has been started!`);
            this.animationShouldRun = true;
            this.startAllIntervals();
        } else {
            console.warn(`${this.getClass()} is already running!`)
        }
    }

    /**
     * Pauses the rendering of the world
     */
    public pause() {
        console.info(`${this.getClass()} has been paused!`);
        this.animationShouldRun = false;
        this.pauseAllIntervals();
    }
}
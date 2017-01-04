import { World } from './world';
import { Vector } from './math/vector';

export enum Edges {
    Top,
    Left,
    Right,
    Bottom,
    NoEdge
}

export interface Animate {
    /**
    * This method can be overwritten by the class inheriting from the actor class to animate, which means to change properties of the actor, before the rendering method is called internally
    */
    animate(): void
}

export interface InteractionEvent {

    /**
     * This method can be overwritten by the class inheriting from the actor class to react to mouse events
     */
    interactionEvent(e: MouseEvent): void
}

export interface Dragging {
    /**
    * This method can be overwritten by the class inheriting from the actor class to react to dragging on the actor
    */
    dragging(x: number, y: number): void
}

export interface AddedToWorld {
    /**
    * This method can be overwritten by the class inheriting from the actor class to react to dragging on the actor
    */
    addedToWorld(world: World): void
}


/**
 * The Actor class represents the objects which are contained in an instance of a subclass of the World class.
 * You can create a new Actor by creating a new subclass which inherits from the Actor class.
 */
export abstract class Actor {
    private ctx: CanvasRenderingContext2D;
    private devicePixelRatio = window.devicePixelRatio || 1;

    private image: HTMLImageElement = new Image();
    private opacity: number = 1;

    private x: number = 0;
    private y: number = 0;
    private rotation: number = 0;
    public isBeingDragged = false;

    private world: World;
    private birthtime: number;

    /**
     * Create a new Actor.
     * You can optionally pass the path to an image which will be used by the Actor or you may set it later with the _setImageSrc_ method.
     */
    constructor(imageSrc?: string) {
        this.birthtime = new Date().getTime();

        if (imageSrc) this.setImageSrc(imageSrc)
    }

    /**
     * Get the class name of the actor
     */
    public getClass() {
        return (<any>this.constructor).name;
    }


    // @Overwrite

    /**
     * This method can be overwritten by the class inheriting from the actor class to have a callback once the actor has been added to the world
     */
    public addedToWorld(world: World) {

    }

    /**
     * This method can be overwritten by the class inheriting from the actor class to animate, which means to change properties of the actor, before the rendering method is called internally
     */
    public animate() {

    }



    //Mouse

    /**
     * This method can be overwritten by the class inheriting from the actor class to react to mouse events
     */
    public interactionEvent(e: MouseEvent) {

    }

    /**
     * This method can be overwritten by the class inheriting from the actor class to react to dragging on the actor
     */
    public dragging(x: number, y: number) {

    }

    // @Overwrite End

    /**
     * Get the lifetime of the actor in milliseconds
     */

    public getLifetime() {
        return new Date().getTime() - this.birthtime;
    }

    /**
     * Mouse/Dragging helper function for pixel-perfect dragging
     **/
    public getClickCoordinatesRelativeToActor(clickX: number, clickY: number) {
        let cX = clickX,
            cY = clickY;

        let x = this.getX(),
            y = this.getY();

        return {
            x: cX - x,
            y: cY - y
        }
    }

    public setOpacity(o: number) {
        this.opacity = o;
    }

    public getOpacity() {
        return this.opacity;
    }

    /**
     * Get the x position of the actor relative to the world
     */
    public getX() {
        return this.x;
    }

    /**
     * Set the x position of the actor relative to the world
     */
    public setX(x: number, percent = false, originAtCenter = false) {
        if (percent) {
            x = this.getWorld().getWidth() * x / 100;
        }

        if (originAtCenter) {
            x -= this.getWidth() / 2;
        }

        this.x = x;
    }

    /**
     * Set the rotation of the actor in radians
     */
    public setRotation(radians: number) {
        this.rotation = radians;
    }

    /**
     * Get the rotation of the actor in radians
     */
    public getRotation() {
        return this.rotation;
    }

    /**
     * Get the y position of the actor relative to the world
     */
    public getY() {
        return this.y;
    }

    /**
     * Set the y position of the actor relative to the world
     */
    public setY(y: number, percent = false, originAtCenter = false) {
        if (percent) {
            y = this.getWorld().getHeight() * y / 100;
        }
        if (originAtCenter) {
            y -= this.getHeight() / 2;
        }

        this.y = y;
    }

    /**
     * Get the width of the actor as longs as the image has already loaded.
     * Otherwise the return value will be 0.
     */
    public getWidth() {
        return this.image.width;
    }

    /**
     * Get the height of the actor as longs as the image has already loaded.
     * Otherwise the return value will be 0.
     */
    public getHeight() {
        return this.image.height;
    }

    /**
     * Check whether this actor intersects with another one.
     * Note that this a bounding box collision check.
     */
    public intersects(a: Actor) {
        return !(
            ((this.getY() + this.getHeight()) < a.getY()) ||
            (this.getY() > (a.getY() + a.getHeight())) ||
            ((this.getX() + this.getWidth()) < a.getX()) ||
            (this.getX() > (a.getX() + a.getWidth()))
        );
    }

    /**
     * Check whether a give point is located on the 'surface' of the actor
     */
    public pointIsOnActor(x: number, y: number) {
        return (this.getX() <= x && this.getX() + this.getWidth() >= x) &&
            (this.getY() <= y && this.getY() + this.getHeight() >= y)
    }

    /**
     * Check whether the actor is at the edge of the world
     */
    public isAtEdge(includeWidthAndHeight = true) {
        if (includeWidthAndHeight) {
            return (
                this.x <= 0 || this.x + this.getWidth() >= this.world.getWidth() ||
                this.y <= 0 || this.y + this.getHeight() >= this.world.getHeight()
            )
        } else {
            return (
                this.x <= 0 || this.x >= this.world.getWidth() ||
                this.y <= 0 || this.y >= this.world.getHeight()
            )
        }

    }

    public getEdge(includeWidthAndHeight = true) {
        if (includeWidthAndHeight) {
            if (this.x <= 0) return Edges.Left;
            if (this.y <= 0) return Edges.Top;
            if (this.x + this.getWidth() >= this.world.getWidth()) return Edges.Right;
            if (this.y + this.getHeight() >= this.world.getHeight()) return Edges.Bottom;
            return Edges.NoEdge;
        } else {
            if (this.x <= 0) return Edges.Left;
            if (this.y <= 0) return Edges.Top;
            if (this.x >= this.world.getWidth()) return Edges.Right;
            if (this.y >= this.world.getHeight()) return Edges.Bottom;
            return Edges.NoEdge;
        }
    }

    /**
     * Set the location of the actor.
     */
    public setLocation(x: number, y: number, percent = false, originAtCenter = false) {
        this.setX(x, percent, originAtCenter);
        this.setY(y, percent, originAtCenter);
    }

    public setLocationVector(v: Vector) {
        //console.log(v.x, v.y);

        this.setX(v.x);
        this.setY(v.y);
    }

    /**
     * Internal actor method to allow it to render itself
     */
    public render() {

        if (this.image) {

            // Draw with rotation
            if (this.getRotation() != 0) {
                let w = this.getWidth();
                let h = this.getHeight();

                // Move origin, rotate Canvas, draw image
                this.ctx.save();
                let tX = w / 2 + this.x;
                let tY = h / 2 + this.y;

                this.ctx.translate(tX, tY);
                this.ctx.rotate(this.getRotation());

                this.ctx.drawImage(this.image, -w / 2, -h / 2, this.image.width, this.image.height);

                //Reset translation and rotation of canvas
                this.ctx.restore();
            } else {
                this.ctx.drawImage(this.image, this.x, this.y, this.image.width, this.image.height);
            }

        }
    }

    /**
     * This method is used in setup by the world class to specify the rendering context for the render method.
     */
    public setCtx(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;

    }

    /**
     * This method is used in setup by the world class to pass a reference to itself to the actor which can later be accessed by the getWorld() method
     */
    public setWorld(world: World) {
        this.world = world;
    }

    /**
     * Gets the world in which the actor is located in.
     */
    public getWorld() {
        return this.world;
    }


    /**
     * Sets the source of the actor's image
     */
    public setImageSrc(src: string) {
        let image = new Image();
        image.src = src;
        this.image = image;

    }

    /**
     * Sets the actor's Image Object
     */
    public setImage(img: HTMLImageElement) {
        this.image = img;
    }

    /**
     * Scales the image of the actor to a specified width while maintaining proportion
     */
    public scaleImageProportionateToWidth(width: number) {
        let image = this.image;
        image.onload = () => {
            let factor = width / image.width;
            image.width *= factor;
            image.height *= factor;
            this.setImage(image);
        }
    }

    /**
     * Scales the image of the actor to a specified height while maintaining proportion
     */
    public scaleImageProportionateToHeight(height: number) {
        let image = this.image;
        image.onload = () => {
            let factor = height / image.height;
            image.width *= factor;
            image.height *= factor;
            this.setImage(image);
        }
    }

    /**
     * Gets the Image Object of the actor
     */
    public getImage() {
        return this.image;
    }

    /**
     * Removes the actor itself from the world.
     */
    public destroy() {
        this.world.removeActor(this);
    }
}
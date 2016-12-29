import { World } from './world';
export interface Animate {
    /**
    * This method can be overwritten by the class inheriting from the actor class to animate, which means to change properties of the actor, before the rendering method is called internally
    */
    animate(): void;
}
export interface InteractionEvent {
    /**
     * This method can be overwritten by the class inheriting from the actor class to react to mouse events
     */
    interactionEvent(e: MouseEvent): void;
}
export interface Dragging {
    /**
    * This method can be overwritten by the class inheriting from the actor class to react to dragging on the actor
    */
    dragging(x: number, y: number): void;
}
export interface AddedToWorld {
    /**
    * This method can be overwritten by the class inheriting from the actor class to react to dragging on the actor
    */
    addedToWorld(world: World): void;
}
/**
 * The Actor class represents the objects which are contained in an instance of a subclass of the World class.
 * You can create a new Actor by creating a new subclass which inherits from the Actor class.
 */
export declare abstract class Actor {
    private ctx;
    private devicePixelRatio;
    private image;
    private opacity;
    private x;
    private y;
    private rotation;
    isBeingDragged: boolean;
    private world;
    private birthtime;
    /**
     * Create a new Actor.
     * You can optionally pass the path to an image which will be used by the Actor or you may set it later with the _setImageSrc_ method.
     */
    constructor(imageSrc?: string);
    /**
     * Get the class name of the actor
     */
    getClass(): any;
    /**
     * This method can be overwritten by the class inheriting from the actor class to have a callback once the actor has been added to the world
     */
    addedToWorld(world: World): void;
    /**
     * This method can be overwritten by the class inheriting from the actor class to animate, which means to change properties of the actor, before the rendering method is called internally
     */
    animate(): void;
    /**
     * This method can be overwritten by the class inheriting from the actor class to react to mouse events
     */
    interactionEvent(e: MouseEvent): void;
    /**
     * This method can be overwritten by the class inheriting from the actor class to react to dragging on the actor
     */
    dragging(x: number, y: number): void;
    /**
     * Get the lifetime of the actor in milliseconds
     */
    getLifetime(): number;
    /**
     * Mouse/Dragging helper function for pixel-perfect dragging
     **/
    getClickCoordinatesRelativeToActor(clickX: number, clickY: number): {
        x: number;
        y: number;
    };
    setOpacity(o: number): void;
    getOpacity(): number;
    /**
     * Get the x position of the actor relative to the world
     */
    getX(): number;
    /**
     * Set the x position of the actor relative to the world
     */
    setX(x: number, percent?: boolean, originAtCenter?: boolean): void;
    /**
     * Set the rotation of the actor in radians
     */
    setRotation(radians: number): void;
    /**
     * Get the rotation of the actor in radians
     */
    getRotation(): number;
    /**
     * Get the y position of the actor relative to the world
     */
    getY(): number;
    /**
     * Set the y position of the actor relative to the world
     */
    setY(y: number, percent?: boolean, originAtCenter?: boolean): void;
    /**
     * Get the width of the actor as longs as the image has already loaded.
     * Otherwise the return value will be 0.
     */
    getWidth(): number;
    /**
     * Get the height of the actor as longs as the image has already loaded.
     * Otherwise the return value will be 0.
     */
    getHeight(): number;
    /**
     * Check whether this actor intersects with another one.
     * Note that this a bounding box collision check.
     */
    intersects(a: Actor): boolean;
    /**
     * Check whether a give point is located on the 'surface' of the actor
     */
    pointIsOnActor(x: number, y: number): boolean;
    /**
     * Check whether the actor is at the edge of the world
     */
    isAtEdge(): boolean;
    /**
     * Set the location of the actor.
     */
    setLocation(x: number, y: number, percent?: boolean, originAtCenter?: boolean): void;
    /**
     * Internal actor method to allow it to render itself
     */
    render(): void;
    /**
     * This method is used in setup by the world class to specify the rendering context for the render method.
     */
    setCtx(ctx: CanvasRenderingContext2D): void;
    /**
     * This method is used in setup by the world class to pass a reference to itself to the actor which can later be accessed by the getWorld() method
     */
    setWorld(world: World): void;
    /**
     * Gets the world in which the actor is located in.
     */
    getWorld(): World;
    /**
     * Sets the source of the actor's image
     */
    setImageSrc(src: string): void;
    /**
     * Sets the actor's Image Object
     */
    setImage(img: HTMLImageElement): void;
    /**
     * Scales the image of the actor to a specified width while maintaining proportion
     */
    scaleImageProportionateToWidth(width: number): void;
    /**
     * Scales the image of the actor to a specified height while maintaining proportion
     */
    scaleImageProportionateToHeight(height: number): void;
    /**
     * Gets the Image Object of the actor
     */
    getImage(): HTMLImageElement;
    /**
     * Removes the actor itself from the world.
     */
    destroy(): void;
}

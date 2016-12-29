import { Actor } from './actor';
/**
 * The World class is used to create a container for all the objects (Actors) in it.
 * You can use it by creating a subclass which inherits from the World class.
 */
export declare abstract class World {
    private context;
    private width;
    private height;
    private actors;
    private renderingOrder;
    private sendMouseDownTo;
    private birthtime;
    private savedSize;
    private devicePixelRatio;
    bgColor: string;
    private useImage;
    private bgImage;
    private bgPos;
    private registeredIntervals;
    private animationShouldRun;
    /**
     * Create a new World by passing the CanvasRenderingContext2D and optionally width and height of the world.
     */
    constructor(context: CanvasRenderingContext2D, width?: number, height?: number);
    /**
    * Get the class name of the world
    */
    getClass(): any;
    /**
     * Internal method for handling mouse events
     */
    private handleMouseEvent(e);
    /**
     * Test if an object has a function
     */
    private hasFunction(obj, functionName);
    /**
     * Register interval to the world. Returns the id of the interval.
     */
    registerInterval(f: Function, i: number): number;
    /**
     * Remove interval which has been registered through registerInterval method
     */
    unregisterInterval(id: number): void;
    /**
     * Pause all active intervals which were registered through registerInterval method
     */
    pauseAllIntervals(): void;
    /**
     * Start all paused intervals which were registered through registerInterval method
     */
    startAllIntervals(): void;
    /**
    * Internal method for handling dragging in conjunction with mouse move
    */
    private handleMouseMove(e);
    /**
     * Get current lifetime of world in milliseconds
     */
    getLifetime(): number;
    /**
     * Enter fullscreen mode on canvas element
     */
    enterFullscreen(): void;
    /**
     * Exit the fullscreen mode on canvas element
     */
    exitFullscreen(): void;
    /**
     * Save the size of the canvas
     */
    saveSize(): void;
    /**
     * Restore the canvas to the saved size
     */
    restoreSize(): void;
    /**
     * Set the size of the canvas.
     * Resolution gets set automatically
     */
    setSize(width: number, height: number): void;
    /**
     * Adds the actor to the world at location x and y.
     * If percent is set to true, x and y are not treated as pixel values but as percentages of width and hight of the world.
     */
    addToWorld(actor: Actor, x?: number, y?: number, percent?: boolean): void;
    /**
     * Removes actor from the world
     */
    removeActor(a: Actor): void;
    /**
     * Get all actors in the world or just those with the class name specified
     */
    getActors(className?: string): Actor[];
    /**
     * Get the width of the world
     */
    getWidth(): number;
    /**
     * Get the height of the world
     */
    getHeight(): number;
    /**
     * Internal method to clear the canvas before each rendering method call.
     * The background is being redrawn
     */
    private clear();
    /**
     * Sets the background color of the canvas
     */
    setBackgroundColor(color: string): void;
    /**
     * Set the background image and whether it should be used and the location of the image
     */
    useBackgroundImage(image: HTMLImageElement, use?: boolean, pos?: {
        x: number;
        y: number;
    }): void;
    /**
     * Get the background color
     */
    getBackgroundColor(): string;
    /**
     * Internal method used to render the world with its background and all the actors in it.
     */
    private render();
    /**
     * Sets the order on class level in which the actor should be rendered.
     * E.g. first class specified will be rendered on top of all others.
     */
    setRenderingOrder(...order: any[]): void;
    /**
     * Starts/ Resumes the rendering of the world
     */
    start(): void;
    /**
     * Pauses the rendering of the world
     */
    pause(): void;
}

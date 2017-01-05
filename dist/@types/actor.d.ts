import { World } from './world';
import { Vector } from './math/vector';
export declare enum Edges {
    Top = 0,
    Left = 1,
    Right = 2,
    Bottom = 3,
    NoEdge = 4,
}
export interface Animate {
    animate(): void;
}
export interface InteractionEvent {
    interactionEvent(e: MouseEvent): void;
}
export interface Dragging {
    dragging(x: number, y: number): void;
}
export interface AddedToWorld {
    addedToWorld(world: World): void;
}
export declare abstract class Actor {
    private ctx;
    private devicePixelRatio;
    private image;
    private opacity;
    location: Vector;
    private origin;
    private rotation;
    isBeingDragged: boolean;
    private world;
    private birthtime;
    constructor(imageSrc?: string);
    getClass(): any;
    addedToWorld(world: World): void;
    animate(): void;
    interactionEvent(e: MouseEvent): void;
    dragging(x: number, y: number): void;
    getLifetime(): number;
    getClickCoordinatesRelativeToActor(clickX: number, clickY: number): {
        x: number;
        y: number;
    };
    setOpacity(o: number): void;
    getOpacity(): number;
    getX(): number;
    setX(x: number, percent?: boolean, originAtCenter?: boolean): void;
    setRotation(radians: number): void;
    getRotation(): number;
    getY(): number;
    setY(y: number, percent?: boolean, originAtCenter?: boolean): void;
    getWidth(): number;
    getHeight(): number;
    intersects(a: Actor): boolean;
    pointIsOnActor(x: number, y: number): boolean;
    isAtEdge(includeWidthAndHeight?: boolean): boolean;
    getEdge(includeWidthAndHeight?: boolean): Edges;
    setOrigin(x: number, y: number): void;
    setLocation(x: number, y: number, percent?: boolean, originAtCenter?: boolean): void;
    setLocationVector(v: Vector): void;
    render(): void;
    setCtx(ctx: CanvasRenderingContext2D): void;
    setWorld(world: World): void;
    getWorld(): World;
    setImageSrc(src: string): void;
    setImage(img: HTMLImageElement): void;
    scaleImageProportionateToWidth(width: number): void;
    scaleImageProportionateToHeight(height: number): void;
    getImage(): HTMLImageElement;
    destroy(): void;
}

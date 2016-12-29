/**
 * Returns a new Canvas Context to create/ draw images e.g. for actors
 */
export declare function getNewCtx(width?: number, height?: number): CanvasRenderingContext2D;
/**
 * Get a random number between max and min.
 * Min is, if not specified otherwise, equal to zero.
 * If min and max are not specified, the result is between 0 and 1.
 * If intsOnly is true, which it is by default, the generated output will only include integer values
 * If excludeZero is set to true (by default it is false) the function's return value will not be zero
 */
export declare function random(max?: number, min?: number, intsOnly?: boolean, excludeZero?: boolean): number;
/**
 * Pick a random element from array
 */
export declare function pickRandom(arr: any[]): any;
/**
 * Convert degrees to radians
 */
export declare function toRadians(degrees: number): number;
/**
 * Convert radians to degrees
 */
export declare function toDegrees(radians: number): number;
/**
 * Scales the image to a given width while maintaining the aspect ratio.
 * The callback passes back the scaled image
 */
export declare function scaleImageProportionateToWidth(image: HTMLImageElement, width: number, callback: Function): void;
/**
 * Scales the image to a given height while maintaining the aspect ratio.
 * The callback passes back the scaled image.
 */
export declare function scaleImageProportionateToHeight(image: HTMLImageElement, height: number, callback: Function): void;
/**
 * Scales the image to cover a given width and height while maintaining the aspect ratio.
 * The callback passes back the scaled image.
 * You can set the position of the image in the container by setting the optional pos parameter after the callback to start, center or end.
 */
export declare function coverWithImage(image: HTMLImageElement, tWidth: number, tHeight: number, callback: Function, pos?: string): void;
/**
 * Repeat the function i times.
 */
export declare function repeat(f: Function, i: number): void;

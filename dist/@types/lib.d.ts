export declare function getNewCtx(width?: number, height?: number): CanvasRenderingContext2D;
export declare function toRadians(degrees: number): number;
export declare function toDegrees(radians: number): number;
export declare function scaleImageProportionateToWidth(image: HTMLImageElement, width: number, callback: Function): void;
export declare function scaleImageProportionateToHeight(image: HTMLImageElement, height: number, callback: Function): void;
export declare function coverWithImage(image: HTMLImageElement, tWidth: number, tHeight: number, callback: Function, pos?: string): void;
export declare function repeat(f: Function, i: number): void;

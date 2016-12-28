export declare class CanvasImage {
    private width;
    private height;
    ctx: CanvasRenderingContext2D;
    private devicePixelRatio;
    constructor(width?: number, height?: number, backgroundColor?: any);
    getWidth(): number;
    getHeight(): number;
    private setSize(width, height);
    static fromText(text: string, fontSize?: number, font?: string, color?: string, style?: string, backgroundColor?: any, height?: number): CanvasImage;
    circle(x: number, y: number, radius: number, color?: string, outlineOnly?: boolean, outlineWidth?: number): this;
    image(img: HTMLImageElement, x: number, y: number, width?: number, height?: number): void;
    text(text: string, font: string, color?: string, x?: number, y?: number, outlineOnly?: boolean, outlineWidth?: number): this;
    getCtx(): CanvasRenderingContext2D;
    setCtx(ctx: CanvasRenderingContext2D): void;
    getImage(): HTMLImageElement;
}

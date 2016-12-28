import { getNewCtx } from './lib';

export class CanvasImage {
    ctx: CanvasRenderingContext2D;
    private devicePixelRatio = window.devicePixelRatio || 1;


    constructor(private width = 400, private height = 300, backgroundColor?) {
        this.ctx = getNewCtx(width, height);
        this.setSize(width, height);
        if (backgroundColor) {
            this.ctx.fillStyle = backgroundColor;
            this.ctx.fillRect(0, 0, width, height);
        }
    }

    public getWidth() {
        return this.width;
    }
    public getHeight() {
        return this.height;
    }

    private setSize(width: number, height: number) {
        let factor = this.devicePixelRatio;
        let canvas = this.ctx.canvas;
        this.width = width;
        this.height = height;

        canvas.width = width * factor;
        canvas.height = height * factor;

        canvas.style.height = `${height}px`;
        canvas.style.width = `${width}px`;
        this.ctx.scale(factor, factor);
    }


    static fromText(text: string, fontSize = 11, font = 'sans-serif', color = 'black', style = 'normal', backgroundColor?, height = fontSize * 1.5) {
        //height = fontSize * 1.5; → http://stackoverflow.com/a/11452091/4260143
        let ctx = getNewCtx();
        ctx.font = `${style} ${fontSize}px ${font}`
        let width = ctx.measureText(text).width;

        let obj = new this(width, height, backgroundColor);
        obj.text(text, `${style} ${fontSize}px ${font}`, color);
        return obj;
    }


    public circle(x: number, y: number, radius: number, color = 'black', outlineOnly = false, outlineWidth = 1) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = color;

        if(outlineOnly){
            this.ctx.lineWidth = outlineWidth;
            this.ctx.arc(x, y, radius, 0, 2*Math.PI);
            this.ctx.stroke();
        }else{
            this.ctx.lineWidth = 0;
            this.ctx.arc(x, y, radius, 0, 2*Math.PI);
            this.ctx.fill();
        }

        this.ctx.closePath();

        return this;
        
        
    }

    public image(img: HTMLImageElement, x: number, y: number, width: number = img.width, height: number = img.height){
        this.ctx.drawImage(img, x, y, width, height);
    }

    public text(text: string, font: string, color = 'black', x = 0, y = 0, outlineOnly = false, outlineWidth = 1) {
        this.ctx.textBaseline = 'top';
        this.ctx.font = font;
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = outlineWidth;

        if (outlineOnly) this.ctx.strokeText(text, x, y);
        else this.ctx.fillText(text, x, y);

        return this;
    }

    public getCtx(){
        return this.ctx;
    }

    public setCtx(ctx: CanvasRenderingContext2D){
        this.ctx = ctx;
    }

    public getImage() {
        let i = new Image();
        i.src = this.ctx.canvas.toDataURL();

        i.height = this.height;
        i.width = this.width;

        return i;
    }
}
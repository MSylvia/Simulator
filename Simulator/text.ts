import {Actor, CanvasImage} from '.';
export class Text extends Actor{
    constructor(text: string, fontSize = 11, font = 'sans-serif', color = 'black', style = 'normal', backgroundColor?, height = fontSize * 1.5){
        super();
        let i = CanvasImage.fromText(text, fontSize, font, color, style, backgroundColor, height).getImage();
        this.setImage(i);
    }
}
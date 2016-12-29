import {Actor, CanvasImage} from '.';

/**
 * The Text class inherits from the Actor class and is representing just text which is rendered as the image of the Actor automatically.
 * If you have problems with the height of the image (when the text seems cut off at the bottom), try to change the height parameter which defaults to 1.5 * fontSize, which works in most cases but not in all.
 */
export class Text extends Actor{

    /**
     * Create a new Text object by passing the text and optionally more options.
     */
    constructor(text: string, fontSize = 11, font = 'sans-serif', color = 'black', style = 'normal', backgroundColor?, height = fontSize * 1.5){
        super();
        let i = CanvasImage.fromText(text, fontSize, font, color, style, backgroundColor, height).getImage();
        this.setImage(i);
    }
}
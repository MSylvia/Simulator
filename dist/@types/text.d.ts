import { Actor } from '.';
/**
 * The Text class inherits from the Actor class and is representing just text which is rendered as the image of the Actor automatically.
 * If you have problems with the height of the image (when the text seems cut off at the bottom), try to change the height parameter which defaults to 1.5 * fontSize, which works in most cases but not in all.
 */
export declare class Text extends Actor {
    /**
     * Create a new Text object by passing the text and optionally more options.
     */
    constructor(text: string, fontSize?: number, font?: string, color?: string, style?: string, backgroundColor?: any, height?: number);
}

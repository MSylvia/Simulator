export const colorNames = {
    "aliceblue": "#f0f8ff",
    "antiquewhite": "#faebd7",
    "aqua": "#00ffff",
    "aquamarine": "#7fffd4",
    "azure": "#f0ffff",
    "beige": "#f5f5dc",
    "bisque": "#ffe4c4",
    "black": "#000000",
    "blanchedalmond": "#ffebcd",
    "blue": "#0000ff",
    "blueviolet": "#8a2be2",
    "brown": "#a52a2a",
    "burlywood": "#deb887",
    "cadetblue": "#5f9ea0",
    "chartreuse": "#7fff00",
    "chocolate": "#d2691e",
    "coral": "#ff7f50",
    "cornflowerblue": "#6495ed",
    "cornsilk": "#fff8dc",
    "crimson": "#dc143c",
    "cyan": "#00ffff",
    "darkblue": "#00008b",
    "darkcyan": "#008b8b",
    "darkgoldenrod": "#b8860b",
    "darkgray": "#a9a9a9",
    "darkgreen": "#006400",
    "darkgrey": "#a9a9a9",
    "darkkhaki": "#bdb76b",
    "darkmagenta": "#8b008b",
    "darkolivegreen": "#556b2f",
    "darkorange": "#ff8c00",
    "darkorchid": "#9932cc",
    "darkred": "#8b0000",
    "darksalmon": "#e9967a",
    "darkseagreen": "#8fbc8f",
    "darkslateblue": "#483d8b",
    "darkslategray": "#2f4f4f",
    "darkslategrey": "#2f4f4f",
    "darkturquoise": "#00ced1",
    "darkviolet": "#9400d3",
    "deeppink": "#ff1493",
    "deepskyblue": "#00bfff",
    "dimgray": "#696969",
    "dimgrey": "#696969",
    "dodgerblue": "#1e90ff",
    "firebrick": "#b22222",
    "floralwhite": "#fffaf0",
    "forestgreen": "#228b22",
    "fuchsia": "#ff00ff",
    "gainsboro": "#dcdcdc",
    "ghostwhite": "#f8f8ff",
    "gold": "#ffd700",
    "goldenrod": "#daa520",
    "gray": "#808080",
    "green": "#008000",
    "greenyellow": "#adff2f",
    "grey": "#808080",
    "honeydew": "#f0fff0",
    "hotpink": "#ff69b4",
    "indianred": "#cd5c5c",
    "indigo": "#4b0082",
    "ivory": "#fffff0",
    "khaki": "#f0e68c",
    "lavender": "#e6e6fa",
    "lavenderblush": "#fff0f5",
    "lawngreen": "#7cfc00",
    "lemonchiffon": "#fffacd",
    "lightblue": "#add8e6",
    "lightcoral": "#f08080",
    "lightcyan": "#e0ffff",
    "lightgoldenrodyellow": "#fafad2",
    "lightgray": "#d3d3d3",
    "lightgreen": "#90ee90",
    "lightgrey": "#d3d3d3",
    "lightpink": "#ffb6c1",
    "lightsalmon": "#ffa07a",
    "lightseagreen": "#20b2aa",
    "lightskyblue": "#87cefa",
    "lightslategray": "#778899",
    "lightslategrey": "#778899",
    "lightsteelblue": "#b0c4de",
    "lightyellow": "#ffffe0",
    "lime": "#00ff00",
    "limegreen": "#32cd32",
    "linen": "#faf0e6",
    "magenta": "#ff00ff",
    "maroon": "#800000",
    "mediumaquamarine": "#66cdaa",
    "mediumblue": "#0000cd",
    "mediumorchid": "#ba55d3",
    "mediumpurple": "#9370db",
    "mediumseagreen": "#3cb371",
    "mediumslateblue": "#7b68ee",
    "mediumspringgreen": "#00fa9a",
    "mediumturquoise": "#48d1cc",
    "mediumvioletred": "#c71585",
    "midnightblue": "#191970",
    "mintcream": "#f5fffa",
    "mistyrose": "#ffe4e1",
    "moccasin": "#ffe4b5",
    "navajowhite": "#ffdead",
    "navy": "#000080",
    "oldlace": "#fdf5e6",
    "olive": "#808000",
    "olivedrab": "#6b8e23",
    "orange": "#ffa500",
    "orangered": "#ff4500",
    "orchid": "#da70d6",
    "palegoldenrod": "#eee8aa",
    "palegreen": "#98fb98",
    "paleturquoise": "#afeeee",
    "palevioletred": "#db7093",
    "papayawhip": "#ffefd5",
    "peachpuff": "#ffdab9",
    "peru": "#cd853f",
    "pink": "#ffc0cb",
    "plum": "#dda0dd",
    "powderblue": "#b0e0e6",
    "purple": "#800080",
    "rebeccapurple": "#663399",
    "red": "#ff0000",
    "rosybrown": "#bc8f8f",
    "royalblue": "#4169e1",
    "saddlebrown": "#8b4513",
    "salmon": "#fa8072",
    "sandybrown": "#f4a460",
    "seagreen": "#2e8b57",
    "seashell": "#fff5ee",
    "sienna": "#a0522d",
    "silver": "#c0c0c0",
    "skyblue": "#87ceeb",
    "slateblue": "#6a5acd",
    "slategray": "#708090",
    "slategrey": "#708090",
    "snow": "#fffafa",
    "springgreen": "#00ff7f",
    "steelblue": "#4682b4",
    "tan": "#d2b48c",
    "teal": "#008080",
    "thistle": "#d8bfd8",
    "tomato": "#ff6347",
    "turquoise": "#40e0d0",
    "violet": "#ee82ee",
    "wheat": "#f5deb3",
    "white": "#ffffff",
    "whitesmoke": "#f5f5f5",
    "yellow": "#ffff00",
    "yellowgreen": "#9acd32"
}

import {random} from './math/math';

/**
 * Class for working with color
 */
export class Color {
    private r: number;
    private g: number;
    private b: number;
    private a: number;

    private reg = {
        rgb: /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/,
        rgba: /rgba\((\d{1,3}), (\d{1,3}), (\d{1,3}), (\d{1,3}|\d\.\d{1,})\)/,
        hex: /^#([a-zA-Z0-9]{6})/
    }

    
    constructor(color?: string) {
        if(color) this.parse(color);
    }

    private parse(color: string) {
        if (this.reg.rgb.test(color)) {
            let components = color.match(this.reg.rgb).slice(1, 4).map(c => parseFloat(c));;

            this.r = components[0];
            this.g = components[1];
            this.b = components[2];
            this.a = 1;

        } else if (this.reg.rgba.test(color)) {
            let components = color.match(this.reg.rgba).slice(1, 5).map(c => parseFloat(c));

            this.r = components[0];
            this.g = components[1];
            this.b = components[2];
            this.a = components[3];

        } else if (this.reg.hex.test(color)) {
            let hexString = color.match(this.reg.hex)[1];
            let components = this.hexColorToRGB(hexString);
            this.r = components.r;
            this.g = components.g;
            this.b = components.b;
            this.a = 1;

        } else if (colorNames[color.toLowerCase()] != undefined) {
            let hexString = colorNames[color.toLowerCase()];
            let components = this.hexColorToRGB(hexString);
            this.r = components.r;
            this.g = components.g;
            this.b = components.b;
            this.a = 1;

        } else {
            console.error(`Color "${color}" could not be parsed!`);
        }
    }

    public randomize(alpha = false){
        this.r = random(255);
        this.g = random(255);
        this.b = random(255);       

        alpha ? this.a = random(0, 1): this.a = 1;
        return this;
    }

    public setColor(color: string){
        this.parse(color);
        return this;
    }

    public setRGBA(r: number, g: number, b: number, a = 1){
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        return this;
    }

    public setR(r: number){
        this.r = r;
        return this;
    }
    public setG(g: number){
        this.g = g;
        return this;
    }
    public setB(b: number){
        this.b = b;
        return this;
    }
    public setA(a: number){
        this.a = a;
        return this;
    }

    public getR(){
        return this.r
    }
    public getG(){
        return this.g
    }
    public getB(){
        return this.b
    }
    public getA(){
        return this.a
    }
    

    private hexColorToRGB(color: string) {
        color = color.replace('#', '');
        let components: string[] = [];

        for (let p = 0; p < color.length; p += 2) {
            components.push(color.slice(p, p + 2));
        }

        let decComponents = components.map(c => this.hexToDec(c));

        return {
            r: decComponents[0],
            g: decComponents[1],
            b: decComponents[2]
        }

    }

    private hexToDec(hex: string) {
        return parseInt(hex.toUpperCase(), 16);
    }

    public toString() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
    }
}
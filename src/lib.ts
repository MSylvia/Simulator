/**
 * Returns a new Canvas Context to create/ draw images e.g. for actors 
 */
export function getNewCtx(width = 50, height = 50) {
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas.getContext('2d');
}

/**
 * Get a random number between max and min. 
 * Min is, if not specified otherwise, equal to zero.
 * If min and max are not specified, the result is between 0 and 1.
 * If intsOnly is true, which it is by default, the generated output will only include integer values
 * If excludeZero is set to true (by default it is false) the function's return value will not be zero
 */
export function random(max?: number, min = 0, intsOnly = true, excludeZero = false) {
    let value = 0;

    do {
        if (max) {
            if (intsOnly) value = Math.floor(Math.random() * (max - min + 1) + min);
            else value = Math.random() * (max - min + 1) + min;
        } else if (max && min) {
            if (intsOnly) value = Math.floor(Math.random() * (max - min + 1) + min);
            else value = Math.random() * (max - min + 1) + min;
        } else {
            value = Math.random();
        }
    } while (value == 0 && excludeZero);


    return value;

}

/**
 * Pick a random element from array
 */
export function pickRandom(arr: any[]) {
    return arr[random(arr.length - 1, 0)];
}


/**
 * Convert degrees to radians
 */
export function toRadians(degrees: number) {
    return degrees * Math.PI / 180;
}

/**
 * Convert radians to degrees
 */
export function toDegrees(radians: number) {
    return radians * Math.PI / 180;
}

/**
 * Scales the image to a given width while maintainig the aspect ratio.
 * The callback passes back the scaled image
 */
export function scaleImageProportionateToWidth(image: HTMLImageElement, width: number, callback: Function) {
    image.onload = () => {
        let factor = width / image.width;
        image.width *= factor;
        image.height *= factor;
        callback(image);
    }
}

/**
 * Scales the image to a given height while maintainig the aspect ratio.
 * The callback passes back the scaled image
 */
export function scaleImageProportionateToHeight(image: HTMLImageElement, height: number, callback: Function) {

    image.onload = () => {
        let factor = height / image.height;
        image.width *= factor;
        image.height *= factor;
        callback(image);
    }
}

import { CanvasImage } from './canvasImage';


export function coverWithImage(image: HTMLImageElement, tWidth: number, tHeight: number, callback: Function, pos = 'center') {

    image.onload = () => {

        let width = image.width,
            height = image.height;

        //Result to store the scaled Image
        let result = new Image();

        // It just works ¯\_(ツ)_/¯ 😂
        // TODO: Understand and make better
        if (tWidth < width && tHeight < height) {

            let vWidth = tWidth < width ? -1 : 1,
                vHeight = tHeight < height ? -1 : 1;

            let dWidth = vWidth * (tWidth - width),
                dHeight = vHeight * (tHeight - height);

            if (dWidth < dHeight) {
                //dWidth is min
                let f = tWidth / width;
                let pHeight = height * f;
                let y = calcPos(tHeight, pHeight, pos);

                let i = new CanvasImage(tWidth, tHeight);
                i.image(image, 0, y, tWidth, pHeight);
                result = i.getImage();

            } else {

                //dHeight is min

                let f = tHeight / height;
                let pWidth = width * f;
                let x = calcPos(tWidth, pWidth, pos);


                let i = new CanvasImage(tWidth, tHeight);
                i.image(image, x, 0, pWidth, tHeight);
                result = i.getImage();
            }
        } else {

            let vWidth = tWidth < width ? -1 : 1,
                vHeight = tHeight < height ? -1 : 1;

            let dWidth = vWidth * (tWidth - width),
                dHeight = vHeight * (tHeight - height);

            if (dWidth > dHeight) {
                //dWidth is max
                let f = tWidth / width;
                let pHeight = height * f;
                let y = calcPos(tHeight, pHeight, pos);

                let i = new CanvasImage(tWidth, tHeight);
                i.image(image, 0, y, tWidth, pHeight);
                result = i.getImage();

            } else {

                //dHeight is max

                let f = tHeight / height;
                let pWidth = width * f;
                let x = calcPos(tWidth, pWidth, pos);

                let i = new CanvasImage(tWidth, tHeight);
                i.image(image, x, 0, pWidth, tHeight);
                result = i.getImage();
            }

        }

        callback(result);

    }

    function calcPos(target: number, actual: number, pos: string) {
        if (pos == 'center') {
            return (target - actual) / 2;
        } else if (pos == 'start') {
            return 0;
        } else if (pos == 'end') {
            return target - actual;
        }
    }
}

/**
 * Repeat the function i times.
 */
export function repeat(f: Function, i: number) {
    for (let j = 0; j < i; j++) {
        f();
    }
}
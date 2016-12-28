import {NightSky} from './NightSky/nightSky';

let canvas = <HTMLCanvasElement>document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let image = new Image();

let sky = new NightSky(ctx);



window['sky'] = sky;

import {CanvasImage, coverWithImage} from './Simulator';

let i = new Image();
i.src = './src/background.png';
coverWithImage(i, 300, 300, image => {
    document.body.appendChild(image);
}, 'end')


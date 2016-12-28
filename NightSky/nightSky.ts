import { World, Color, random, repeat, scaleImageProportionateToHeight, Text } from '../Simulator';

import { Particle } from './particle';


export class NightSky extends World {



    constructor(private ctx: CanvasRenderingContext2D) {
        super(ctx);
        super.setBackgroundColor('black');
        ctx.canvas.addEventListener('click', e => this.handleMouseClick(e))
        this.animate();

        let image = new Image();
        image.src = './NightSky/sky.jpg';
        scaleImageProportionateToHeight(image, this.getHeight(), image => {
            this.useBackgroundImage(image);
        })

        this.addToWorld(new Text('Copyright © Tim Specht 2016', 12, 'Avenir Next', 'white'), 0, 0);

        let i = this.registerInterval(() => {
            this.explosion(random(this.getWidth()), random(this.getHeight()));
        }, 1000);
        this.unregisterInterval(i);


    }

    handleMouseClick(e: MouseEvent) {
        this.explosion(e.offsetX, e.offsetY);
    }

    explosion(x, y) {
        let min = 100;
        let color = new Color().setRGBA(random(255, min), random(255, min), random(255, min)).toString();
        repeat(() => {
            this.spawnParticle(x, y, color)
        }, 150);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
    }

    spawnParticle(x: number, y: number, color: string) {
        super.addToWorld(new Particle({
            color: color,
            alpha: 1,
            lifetime: 3e3,
            size: random(15, 2),
            velocity: [random(3, -3, false, true), random(3, -3, false, true)],
            acceleration: [-0.03, -0.05]
        }), x, y);
    }
}
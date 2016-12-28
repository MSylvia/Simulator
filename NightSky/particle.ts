import { Actor, World, getNewCtx, Animate, Color } from '../Simulator';

export class Particle extends Actor implements Animate {

    constructor(private props: {
        color: string,
        size: number,
        lifetime: number,
        alpha: number,
        velocity: number[]
        acceleration: number[]
    }) {
        super();

    }


    public addedToWorld(world: World) {


        this.generateImage();
    }

    public generateImage() {
        let ctx = getNewCtx(this.props.size, this.props.size);
        ctx.globalAlpha = this.props.alpha;
        ctx.fillStyle = this.props.color;


        ctx.beginPath();
        let center = this.props.size / 2;
        ctx.arc(center, center, center, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();

        //ctx.fillRect(0, 0, this.props.size, this.props.size);


        let image = new Image();
        image.src = ctx.canvas.toDataURL();
        this.setImage(image);
    }

    public animate() {
        let xDirection = this.props.velocity[0] / Math.abs(this.props.velocity[0]);
        this.props.velocity[0] -= -1 * xDirection * this.props.acceleration[0];
        this.props.velocity[1] -= this.props.acceleration[1];

        this.setOpacity(this.getOpacity() * 0.93);

        let x = this.getX() + this.props.velocity[0],
            y = this.getY() + this.props.velocity[1]
        this.setLocation(x, y);

        if (this.isAtEdge() || this.getLifetime() > this.props.lifetime) this.destroy();
    }


}
import {Actor} from './actor';
import {Vector} from './math/vector';

export class Physics extends Actor{

    private acceleration: Vector;
    private velocity: Vector;
    private location: Vector;

    constructor(private actor: Actor, private mass: number = 1){
        super();

        this.velocity = new Vector(0, 0);
        this.location = new Vector(actor.getX(), actor.getY());
    }

    public applyForce(f: Vector){
        this.acceleration.scale(0);
        this.acceleration = f.get().scale(1/this.mass);
    }

    animate(){
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
    }
}
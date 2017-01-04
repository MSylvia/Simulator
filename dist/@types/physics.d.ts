import { Actor } from './actor';
import { Vector } from './math/vector';
export declare class Physics extends Actor {
    private actor;
    private mass;
    private acceleration;
    private velocity;
    private location;
    constructor(actor: Actor, mass?: number);
    applyForce(f: Vector): void;
    animate(): void;
}

import { Actor, World, Vector } from '.';
export declare namespace BodyEnums {
    enum AtEdgeBehaviors {
        None = 0,
        Repel = 1,
        Destroy = 2,
        Reappear = 3,
    }
}
export declare abstract class Body extends Actor {
    private mass;
    private atEdgeBehavior;
    acceleration: Vector;
    velocity: Vector;
    location: Vector;
    private includeWidthAndHeightInEdgeCalc;
    private resetLocationAtEdges;
    constructor(mass?: number, atEdgeBehavior?: BodyEnums.AtEdgeBehaviors, animation?: Function);
    addedToWorld(world: World): void;
    applyForce(f: Vector | number[]): void;
    gravity(g: number): void;
    animate(): void;
    afterCalc(): void;
    beforeCalc(): void;
    getSpeed(): number;
    private repel();
    setResetLocationAtEdges(doSo: boolean): void;
    private reappear();
    limitVelocity(min: any, max: any): void;
    limitAcceleration(min: any, max: any): void;
    limitSpeed(max: any): void;
}

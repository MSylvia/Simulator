export declare class Vector {
    components: number[];
    constructor(...components: number[]);
    magnitude(): number;
    magSq(): number;
    normalize(): this;
    add(v: Vector): this;
    subtract(v: Vector): this;
    multiply(v: Vector): this;
    divide(v: Vector): this;
    scale(n: number): this;
    get(): Vector;
    readonly x: number;
    readonly y: number;
    readonly z: number;
    readonly numberOfComponents: number;
    getComponent(i: number): number;
    static add(v1: Vector, v2: Vector): Vector;
    static subtract(v1: Vector, v2: Vector): Vector;
    static multiply(v1: Vector, v2: Vector): Vector;
    static divide(v1: Vector, v2: Vector): Vector;
    static scale(v1: Vector, s: number): Vector;
}

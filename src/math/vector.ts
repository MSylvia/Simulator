export class Vector{
    public components: number[];
    constructor(...components: number[]){
        this.components = components;
    }

    public magnitude(){
        let sumSq = this.components.reduce((a, b) => {
            return a + b*b;
        }, 0);
        return Math.sqrt(sumSq);
    }

    public magSq(){
        let m = this.magnitude();
        return m*m;
    }

    public normalize(){
        let m = this.magnitude();
        // û = u / |u|
        this.scale(1/m);
        return this;
    }

    public add(v: Vector){
        this.components = this.components.map((c, i) => c + v.getComponent(i));
        return this;
    }

    public subtract(v: Vector){
        this.components = this.components.map((c, i) => c - v.getComponent(i));
        return this;
    }

    public multiply(v: Vector){
        this.components = this.components.map((c, i) => c * v.getComponent(i));
        return this;
    }

    public divide(v: Vector){
        this.components = this.components.map((c, i) => c / v.getComponent(i));
        return this;
    }

    public scale(n: number){
        this.components = this.components.map(c => c*n);
        return this;
    }

    public get(){
        return new Vector(...this.components);
    }

    public getArray(){
        return this.components;
    }

    get x(){
        return this.components[0]
    }
    get y(){
        return this.components[1]
    }
    get z(){
        return this.components[2]
    }

    set x(val: number){
        this.components[0] = val;
    }
    set y(val: number){
        this.components[1] = val;
    }
    set z(val: number){
        this.components[2] = val;
    }
    

    get numberOfComponents(){
        return this.components.length;
    }


    getComponent(i: number){
        return this.components[i]
    }
    setComponent(i: number, value: number){
        this.components[i] = value;
    }


    // Statics

    static add(v1: Vector, v2: Vector){
        let components = [];
        for(let i = 0; i < v1.components.length; i++){
            components[i] = v1.getComponent(i) + v2.getComponent(i)
        }
        return new Vector(...components);
    }

    static subtract(v1: Vector, v2: Vector){
        let components = [];
        for(let i = 0; i < v1.components.length; i++){
            components[i] = v1.getComponent(i) - v2.getComponent(i)
        }
        return new Vector(...components);
    }

    static multiply(v1: Vector, v2: Vector){
        let components = [];
        for(let i = 0; i < v1.components.length; i++){
            components[i] = v1.getComponent(i) * v2.getComponent(i)
        }
        return new Vector(...components);
    }

    static divide(v1: Vector, v2: Vector){
        let components = [];
        for(let i = 0; i < v1.components.length; i++){
            components[i] = v1.getComponent(i) / v2.getComponent(i)
        }
        return new Vector(...components);
    }

    static scale(v1: Vector, s: number){
        let r = v1.get();
        r.scale(s);
        return r;
    }
}
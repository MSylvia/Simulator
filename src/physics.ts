import { Actor, World, Vector, Edges, limit } from '.';

export namespace BodyEnums {
    export enum AtEdgeBehaviors { None, Repel, Destroy, Reappear }
}

export abstract class Body extends Actor {

    public acceleration: Vector = new Vector(0, 0);
    public velocity: Vector = new Vector(0, 0);
    

    private includeWidthAndHeightInEdgeCalc = false;
    private resetLocationAtEdges = true;

    constructor(private mass: number = 1, private atEdgeBehavior = BodyEnums.AtEdgeBehaviors.None) {
        super();
    }

    public addedToWorld(world: World) {
        this.location = new Vector(this.getX(), this.getY());
    }

    public applyForce(f: Vector | number[]) {
        f = f instanceof Vector ? f : new Vector(...f);
        this.acceleration.add(f.get().scale(1 / this.mass));
    }


    public gravity(g: number) {
        this.applyForce(new Vector(0, g).scale(this.mass));
    }

    animate() {

        this.beforeCalc();

        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.acceleration.scale(0);

        if (this.isAtEdge(this.includeWidthAndHeightInEdgeCalc)) {

            switch (this.atEdgeBehavior) {
                case BodyEnums.AtEdgeBehaviors.Destroy:
                    this.destroy();
                    break;
                case BodyEnums.AtEdgeBehaviors.None:
                    break;
                case BodyEnums.AtEdgeBehaviors.Repel:
                    //this.repel();
                    this.repelNOC();
                    break;
                case BodyEnums.AtEdgeBehaviors.Reappear:
                    this.reappear();
                    break;
                default:
                    break;
            }
        }


        this.afterCalc();

    }

    //@Overwrite
    public afterCalc() {

    }

    public beforeCalc() {

    }

    public getSpeed() {
        return this.velocity.magnitude();
    }

    private repel() {

        // Me (Strange Damping effect)

        switch (this.getEdge(this.includeWidthAndHeightInEdgeCalc)) {
            case Edges.Bottom:
                this.velocity.y *= -1;
                if (this.resetLocationAtEdges) this.location.y = this.includeWidthAndHeightInEdgeCalc ? this.getWorld().getHeight() - this.getHeight() : this.getWorld().getHeight();
                break;
            case Edges.Top:
                this.velocity.y *= -1;
                if (this.resetLocationAtEdges) this.location.y = 0;
                break;
            case Edges.Left:
                this.velocity.x *= -1;
                if (this.resetLocationAtEdges) this.location.x = 0;
                break;
            case Edges.Right:
                this.velocity.x *= -1;
                if (this.resetLocationAtEdges) this.location.x = this.includeWidthAndHeightInEdgeCalc ? this.getWorld().getWidth() - this.getWidth() : this.getWorld().getWidth();
                break;

            default:
                break;
        }

        

    }

    private repelNOC(){
        // The Nature Of Code
        /*let width = super.getWorld().getWidth();
        let height = super.getWorld().getHeight();

        if (this.location.x > width) {
            this.location.x = width;
            this.velocity.x *= -1;
        } else if (this.location.x < 0) {
            this.velocity.x *= -1;
            this.location.x = 0;
        }
        if (this.location.y > height) {
            this.location.y = height;
            this.velocity.y *= -1;
        }*/
        
        let width = super.getWorld().getWidth();
        let height = super.getWorld().getHeight();

        if (this.location.x > width) {
            this.location.x = width;
            this.velocity.x *= -1;
        } else if (this.location.x < 0) {
            
            this.velocity.x *= -1;
            this.location.x = 0;
        }
        if (this.location.y > height) {
            this.location.y = height;
            this.velocity.y *= -1;
        }else if(this.location.y < 0){
            this.location.y = 0;
            this.velocity.y *= -1;
        }
    }

    public setResetLocationAtEdges(doSo: boolean) {
        this.resetLocationAtEdges = doSo;
    }

    private reappear() {
        switch (this.getEdge(this.includeWidthAndHeightInEdgeCalc)) {
            case Edges.Top:
                this.location.y = this.getWorld().getHeight() - this.getHeight();
                break;
            case Edges.Bottom:
                this.location.y = 0;
                break;
            case Edges.Right:
                this.location.x = 0;
                break;
            case Edges.Left:
                this.location.x = this.getWorld().getWidth() - this.getWidth();
                break;

            default:
                break;
        }
    }

    public limitVelocity(min, max) {
        this.velocity.components = this.velocity.components.map(c => {
            return limit(c, min, max);
        });
    }

    public limitAcceleration(min, max) {
        this.acceleration.components = this.acceleration.components.map(c => {
            return limit(c, min, max);
        });
    }

    public limitSpeed(max) {
        if (this.velocity.magnitude() > max) {
            this.velocity.normalize().scale(max);
        }
    }

}
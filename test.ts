import {Vector} from './src/';

let v = new Vector(1, 2);
let v2 = new Vector(3, 3);
let vSum = Vector.scale(v, 2);


console.log(vSum.components);
console.log(v.components);
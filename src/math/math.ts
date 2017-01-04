// Export Vector and Matrix

export * from './vector';
export * from './matrix';

// Constants

export const e = Math.E;
export const pi = Math.PI;

// Functions

export function sum(...ns: number[]) {
    var sum: number = 0;
    for (let n of ns) {
        sum += n;
    }
    return sum;
}

export function max(...ns: number[]) {
    return Math.max(...ns);
}

export function min(...ns: number[]) {
    return Math.min(...ns);
}

export function avg(...ns: number[]) {
    var len = ns.length;
    var s = sum(...ns);
    return s / len;
}

export function med(...ns: number[]) {
    ns = sort(...ns);
    var len = ns.length;

    if (len % 2 === 0) {
        var n1 = ns[len / 2 - 1];
        var n2 = ns[len / 2];

        return avg(n1, n2);
    } else {
        var i = Math.floor(len / 2);
        return ns[i];
    }
}

export function sort(...ns: number[]) {
    return ns.sort(function (a, b) {
        return a - b;
    });
}

export function sortDesc(...ns: number[]) {
    return sort(...ns).reverse();
}

export function solve(equ: string, accuarcy: number = 3, min: number = -100, max: number = 100) {

    // accuarcy = digits after decimal point of result
    var steps = 1/Math.pow(10, accuarcy);

    var left = equ.split('=')[0].trim();
    var right = equ.split('=')[1].trim();

    var xes = range(min, max, steps);    

    interface CurrentBest {
        x: any,
        diff: number
    }

    var currentBest: CurrentBest;
    var matches = [];

    {
        var x = xes[0];
        currentBest = {
            x: x,
            diff: Math.pow(eval(left) - eval(right), 2)
        }

    }


    xes.forEach(x => {
        var diff = Math.pow(eval(left) - eval(right), 2);

        if (diff < currentBest.diff) {
            currentBest.x = x;
            currentBest.diff = diff;
        }else if(diff === currentBest.diff){
            currentBest.x = [currentBest.x, x];
            currentBest.diff = diff;
        }
        

        if (diff === 0) {
            matches.push(x);
        }

        
        
    })

    if (matches.length > 0) {
        return matches;
    }else{
        return [...currentBest.x];
    }
}

export function range(start: number, end: number, steps: number = 1) {
    var ret = [];
    for (var n = start; n <= end; n += steps) {
        ret.push(parseFloat(n.toFixed(5)))
    }
    return ret;
}

export function fibonacci(n:number, includeZero: boolean = false) {

    // after n = 1476 and includeZero = false, numbers become infinity

    if (includeZero) {
        var ret = [0, 1];
    }else{
        var ret = [1, 1];
    }

    while (ret.length < n) {
        ret.push(ret[ret.length-1] + ret[ret.length-2])
    }

    return ret;

}

export function sigmoid(x: number) {
    return 1 / (1 + Math.pow(e, -x));
}

export function isFibonacci(n: number){

    var first = 5 * Math.pow(n, 2) + 4;
    var second = 5 * Math.pow(n, 2) - 4

    first = Math.sqrt(first);
    second = Math.sqrt(second);

    if (isInt(first) || isInt(second)) return true;
    return false;
}

export function iPart(n: number) {
    return Math.floor(n);
}

export function fPart(n: number){
    return parseFloat('0.' + n.toString().split('.')[1]);
}

/*export function random(min=0, max=1) {
    return Math.random() * (max - min) + min;
}*/

export function randomInt(min=0, max=1) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper functions

function isInt(value) {
  if (isNaN(value)) {
    return false;
  }
  var x = parseFloat(value);
  return (x | 0) === x;
}

//Scales vector (array)

export function scale(scl: number, ns: number[]) {
    return ns.map(n => n * scl);
}

// Wrappers



// Classes


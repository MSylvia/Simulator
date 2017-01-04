"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./vector"));
__export(require("./matrix"));
exports.e = Math.E;
exports.pi = Math.PI;
function sum() {
    var ns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        ns[_i] = arguments[_i];
    }
    var sum = 0;
    for (var _a = 0, ns_1 = ns; _a < ns_1.length; _a++) {
        var n = ns_1[_a];
        sum += n;
    }
    return sum;
}
exports.sum = sum;
function max() {
    var ns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        ns[_i] = arguments[_i];
    }
    return Math.max.apply(Math, ns);
}
exports.max = max;
function min() {
    var ns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        ns[_i] = arguments[_i];
    }
    return Math.min.apply(Math, ns);
}
exports.min = min;
function avg() {
    var ns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        ns[_i] = arguments[_i];
    }
    var len = ns.length;
    var s = sum.apply(void 0, ns);
    return s / len;
}
exports.avg = avg;
function med() {
    var ns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        ns[_i] = arguments[_i];
    }
    ns = sort.apply(void 0, ns);
    var len = ns.length;
    if (len % 2 === 0) {
        var n1 = ns[len / 2 - 1];
        var n2 = ns[len / 2];
        return avg(n1, n2);
    }
    else {
        var i = Math.floor(len / 2);
        return ns[i];
    }
}
exports.med = med;
function sort() {
    var ns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        ns[_i] = arguments[_i];
    }
    return ns.sort(function (a, b) {
        return a - b;
    });
}
exports.sort = sort;
function sortDesc() {
    var ns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        ns[_i] = arguments[_i];
    }
    return sort.apply(void 0, ns).reverse();
}
exports.sortDesc = sortDesc;
function solve(equ, accuarcy, min, max) {
    if (accuarcy === void 0) { accuarcy = 3; }
    if (min === void 0) { min = -100; }
    if (max === void 0) { max = 100; }
    var steps = 1 / Math.pow(10, accuarcy);
    var left = equ.split('=')[0].trim();
    var right = equ.split('=')[1].trim();
    var xes = range(min, max, steps);
    var currentBest;
    var matches = [];
    {
        var x = xes[0];
        currentBest = {
            x: x,
            diff: Math.pow(eval(left) - eval(right), 2)
        };
    }
    xes.forEach(function (x) {
        var diff = Math.pow(eval(left) - eval(right), 2);
        if (diff < currentBest.diff) {
            currentBest.x = x;
            currentBest.diff = diff;
        }
        else if (diff === currentBest.diff) {
            currentBest.x = [currentBest.x, x];
            currentBest.diff = diff;
        }
        if (diff === 0) {
            matches.push(x);
        }
    });
    if (matches.length > 0) {
        return matches;
    }
    else {
        return currentBest.x.slice();
    }
}
exports.solve = solve;
function range(start, end, steps) {
    if (steps === void 0) { steps = 1; }
    var ret = [];
    for (var n = start; n <= end; n += steps) {
        ret.push(parseFloat(n.toFixed(5)));
    }
    return ret;
}
exports.range = range;
function fibonacci(n, includeZero) {
    if (includeZero === void 0) { includeZero = false; }
    if (includeZero) {
        var ret = [0, 1];
    }
    else {
        var ret = [1, 1];
    }
    while (ret.length < n) {
        ret.push(ret[ret.length - 1] + ret[ret.length - 2]);
    }
    return ret;
}
exports.fibonacci = fibonacci;
function sigmoid(x) {
    return 1 / (1 + Math.pow(exports.e, -x));
}
exports.sigmoid = sigmoid;
function isFibonacci(n) {
    var first = 5 * Math.pow(n, 2) + 4;
    var second = 5 * Math.pow(n, 2) - 4;
    first = Math.sqrt(first);
    second = Math.sqrt(second);
    if (isInt(first) || isInt(second))
        return true;
    return false;
}
exports.isFibonacci = isFibonacci;
function iPart(n) {
    return Math.floor(n);
}
exports.iPart = iPart;
function fPart(n) {
    return parseFloat('0.' + n.toString().split('.')[1]);
}
exports.fPart = fPart;
function randomInt(min, max) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 1; }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.randomInt = randomInt;
function isInt(value) {
    if (isNaN(value)) {
        return false;
    }
    var x = parseFloat(value);
    return (x | 0) === x;
}
function scale(scl, ns) {
    return ns.map(function (n) { return n * scl; });
}
exports.scale = scale;

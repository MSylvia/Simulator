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
function random(arg1, arg2) {
    if (arg1 instanceof Array) {
        return pickRandom(arg1);
    }
    else if (!arg2) {
        var max_1 = arg1;
        return randomMax(max_1);
    }
    else {
        var min_1 = arg1;
        return randomMinMax(min_1, arg2);
    }
    function randomMinMax(min, max) {
        return Math.random() * (max - min) + min;
    }
    function randomMax(max) {
        return randomMinMax(0, max);
    }
    function pickRandom(arr) {
        return arr[randomMinMax(arr.length - 1, 0)];
    }
}
exports.random = random;
function limit(n, bound1, bound2) {
    if (!bound2) {
        bound2 = 0;
        if (n > bound1) {
            return bound1;
        }
    }
    else {
        if (n < bound1)
            return bound1;
        if (n > bound2)
            return bound2;
    }
    return n;
}
exports.limit = limit;
function randomInt(min, max) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 1; }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.randomInt = randomInt;
function map(n, in_min, in_max, out_min, out_max) {
    return (n - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
exports.map = map;
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

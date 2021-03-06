export * from './vector';
export * from './matrix';
export declare const e: number;
export declare const pi: number;
export declare function sum(...ns: number[]): number;
export declare function max(...ns: number[]): number;
export declare function min(...ns: number[]): number;
export declare function avg(...ns: number[]): number;
export declare function med(...ns: number[]): number;
export declare function sort(...ns: number[]): number[];
export declare function sortDesc(...ns: number[]): number[];
export declare function range(start: number, end: number, steps?: number): any[];
export declare function fibonacci(n: number, includeZero?: boolean): number[];
export declare function sigmoid(x: number): number;
export declare function isFibonacci(n: number): boolean;
export declare function iPart(n: number): number;
export declare function fPart(n: number): number;
export declare function random<T>(arg1: T | Array<T>, arg2?: number): T;
export declare function limit(n: number, bound1: number, bound2?: number): number;
export declare function randomInt(min?: number, max?: number): number;
export declare function map(n: number, in_min: number, in_max: number, out_min: number, out_max: number): number;
export declare function scale(scl: number, ns: number[]): number[];

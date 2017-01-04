export declare class Matrix {
    private matrix;
    rows: number;
    columns: number;
    constructor(...matrix: number[][]);
    asArray(): number[][];
    private setUpBounds();
    scale(scl: number): this;
    add(matrix2: Matrix): this;
    substract(matrix2: Matrix): this;
    multiply(matrix2: Matrix): this;
    private sameSize(matrix2);
    private getColumn(i);
    private getColumnsAsArray();
    private getRow(i);
    private emptyMatrixArray(r, c);
}

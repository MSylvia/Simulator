import {scale, sum} from './math';

export class Matrix {
    private matrix: number[][];
    rows: number;
    columns: number;
    
    constructor(...matrix: number[][]) {

        // Initial check for correct matrix format (same amout of numbers in each row)
        var firstRowLen = matrix[0].length;
        for (let row of matrix) {
            if (row.length != firstRowLen) {
                throw new Error('Matrix is not a real Matrix');
            }
        }

        this.matrix = matrix;
        this.setUpBounds();
        

    }
    asArray() {
        return this.matrix;
    }

    private setUpBounds() {
        this.rows = this.matrix.length;
        this.columns = this.matrix[0].length;
    }

    scale(scl: number) {
        this.matrix = this.matrix.map(row => scale(scl, row));
        return this;
    }

    add(matrix2: Matrix) {

        if (this.sameSize(matrix2)) {

            var matrix2Arr = matrix2.asArray();
            for (var r = 0; r < this.matrix.length; r++) {
                for (var c = 0; c < this.matrix[r].length; c++) {
                    this.matrix[r][c] += matrix2Arr[r][c]
                }
            }

        } else {
            throw new Error('Matrices do not match in size. Result is mathematically not defined.');
        }

        return this;
    }
    substract(matrix2: Matrix) {

        if (this.sameSize(matrix2)) {

            var matrix2Arr = matrix2.asArray();
            for (var r = 0; r < this.matrix.length; r++) {
                for (var c = 0; c < this.matrix[r].length; c++) {
                    this.matrix[r][c] -= matrix2Arr[r][c]
                }
            }

        } else {
            throw new Error('Matrices do not match in size. Result is mathematically not defined.');
        }

        return this;
    }

    multiply(matrix2: Matrix) {
        if (this.columns == matrix2.rows) {

            var newMatrixArray = this.emptyMatrixArray(this.rows, matrix2.columns)

            var matrix2Columns = matrix2.getColumnsAsArray();

            matrix2Columns.forEach((column, c) => {
                this.matrix.forEach((row, r) => {
                    var _row = row.map((n, i) => n * column[i]);
                    newMatrixArray[r][c] = sum(..._row);
                });
            });

            this.matrix = newMatrixArray;
            this.setUpBounds();

            return this;

        } else {
            throw new Error('Matrices do not match requirements for Matrix Multiplication');
        }
    }


    private sameSize(matrix2: Matrix) {

        if (matrix2.rows != this.rows || matrix2.columns != this.columns) return false;
        return true;

    }

    private getColumn(i: number) {
        var column = [];
        for (let row of this.asArray()) {
            column.push(row[i])
        }
        return column;
    }

    private getColumnsAsArray() {
        var columns = [];
        for (var i = 0; i < this.columns; i++) {
            columns.push(this.getColumn(i))
        }
        return columns;
    }

    private getRow(i: number) {
        return this.asArray()[i];
    }

    private emptyMatrixArray(r: number, c: number) {
        var m = [];

        for (var _r = 0; _r < r; _r++) {
            var row = [];
            for (var _c = 0; _c < c; _c++) {
                row.push(0);
            }
            m.push(row)
        }

        return m;
    }

}
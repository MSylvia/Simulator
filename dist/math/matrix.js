"use strict";
var math_1 = require("./math");
var Matrix = (function () {
    function Matrix() {
        var matrix = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            matrix[_i] = arguments[_i];
        }
        var firstRowLen = matrix[0].length;
        for (var _a = 0, matrix_1 = matrix; _a < matrix_1.length; _a++) {
            var row = matrix_1[_a];
            if (row.length != firstRowLen) {
                throw new Error('Matrix is not a real Matrix');
            }
        }
        this.matrix = matrix;
        this.setUpBounds();
    }
    Matrix.prototype.asArray = function () {
        return this.matrix;
    };
    Matrix.prototype.setUpBounds = function () {
        this.rows = this.matrix.length;
        this.columns = this.matrix[0].length;
    };
    Matrix.prototype.scale = function (scl) {
        this.matrix = this.matrix.map(function (row) { return math_1.scale(scl, row); });
        return this;
    };
    Matrix.prototype.add = function (matrix2) {
        if (this.sameSize(matrix2)) {
            var matrix2Arr = matrix2.asArray();
            for (var r = 0; r < this.matrix.length; r++) {
                for (var c = 0; c < this.matrix[r].length; c++) {
                    this.matrix[r][c] += matrix2Arr[r][c];
                }
            }
        }
        else {
            throw new Error('Matrices do not match in size. Result is mathematically not defined.');
        }
        return this;
    };
    Matrix.prototype.substract = function (matrix2) {
        if (this.sameSize(matrix2)) {
            var matrix2Arr = matrix2.asArray();
            for (var r = 0; r < this.matrix.length; r++) {
                for (var c = 0; c < this.matrix[r].length; c++) {
                    this.matrix[r][c] -= matrix2Arr[r][c];
                }
            }
        }
        else {
            throw new Error('Matrices do not match in size. Result is mathematically not defined.');
        }
        return this;
    };
    Matrix.prototype.multiply = function (matrix2) {
        var _this = this;
        if (this.columns == matrix2.rows) {
            var newMatrixArray = this.emptyMatrixArray(this.rows, matrix2.columns);
            var matrix2Columns = matrix2.getColumnsAsArray();
            matrix2Columns.forEach(function (column, c) {
                _this.matrix.forEach(function (row, r) {
                    var _row = row.map(function (n, i) { return n * column[i]; });
                    newMatrixArray[r][c] = math_1.sum.apply(void 0, _row);
                });
            });
            this.matrix = newMatrixArray;
            this.setUpBounds();
            return this;
        }
        else {
            throw new Error('Matrices do not match requirements for Matrix Multiplication');
        }
    };
    Matrix.prototype.sameSize = function (matrix2) {
        if (matrix2.rows != this.rows || matrix2.columns != this.columns)
            return false;
        return true;
    };
    Matrix.prototype.getColumn = function (i) {
        var column = [];
        for (var _i = 0, _a = this.asArray(); _i < _a.length; _i++) {
            var row = _a[_i];
            column.push(row[i]);
        }
        return column;
    };
    Matrix.prototype.getColumnsAsArray = function () {
        var columns = [];
        for (var i = 0; i < this.columns; i++) {
            columns.push(this.getColumn(i));
        }
        return columns;
    };
    Matrix.prototype.getRow = function (i) {
        return this.asArray()[i];
    };
    Matrix.prototype.emptyMatrixArray = function (r, c) {
        var m = [];
        for (var _r = 0; _r < r; _r++) {
            var row = [];
            for (var _c = 0; _c < c; _c++) {
                row.push(0);
            }
            m.push(row);
        }
        return m;
    };
    return Matrix;
}());
exports.Matrix = Matrix;

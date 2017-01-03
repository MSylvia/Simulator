const path = require('path');

module.exports = {
    entry: path.resolve('src', 'index.ts'),
    output: {
        filename: 'index.js',
        path: path.resolve('dist')
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader'
        }]
    }
}
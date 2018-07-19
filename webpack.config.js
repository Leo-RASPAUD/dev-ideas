const path = require('path');

module.exports = {
    entry: ['./src/index.js'],
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js'],
        alias: {
            // utils: path.resolve(__dirname, '../public/src/main/utils'), TODO
        },
    },
    devServer: {
        contentBase: './src',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
};

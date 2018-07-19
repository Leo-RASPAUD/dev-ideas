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
            components: path.resolve(__dirname, './src/components'),
            reducers: path.resolve(__dirname, './src/reducers'),
        },
    },
    devServer: {
        contentBase: './src',
        historyApiFallback: true,
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
};

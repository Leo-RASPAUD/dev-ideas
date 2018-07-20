const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: ['./src/index.js'],
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js'],
        alias: {
            components: path.resolve(__dirname, './src/components'),
            reducers: path.resolve(__dirname, './src/reducers'),
            utils: path.resolve(__dirname, './src/utils'),
        },
    },
    devServer: {
        contentBase: './src',
        historyApiFallback: true,
        port: 9000,
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    plugins: [new webpack.EnvironmentPlugin(['COGNITO_USER_POOL_ID', 'COGNITO_CLIENT_ID'])],
};

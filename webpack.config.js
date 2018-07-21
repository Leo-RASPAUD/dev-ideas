const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

require('@babel/polyfill');

const htmlPlugin = new HtmlWebpackPlugin({
    title: 'Dev-ideas.',
    inject: false,
    template: './src/index.ejs',
    appMountId: 'root',
    mobile: true,
    meta: [],
    scripts: [],
});

module.exports = {
    entry: ['@babel/polyfill', './src/index.js'],
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js'],
        alias: {
            components: path.resolve(__dirname, './src/components'),
            reducers: path.resolve(__dirname, './src/reducers'),
            utils: path.resolve(__dirname, './src/utils'),
            constants: path.resolve(__dirname, './src/constants'),
            assets: path.resolve(__dirname, './src/assets'),
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
    plugins: [
        new webpack.EnvironmentPlugin([
            'COGNITO_USER_POOL_ID',
            'COGNITO_CLIENT_ID',
            'AWS_ACCESS_KEY',
            'AWS_SECRET_ACCESS_KEY',
            'AWS_REGION',
        ]),
        htmlPlugin,
    ],
};

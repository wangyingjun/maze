const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.conf');

module.exports = merge(webpackBaseConfig, {
    devtool: 'eval-source-map',
    entry: {
        main: './examples/main'
    },
    output: {
        path: path.join(__dirname, '../examples/dist'),
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    resolve: {
        alias: {
            Maze: '../src/maze'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            filename: path.join(__dirname, '../examples/dist/index.html'),
            template: path.join(__dirname, '../examples/index.html')
        })
    ],
    mode: 'development',
    devServer: {
        host: '127.0.0.1',
        port: 3000,
        open: true,
        contentBase: '/dist'
    }
})
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html
var path = require('path');
var WebpackChunkHash = require("webpack-chunk-hash");
const fs = require('fs');

module.exports = {
    entry: {
        index: './app/index.jsx',
        back: './app/back.jsx',
        venders: [
            'react', 'react-dom' ,'lodash'
        ],
    },
    output: {
        path: path.join(__dirname, "./build"), //编译到当前目录
        filename: '[name].[chunkHash].js', // 编译后的文件名字
        publicPath: './build/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [
                'babel-loader?presets[]=es2015,presets[]=stage-0,retainLines=true'
            ],
            exclude: /(node_modules|bower_components)/
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                publicPath: './',
                use: {
                    loader: 'css-loader',
                    options: {}
                }
            })
        }, {
            test: /\.jsx$/,
            loader: 'react-hot!babel',
            exclude: /(node_modules|bower_components)/
        }, {
            test: /\.(png|jpg)$/,
            loader: 'file-loader',
            options: {
                name: 'imgs/[name].[ext]',
            }
        }

        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'], //后缀名自动补全
        alias: {
            style: path.resolve(__dirname, 'style'),
            assets: path.resolve(__dirname, 'assets'),
            tools: path.resolve(__dirname, 'app/tools'),
            core: path.resolve(__dirname, 'app/core'),
            vendors: path.resolve(__dirname, 'vendors'),
            data: path.resolve(__dirname, 'app/data')
        }
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    plugins: [
        new WebpackChunkHash(),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'venders',
        }), new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest', //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
        }),
        new ExtractTextPlugin('[name].[chunkHash].css'),
    ]
};
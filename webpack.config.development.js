var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html
var path = require('path');
var WebpackChunkHash = require("webpack-chunk-hash");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    entry: {
        index: './app/index.jsx',
        back: './app/back.jsx',
        venders: [
            'react', 'react-dom', 'lodash'
        ],
    },
    output: {
        path: path.join(__dirname, "./development"), //编译到当前目录
        filename: '[name].js', // 编译后的文件名字
        publicPath: './development/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                },
                exclude: /(node_modules|bower_components)/
            },
            {
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
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                },
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'venders',
        }), new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest', //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
        }),
        new ExtractTextPlugin('[name].css'),
        // 分析代码
        // new BundleAnalyzerPlugin({
        //     analyzerPort: 1001
        // }),
    ],
    devtool: "source-map",
    devServer: {
        // contentBase: false,
        port: 3000,
        publicPath: "/development/",
        hot: true,
        watchContentBase: true,
        overlay: true,
    }
};
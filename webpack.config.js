/**
 * Created by anupm on 5/20/2017.
 */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    context: __dirname + '/app',
    entry:{
        amst: './app.js',
        vendor: [
            './js/global.js',
            'jquery',
            'jquery-ui',
            'bootstrap',
            'metismenu',
            'jquery-slimscroll',
            './js/plugins/pace/pace.min.js',
            './js/inspinia.js',
            'angular-sanitize',
            'oclazyload',
            '@uirouter/angularjs',
            'angular-ui-bootstrap',
            'ng-idle',
            'angular-jwt'
        ]
    },
    output:{
        path: __dirname ,
        filename:'[name].bundle.js'
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    loader:['css-loader'],
                    publicPath: __dirname
                })
            },
            {
                test:/\.(jpe?g|png|gif|svg)$/i,
                use:[
                    'file-loader?name=[name].[ext]',
                    'image-webpack-loader'
                ]
            },
            {
                test: /\.(woff2?|svg)$/,
                use: 'url-loader?limit=10000&name=fonts/[name].[ext]'
            },
            {
                test: /\.(ttf|eot)$/,
                use: 'file-loader?name=fonts/[name].[ext]'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: 'AMST',
            hash:true,
            template:'./../template.html',
            filename:'./index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeAttributeQuotes: true
            }
        }),
        new ExtractTextPlugin({
            filename: 'amst.css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js'
        })
    ]
};
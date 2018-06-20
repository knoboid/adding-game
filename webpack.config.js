const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var webpack = require('webpack');
var path = require('path');

const useHot = true;

const isProd = process.env.NODE_ENV === 'production';
const extractCss = false; // Force inclusion of css in bundle.
// extractCss cannot be true if using webpack-dev-server
const styleLoader = extractCss ? 
    MiniCssExtractPlugin.loader : 'style-loader';

module.exports = {
    entry: {
        index: './src/index.js',
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        inline: true,
        hot: !isProd && useHot,
        port: 8080,
        stats: "errors-only",
    },
    module: {
        rules: [
            {test: /\.css$/, use: [styleLoader, 'css-loader']},
            {
                test: /\.scss$/,
                use: [styleLoader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(gif|png|jpe?g|svg|ico)$/i,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 2500000,
                        },
                    },
                    
                ],
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: ['babel-loader']
            },
        ]
    }, 
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Adding Numbers',
            hash: true,
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: "style/[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ]
}
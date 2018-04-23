const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function srcPath(dir) {
    return path.join(__dirname, 'src', dir);
}

module.exports = {
    mode: 'development',
    entry: [
        'react-hot-loader/patch',
        'babel-polyfill',
        srcPath('index.jsx')
    ],
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [ 'css-loader', 'sass-loader' ]
                })
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [ 'babel-loader' ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [ 'babel-loader', 'eslint-loader' ]
            }
        ]
    },
    resolve: {
        alias: {
            Utils: srcPath('utils')
        },
        extensions: [ '*', '.js', '.jsx', '.css' ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'app.bundle.js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'app.bundle.css'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port: 8080,
        hot: true,
        historyApiFallback: true
        // open: true
    },
    stats: {
        errorDetails: true
    }
};
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const url = require("url");
const Dotenv = require("dotenv-webpack");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;
const envTarget = process.env.TARGET;

function ensureSlash(path, needsSlash) {
    const hasSlash = path.endsWith("/");
    if (hasSlash && !needsSlash) {
        return path.substr(path, path.length - 1);
    } else if (!hasSlash && needsSlash) {
        return `${path}/`;
    } else {
        return path;
    }
}

const getPublicUrl = appPackageJson =>
    envPublicUrl || require(appPackageJson).homepage;

function getServedPath(appPackageJson) {
    const publicUrl = getPublicUrl(appPackageJson);
    const servedUrl =
        envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : "/");
    return ensureSlash(servedUrl, true);
}

const publicPath = getServedPath(resolveApp("package.json"));
const entry = {
    game: "./src/index.js",
};
if (envTarget === "github") {
    entry.global = "./src/global.js";
}

module.exports = {
    entry,
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash:6].js",
        publicPath: publicPath,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "src"),
                    path.resolve(__dirname, "assets"),
                ],
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-react",
                                "@babel/preset-flow",
                            ],
                            plugins: [
                                "@babel/plugin-proposal-object-rest-spread",
                                "@babel/plugin-proposal-class-properties"
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: "[local]--[hash:base64:5]",
                        },
                    },
                ],
            },
            {
                test: /\.(mp3|ogg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name]-[hash:base64:5].[ext]",
                            outputPath: "assets/",
                        },
                    },
                ],
            },
            {
                test: /\.(ttf|eot|svg|gif|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name]-[hash:base64:5].[ext]",
                        outputPath: "assets/",
                    },
                }]
            }
        ],
    },
    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, "src"),
        ],
        extensions: [".js", ".jsx", ".css"],
    },
    plugins: [
        new Dotenv(),
        new CleanWebpackPlugin("dist"),
        new MiniCssExtractPlugin({
            filename: "[name].[hash:6].css",
        }),
        new HtmlWebpackPlugin({
            template: "src/templates/index.html",
            chunks: [
                "vendor",
                "runtime",
                ... envTarget === "github" ? ["global"] : [],
                "game",
            ],
            chunksSortMode: "manual",
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    optimization: {
        runtimeChunk: {
            name: "runtime",
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all",
                }
            }
        },
    },
    mode: "development",
    devServer: {
        contentBase: false,
        hot: true,
    },
    devtool: "hidden-source-map",
};

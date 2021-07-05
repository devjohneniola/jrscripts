const fs = require("fs");
const path = require("path");

const CompressionPlugin = require("compression-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const webpack = require("webpack");
require("dotenv/config");

const svgToMiniDataURI = require("mini-svg-data-uri");

const host = process.env.HOST;
const port = process.env.PORT;

const useHttps = !!process.env.USE_HTTPS;
const useHotReload = !!process.env.USE_HOT_RELOAD;
const useHotReloadOnly = !!process.env.USE_HOT_RELOAD_ONLY;
const noLiveReload = !!process.env.NO_LIVE_RELOAD;

const sslCertPath = process.env.SSL_CERT_PATH;
const sslKeyPath = process.env.SSL_KEY_PATH;
const sslCaPath = process.env.SSL_CA_PATH;

const devServer = {
    compress: true,
    contentBase: path.resolve(__dirname, "./public"),
    historyApiFallback: true,
    index: "index.html",
    open: true,
};

if (host) devServer.host = host;
if (port) devServer.port = port;

if (useHotReload) devServer.hot = true;
if (useHotReloadOnly) devServer.hotOnly = true;
if (noLiveReload) devServer.liveReload = false;

if (sslCertPath && sslKeyPath) {
    devServer.https = {
        cert: fs.readFileSync(sslCertPath),
        key: fs.readFileSync(sslKeyPath),
    };
    if (sslCaPath) devServer.https.ca = fs.readFileSync(sslCaPath);
} else if (useHttps) {
    devServer.https = true;
}

const config = {
    entry: path.resolve(__dirname, "./src/index.js"),
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/",
        filename: "bundle.js",
    },
    resolve: {
        modules: [path.join(__dirname, "src"), "node_modules"],
        alias: {
            react: path.join(__dirname, "node_modules", "react"),
        },
    },
    module: {
        rules: [
            {
                test: /\.m?jsx?$/i,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: ["@babel/plugin-proposal-object-rest-spread"],
                    },
                },
            },
            { test: /\.css$/i, use: ["style-loader", "css-loader"] },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: "asset/resource",
                generator: { filename: "assets/images/[hash][ext][query]" },
            },
            {
                test: /\.svg$/i,
                type: "asset/inline",
                generator: {
                    dataUrl(content) {
                        content = content.toString();
                        return svgToMiniDataURI(content);
                    },
                },
            },
            { test: /\.txt$/, type: "asset", parser: { dataUrlCondition: { maxSize: 4 * 1024 } } },
            { resourceQuery: /raw/, type: "asset/source" },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: { filename: "assets/fonts/[hash][ext][query]" },
            },
        ],
    },
    plugins: [
        new Dotenv({
            path: "./.env",
            safe: true,
            allowEmptyValues: true,
            defaults: true,
        }),
        new HtmlWebPackPlugin({
            cache: true,
            favicon: "./favicon.ico",
            hash: true,
            template: "./public/index.html",
            title: process.env.JRA_APP_NAME || "JRA",
            xhtml: true,
        }),
    ],
};

module.exports = (env, argv) => {
    config.mode = argv.mode;
    if (argv.mode === "development") {
        config.devtool = "inline-source-map";
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
        config.devServer = devServer;
    }

    if (argv.mode === "production") {
        // config.entry = ["./src"];
        config.devtool = "source-map";
        config.output.filename = "[name].[chunkhash].bundle.js";
        config.output.chunkFilename = "[name].[chunkhash].bundle.js";
        config.optimization = {
            moduleIds: "deterministic",
            runtimeChunk: {
                name: "manifest",
            },
            splitChunks: {
                cacheGroups: {},
            },
        };
        config.plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: "static",
            }),
            new CompressionPlugin({
                test: /\.js(\?.*)?$/i,
            }),
            new CopyPlugin({
                patterns: [{ from: "./_redirects" }],
            }),
        );
        config.performance = {
            hints: "warning",
            // Calculates sizes of gziped bundles.
            assetFilter(assetFilename) {
                return assetFilename.endsWith(".js.gz");
            },
        };
    }

    return config;
};

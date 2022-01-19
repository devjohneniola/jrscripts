const fs = require("fs");
const { join, resolve } = require("path");

const CompressionPlugin = require("compression-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
require("dotenv/config");
const Dotenv = require("dotenv-webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const svgToMiniDataURI = require("mini-svg-data-uri");

const host = process.env.HOST;
const port = process.env.PORT;
const devServerCompress = !!process.env.DEV_SERVER_COMPRESS;

const useHttps = !!process.env.USE_HTTPS;
const noHotReload = !!process.env.NO_HOT_RELOAD;
const hotReloadOnly = !!process.env.HOT_RELOAD_ONLY;
const useLiveReload = !!process.env.USE_LIVE_RELOAD;

const sslCertPath = process.env.SSL_CERT_PATH;
const sslKeyPath = process.env.SSL_KEY_PATH;
const sslCaPath = process.env.SSL_CA_PATH;

const devServer = {
    compress: devServerCompress,
    client: { logging: "error", overlay: true, progress: true },
    historyApiFallback: true,
    open: true,
    static: {
        directory: join(__dirname, "public"),
        publicPath: "/",
        serveIndex: true,
        watch: true,
    },
};

if (host) devServer.host = host;
if (port) devServer.port = port;

if (noHotReload) devServer.hot = false;
if (hotReloadOnly) devServer.hot = "only";
if (useLiveReload) {
    devServer.hot = false;
    devServer.liveReload = true;
    devServer.watchFiles = ["src/**/*", "public/**/*"];
}

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
    entry: ["react-hot-loader/patch", resolve(__dirname, "./src/index.js")],
    output: {
        clean: true,
        path: resolve(__dirname, "./dist"),
        publicPath: "/",
        filename: "bundle.js",
        // chunkFormat: "array-push",
    },
    resolve: {
        modules: [join(__dirname, "src"), "node_modules"],
        alias: {
            react: join(__dirname, "node_modules", "react"),
            "react-dom": "@hot-loader/react-dom",
        },
    },
    module: {
        rules: [
            {
                test: /\.m?jsx?$/i,
                exclude: /(node_modules|bower_components)/,
                resolve: { fullySpecified: false },
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
                    dataUrl: (content) => svgToMiniDataURI(content.toString()),
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
            favicon: "./public/favicon.ico",
            minify: true,
            hash: true,
            template: "./public/index.html",
            title: process.env.JRA_APP_NAME || "JRA",
            xhtml: true,
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
};

module.exports = (env, argv) => {
    config.mode = argv.mode;
    if (argv.mode === "development") {
        config.stats = { errorDetails: true };
        config.target = "web";
        config.devtool = "inline-source-map";
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
        config.devServer = devServer;
    }

    if (argv.mode === "production") {
        // config.entry = ["./src"];
        config.target = "web"; // "browserslist";
        config.devtool = "source-map";
        config.output.filename = "[name].[chunkhash].bundle.js";
        config.output.chunkFilename = "[name].[chunkhash].bundle.js";
        config.optimization = {
            moduleIds: "deterministic",
            runtimeChunk: "single",
            splitChunks: {
                chunks: "all",
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        chunks: "all",
                    },
                },
            },
        };
        config.plugins.push(
            new CompressionPlugin({
                test: /\.js(\?.*)?$/i,
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: "public",
                        to: ".",
                        filter: (resourcePath) => !/index.html$/.test(resourcePath),
                    },
                ],
            }),
        );
        config.performance = {
            hints: "warning",
            assetFilter: (assetFilename) => assetFilename.endsWith(".js.gz"),
        };
    }

    return config;
};

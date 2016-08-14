module.exports = {
    entry: "./src/game.ts",
    output: {
        filename: "bundle.js",
        library: 'bowling',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".js"]
    },
    module: {
        loaders: [
            { test: /\.ts?$/, loader: "ts-loader" }
        ]
    }
}

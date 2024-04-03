const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/server/index.ts",
    module: {
        rules: [{
                test: /\.ts$/,
                use: "ts-loader",
                exclude: "/node_modules/",
            }, {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            }
            /*  
                    {
                      test: /\.css$/i,
                      use: ["style-loader", "css-loader"],
                    }, 
                    {
                      test: /\.scss$/i,
                      use: ["sass-loader"],
                    } */
        ],
    },
    resolve: {
        extensions: [".js", ".ts", ".css", ".scss", ".sass", ".jpg"],
    },
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./index.html"
        })
    ]
};
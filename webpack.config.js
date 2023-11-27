const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: './src/client/js/main.js',
    mode: 'development',
    watch: true, // refresh -> complie 
    plugins: [new MiniCssExtractPlugin({
        filename: "css/styles.css",
    })],
	output: {
		filename: 'js/main.js',	
		path: path.resolve(__dirname, "assets"),
        clean: true,
},
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [["@babel/preset-env", {targets: "defaults"}]],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader,"css-loader","sass-loader"],
            },
        ]
    },
}
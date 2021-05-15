const CracoLessPlugin = require("craco-less");
const darkTheme = require("@ant-design/dark-theme");
const path = require("path");
const { getThemeVariables } = require("antd/dist/theme");

module.exports = {
    rules: [
        {
            test: /\.less$/,
            use: [
                {
                    loader: "style-loader",
                },
                {
                    loader: "css-loader", // translates CSS into CommonJS
                },
                {
                    loader: "less-loader", // compiles Less to CSS
                    options: {
                        lessOptions: {
                            // If you are using less-loader@5 please spread the lessOptions to options directly
                            modifyVars: getThemeVariables({
                                dark: true, // Enable dark mode
                                compact: true, // Enable compact mode
                            }),
                            javascriptEnabled: true,
                        },
                    },
                },
            ],
        },
    ],
};

const CracoLessPlugin = require("craco-less");
const darkTheme = require("@ant-design/dark-theme");
const path = require("path");

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
                            modifyVars: {
                                "primary-color": "red",
                                "link-color": "green",
                                "border-radius-base": "21px",
                                darkTheme,
                            },
                            javascriptEnabled: true,
                        },
                    },
                },
            ],
            // ...other rules
        },
    ],
};

const fs = require("fs");
const path = require("path");

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, ".prettierrc"), "utf8"));

module.exports = {
    extends: ["react-app", "prettier", "prettier/react"],
    plugins: ["prettier"],
    rules: {},
    overrides: [
        {
            files: ["**/*.ts?(x)"],
        },
    ],
};

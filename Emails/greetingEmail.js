"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function GreetingEmail({ name, email }) {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null,
            "Welcome to Code Cafe, ",
            name,
            "!"),
        react_1.default.createElement("p", null, "We're excited to have you join our community. Below are your registration details:"),
        react_1.default.createElement("ul", null,
            react_1.default.createElement("li", null,
                react_1.default.createElement("strong", null, "Name:"),
                " ",
                name),
            react_1.default.createElement("li", null,
                react_1.default.createElement("strong", null, "Email:"),
                " ",
                email)),
        react_1.default.createElement("p", null, "At Code Cafe, you can explore various IT projects, rate them, and connect with project owners for further collaboration."),
        react_1.default.createElement("p", null, "If you have any questions or need assistance, feel free to reach out to us."),
        react_1.default.createElement("p", null, "Happy Coding!"),
        react_1.default.createElement("p", null, "The Code Cafe Team")));
}
exports.default = GreetingEmail;

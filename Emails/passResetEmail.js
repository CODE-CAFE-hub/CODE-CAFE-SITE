"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function PassResetEmail({ email, token }) {
    const resetLink = `https://codecafe.com/reset-password?token=${token}&id=${email}`;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Password Reset Request"),
        react_1.default.createElement("p", null,
            "We received a request to reset the password for the account associated with this email address (",
            email,
            ")."),
        react_1.default.createElement("p", null, "If you made this request, please click the link below to reset your password:"),
        react_1.default.createElement("p", null,
            react_1.default.createElement("a", { href: resetLink, target: "_blank", rel: "noopener noreferrer" }, "Reset Password")),
        react_1.default.createElement("p", null, "If you did not request a password reset, please ignore this email. Your password will remain unchanged."),
        react_1.default.createElement("p", null, "Thank you,"),
        react_1.default.createElement("p", null, "The Code Cafe Team")));
}
exports.default = PassResetEmail;

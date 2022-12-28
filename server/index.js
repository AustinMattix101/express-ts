"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pink = exports.notice = exports.warn = exports.error = exports.success = exports.capitalize = exports.reverseString = void 0;
const cli_color_1 = __importDefault(require("cli-color"));
const reverseString = (str) => {
    return str.slice('').reverse('').join('');
};
exports.reverseString = reverseString;
const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
exports.capitalize = capitalize;
exports.success = cli_color_1.default.green;
exports.error = cli_color_1.default.red.bold;
exports.warn = cli_color_1.default.yellow;
exports.notice = cli_color_1.default.blue;
exports.pink = cli_color_1.default.magentaBright;
//# sourceMappingURL=index.js.map
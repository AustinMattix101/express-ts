"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLanguageHeader = void 0;
const custom_1 = require("../types/custom");
function handleLanguageHeader(req, _res, next) {
    const languageHeader = req.headers["content-language"];
    let language = custom_1.SUPPORTED_LANGUAGES[0];
    if (typeof languageHeader === "string" && custom_1.SUPPORTED_LANGUAGES.includes(languageHeader)) {
        language = languageHeader;
    }
    req.language = language;
    return next();
}
exports.handleLanguageHeader = handleLanguageHeader;
//# sourceMappingURL=headers.js.map
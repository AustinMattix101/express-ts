"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrivateData = void 0;
function getPrivateData(_req, res, _next) {
    res.status(200).json({
        success: true,
        status: `ACCESSED`,
        message: "You got access to the private data in this route."
    });
}
exports.getPrivateData = getPrivateData;
//# sourceMappingURL=private.js.map
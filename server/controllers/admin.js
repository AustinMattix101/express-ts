"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminData = void 0;
function getAdminData(_req, res, _next) {
    res.status(200).json({
        success: true,
        status: `ACCESSED`,
        message: "You got access to the admin data in this route."
    });
}
exports.getAdminData = getAdminData;
//# sourceMappingURL=admin.js.map
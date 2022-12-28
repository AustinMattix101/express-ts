"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const https_1 = __importDefault(require("https"));
const path_1 = require("path");
const index_1 = require("../index");
function Onhttps(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            key: fs.readFileSync((0, path_1.join)('./server/config/keys/private.pem')),
            cert: fs.readFileSync((0, path_1.join)('./server/config/keys/certificate.pem'))
        };
        const secureServer = https_1.default.createServer(options, payload);
        const PORT = process.env.SECURE_PORT;
        secureServer.listen(PORT, () => {
            console.log(index_1.warn.bgWhite(`> Secure Socket Layers [SSL] running on PORT: ${PORT} `));
        });
        process.on("unhandleRejection", (err, _promise) => {
            console.log((0, index_1.error)(`Logged Error: ${err}`));
            secureServer.close(() => process.exit(1));
        });
    });
}
exports.default = Onhttps;
//# sourceMappingURL=https.js.map
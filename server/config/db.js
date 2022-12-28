"use strict";
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
const mongoose_1 = __importDefault(require("mongoose"));
const figlet_1 = __importDefault(require("figlet"));
const index_1 = require("../index");
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const uri = (process.env.NODE_ENV === "production") ? (`${process.env.ATLAS_URI}`) : (`${process.env.MONGO_URI}`);
    try {
        const data = yield mongoose_1.default.connect(uri);
        (0, figlet_1.default)('MATTIX', (err, text) => {
            if (err) {
                console.log('> Something went wrong...');
                console.dir(err);
                return;
            }
            console.log(index_1.pink.blink(text));
        });
        console.log(index_1.pink.bgWhite.bold.italic("> Connected Successfully to The Database!"));
        console.log(index_1.notice.bgWhite.bold(`> Database Connected to ${data.connection.host}:${data.connection.port}`));
        yield mongoose_1.default.connection.on('disconnected', () => {
            console.log((0, index_1.error)(`> Database Disconnected!`));
        });
        yield mongoose_1.default.connection.on('connected', () => {
            console.log((0, index_1.notice)(`Database Reconnected!`));
        });
    }
    catch (error) {
        console.log(error(`Error: ${error}`));
    }
});
exports.default = connectDB;
//# sourceMappingURL=db.js.map
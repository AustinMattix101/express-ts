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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./.env" });
const express_1 = __importStar(require("express"));
const express_graphql_1 = require("express-graphql");
const path_1 = require("path");
const index_1 = require("./index");
const db_1 = __importDefault(require("./config/db"));
const schema_1 = __importDefault(require("./schema/schema"));
const cors_js_1 = require("./middlewares/cors.js");
const error_1 = __importDefault(require("./middlewares/error"));
const api_1 = __importDefault(require("./routes/api"));
const routes_1 = require("./routes");
const Post_1 = require("./routes/Post");
const guest_1 = __importDefault(require("./routes/guest"));
const hotel_1 = __importDefault(require("./routes/hotel"));
const room_1 = __importDefault(require("./routes/room"));
const task_1 = __importDefault(require("./routes/task"));
const auth_1 = __importDefault(require("./routes/auth"));
const TwoFA_1 = __importDefault(require("./routes/TwoFA"));
const private_1 = __importDefault(require("./routes/private"));
const admin_1 = __importDefault(require("./routes/admin"));
const profile_1 = __importDefault(require("./routes/profile"));
const uploadFile_1 = __importDefault(require("./routes/uploadFile"));
const app = (0, express_1.default)();
const apiVersion = process.env.API_VERSION;
(0, db_1.default)();
app.use((0, express_1.json)());
app.use((0, express_1.urlencoded)({ extended: true }));
app.use(`/api/${apiVersion}/graphql`, cors_js_1.cors, cors_js_1.corsWithOptions, (0, express_graphql_1.graphqlHTTP)({
    schema: schema_1.default,
    graphiql: process.env.NODE_ENV === "development",
}));
app.use(`/api/${apiVersion}`, api_1.default);
app.use(`/api/${apiVersion}`, routes_1.router);
app.use(`/api/${apiVersion}/posts`, Post_1.router);
app.use(`/api/${apiVersion}/guest`, guest_1.default);
app.use(`/api/${apiVersion}/hotels`, hotel_1.default);
app.use(`/api/${apiVersion}/rooms`, room_1.default);
app.use(`/api/${apiVersion}/tasks`, task_1.default);
app.use(`/api/${apiVersion}/auth`, auth_1.default);
app.use(`/api/${apiVersion}/twofa`, TwoFA_1.default);
app.use(`/api/${apiVersion}/private`, private_1.default);
app.use(`/api/${apiVersion}/admin`, admin_1.default);
app.use(`/api/${apiVersion}/profile`, profile_1.default);
app.use(`/api/${apiVersion}/upload`, uploadFile_1.default);
app.use(`/cdn/${apiVersion}`, cors_js_1.cors, express_1.default.static((0, path_1.join)('./server/public')));
if (process.env.NODE_ENV === 'production') {
    app.use('/', express_1.default.static((0, path_1.join)('./public_html')));
    app.get('*', (_req, res) => res.sendFile((0, path_1.resolve)('./', 'public_html', 'index.html')));
}
else {
    app.get('/', (_req, res) => res.send('Please set to production!'));
}
app.use(error_1.default);
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(index_1.notice.bgWhite.bold(`> HTTP Proxy [Unsecure] running on PORT: ${PORT}`));
});
process.on("unhandleRejection", (err, _promise) => {
    console.log((0, index_1.error)(`Logged Error: ${err}`));
    server.close(() => process.exit(1));
});
//# sourceMappingURL=server.js.map
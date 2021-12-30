"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("./routes/router"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const server_1 = __importDefault(require("./classes/server"));
const server = server_1.default.instance;
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
server.app.use((0, cors_1.default)({}));
server.app.use('/', router_1.default);
server.start(() => {
    console.log(`servidor corriiendo en el puerto ${server.port}!`);
});

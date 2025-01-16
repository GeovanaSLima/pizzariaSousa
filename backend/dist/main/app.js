"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes");
const path_1 = __importDefault(require("path"));
const fileUpload = require("express-fileupload");
dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
class App {
    app;
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.errorHandler();
        this.routes();
        this.files();
    }
    config() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)());
        this.fileUpload();
    }
    errorHandler() {
        this.app.use((err, req, res, next) => {
            if (err instanceof Error) {
                res.status(400).json({
                    error: err.message,
                });
                return;
            }
            res.status(500).json({
                status: 'error',
                message: 'Internal server error',
            });
            return;
        });
    }
    routes() {
        this.app.use(routes_1.router);
    }
    listen(port) {
        this.app.listen(Number(port), () => console.log('Server running'));
    }
    files() {
        this.app.use('/files', express_1.default.static(path_1.default.resolve(__dirname, '..', '..', 'tmp')));
    }
    fileUpload() {
        this.app.use(fileUpload({
            limits: { fileSize: 50 * 1024 * 1024 },
        }));
    }
}
exports.App = App;

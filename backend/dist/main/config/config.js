"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
exports.config = {
    env: process.env.NODE_ENV || 'development',
    dbName: process.env.DB_NAME,
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
};

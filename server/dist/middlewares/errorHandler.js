"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandler;
const logger_1 = __importDefault(require("../utils/logger"));
const response_1 = require("../utils/response");
function errorHandler(err, req, res, next) {
    logger_1.default.error("Unhandled error: %0", err);
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    const details = process.env.NODE_ENV === "production" ? undefined : err.stack;
    return (0, response_1.error)(res, message, status, details);
}

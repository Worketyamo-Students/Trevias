"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.success = void 0;
const success = (res, data = null, message = "success", status = 200) => res.status(status).json({ success: true, message, data });
exports.success = success;
const error = (res, message = "Internal server error", status = 500, details) => res.status(status).json({ success: false, message, details });
exports.error = error;

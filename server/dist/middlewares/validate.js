"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync({ body: req.body, query: req.query, params: req.params });
        return next();
    }
    catch (err) {
        return res.status(400).json({ success: false, message: "Validation error", details: err.details || err.message });
    }
};
exports.validate = validate;

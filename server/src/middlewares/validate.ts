import { Request, Response, NextFunction } from "express";

export const validate = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validateAsync({ body: req.body, query: req.query, params: req.params });
        return next();
    } catch (err: any) {
        return res.status(400).json({ success: false, message: "Validation error", details: err.details || err.message });
    }
}
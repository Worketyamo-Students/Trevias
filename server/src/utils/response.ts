import { Response } from "express";

export const success = (res: Response, data: any = null, message = "success", status = 200) =>
    res.status(status).json({ success: true, message, data});

export const error = (res: Response, message = "Internal server error", status = 500, details?: any) =>
    res.status(status).json({ success: false, message, details });
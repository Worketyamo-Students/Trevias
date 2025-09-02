import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import { error as sendError } from "../utils/response";

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    logger.error("Unhandled error: %0", err);
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    const details = process.env.NODE_ENV === "production" ? undefined : err.stack;
    return sendError(res, message, status, details);
}
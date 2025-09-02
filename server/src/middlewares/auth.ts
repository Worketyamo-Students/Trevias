import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { success } from "zod";

const JWT_SECRET = process.env.JWT_SECRET || "your_own_jwt_secret";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Authorization token missing" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, JWT_SECRET) as any;
        (req as any).user = payload; // On fera le typage apès
        return next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};
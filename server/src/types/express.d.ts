import { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id?: string;
                role?: string;
                [key: string]: any; // Pour d'autres propriétés dynamiques
            }
        }
    }
}
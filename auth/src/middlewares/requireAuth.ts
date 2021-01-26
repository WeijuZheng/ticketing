import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/notAuthorizedError';

// must run after currentUser middleware
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
        throw new NotAuthorizedError();
    }
    next();
};
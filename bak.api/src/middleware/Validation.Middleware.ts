import { NextFunction, Request, Response } from 'express';

export async function validateId() {
    return (req: Request, res: Response, next: NextFunction) => {
        return next();
    };
}

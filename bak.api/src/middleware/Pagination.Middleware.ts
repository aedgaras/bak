import { NextFunction, Request, Response } from 'express';

export function paginate(req: Request, res: Response, next: NextFunction) {
    const page = Number(req.params.page);
    const limit = Number(req.params.limit);
}

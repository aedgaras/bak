import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { parseSchema } from '../objects/Schema';

export function validateId(id: 'userId' | 'orgId') {
    return async (req: Request, res: Response, next: NextFunction) => {
        const errors = await parseSchema({
            schema: z.object({ id: z.number() }),
            objToValidate: { id: Number(req.params[id]) },
        });
        if (errors) {
            return res.status(400).json(errors);
        }

        return next();
    };
}

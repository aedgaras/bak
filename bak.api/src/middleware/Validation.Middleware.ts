import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { parseSchema } from '../objects/Schema';
import { BadRequest } from '../utils/response';

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

export function validateSchema<T extends z.AnyZodObject>(schema: T) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const errors = await parseSchema({
            schema: schema,
            objToValidate: req.body,
        });

        if (errors) {
            return BadRequest(res, errors);
        } else {
            return next();
        }
    };
}

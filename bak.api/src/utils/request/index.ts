import { Request } from 'express';

export const entityIdFromParameter = (
    req: Request,
    paramId: 'userId' | 'orgId'
) => {
    return Number(req.params[paramId]);
};

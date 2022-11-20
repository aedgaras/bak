import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { SALT_ROUNDS } from './constants';

export const entityIdFromParameter = (
    req: Request,
    paramId: 'userId' | 'orgId'
) => {
    return Number(req.params[paramId]);
};

export const hashedPassword = (password: string): string => {
    return bcrypt.hashSync(password, SALT_ROUNDS);
};

import { NextFunction, Request, Response } from 'express';
import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import { TOKEN_SECRET } from '../configuration/Configuration';
import { AppRoles, Roles } from '../models/Roles';
import { returnMessage, ReturnMessage } from '../utils/ResponseUtils';

export function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = (req.headers['authorization'])?.trim();
    const token = authHeader && authHeader.split(' ')[1];
    console.log(authHeader)

    if (authHeader== null) return res.sendStatus(401);

    verify(authHeader, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
        console.log(err);

        if (err) return res.sendStatus(403).json(returnMessage('Unauthorized'));

        req.body.user = user;

        next();
    });
}

export const authRoleMiddleware = (roles: Roles[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        roles.map((role) => {
            if (AppRoles.includes(role)) {
                return next();
            }
        });
        return res.status(403).json(returnMessage('Unauthorized'));
    };
};

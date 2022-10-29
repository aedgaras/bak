import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { Role } from '../models/Roles';
import { returnMessage } from '../utils/response/ResponseUtils';
import { tokenFromRequest } from '../utils/token/utils';

interface RequestBody {
    user: {
        username: string;
        role: Role;
        exp: number;
        iat: number;
    };
}

export function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token = tokenFromRequest(req);

    if (token == null) {
        return res.status(401);
    }

    verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) return res.status(403).json(returnMessage('Unauthorized'));

        req.body.user = user;

        return next();
    });
}

export function authenticateRole(requiredRoles: Role[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = tokenFromRequest(req);
        const reqBody: RequestBody = req.body;

        if (token == null) {
            return res.status(401).json(returnMessage('Token cannot be null'));
        }

        verify(
            token,
            process.env.TOKEN_SECRET as string,
            (err: any, user: any) => {
                if (err)
                    return res.status(403).json(returnMessage('Unauthorized'));
                if (requiredRoles.includes(reqBody.user.role)) {
                    return next();
                } else {
                    return res.status(403).json({
                        ...returnMessage('Insufficient permissions.'),
                        requiredRole: requiredRoles,
                    });
                }
            }
        );
    };
}

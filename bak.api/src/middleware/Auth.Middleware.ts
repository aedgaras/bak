import { NextFunction, Request, Response } from 'express';
import { decode, verify } from 'jsonwebtoken';
import { Role } from '../objects/Roles';
import {
    BadRequest,
    Forbiden,
    returnMessage,
    Unauthorized,
} from '../utils/response';
import { tokenFromRequest } from '../utils/token/utils';

interface RequestBody {
    user: {
        username: string;
        role: Role;
        exp: number;
        iat: number;
    };
}

export async function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token = tokenFromRequest(req);

    if (token == null) {
        return res.status(401).json(returnMessage('Token cannot be null'));
    }

    verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) {
            return res.status(403).json(returnMessage('Unauthorized'));
        }
        return next();
    });
}

export function authenticateRole(requiredRoles: Role[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = tokenFromRequest(req);

        if (token == null) {
            return BadRequest(res, returnMessage('Token cannot be null.'));
        }

        verify(
            token,
            process.env.TOKEN_SECRET as string,
            (err: any, user: any) => {
                const decodedToken = decode(token) as any;

                if (err) {
                    return Unauthorized(res, returnMessage('Unauthorized.'));
                } else if (requiredRoles.includes(decodedToken.role)) {
                    return next();
                } else {
                    return Forbiden(res, {
                        ...returnMessage('Insufficient permissions.'),
                        requiredRole: requiredRoles,
                    });
                }
            }
        );
    };
}

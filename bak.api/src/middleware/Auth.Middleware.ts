import { NextFunction, Request, Response } from 'express';
import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import { TOKEN_SECRET } from '../configuration/Configuration';
import { User } from '../models/User';
import { returnMessage, ReturnMessage } from '../utils/response/ResponseUtils';

export function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers['authorization']?.trim();
    const token = authHeader && authHeader.split(' ')[1];

    if (authHeader == null) {
        return res.sendStatus(401);
    }

    verify(
        authHeader,
        process.env.TOKEN_SECRET as string,
        (err: any, user: any) => {
            if (err)
                return res.sendStatus(403).json(returnMessage('Unauthorized'));

            req.body.user = user;

            return next();
        }
    );
}

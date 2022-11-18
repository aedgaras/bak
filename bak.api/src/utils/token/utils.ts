import { Request } from 'express';
import { sign } from 'jsonwebtoken';
import { Role } from '../../objects/Roles';
import { REFRESH_SECRET, TOKEN_SECRET } from '../constants';

/**
 * Singns incoming payload to jwt token.
 * @param payload JWT Token payload to be signed.
 * @returns Signed token payload.
 */
export function generateAccessToken(payload: { username: string; role: Role }) {
    return sign(payload, TOKEN_SECRET, { expiresIn: '1h' });
}

export function generateRefreshToken(payload: { username: string }) {
    return sign(payload, REFRESH_SECRET, { expiresIn: '1d' });
}

/**
 * Converts JWT token into bearer object.
 * @param token JWT token.
 * @returns Bearer token object.
 */
export const bearerToken = (
    token: string
): {
    token: string;
    refreshToken?: string;
} => {
    return { token: 'Bearer: ' + token };
};

export const accessRefreshTokens = (
    token: string,
    refreshToken: string
): { token: string; refreshToken?: string } => {
    return { token: 'Bearer: ' + token, refreshToken: refreshToken };
};

export const tokenFromRequest = (req: Request) => {
    const authHeader = req.headers['authorization']?.trim();
    const token = authHeader && authHeader.split(' ')[1];

    return token;
};

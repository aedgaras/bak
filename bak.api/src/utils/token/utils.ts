import { Request } from 'express';
import { sign } from 'jsonwebtoken';
import {
    REFRESH_SECRET,
    TOKEN_SECRET,
} from '../../configuration/Configuration';
import { JwtToken, JwtTokenPayload } from './Models';

/**
 * Singns incoming payload to jwt token.
 * @param payload JWT Token payload to be signed.
 * @returns Signed token payload.
 */
export function generateAccessToken(payload: JwtTokenPayload) {
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
export const bearerToken = (token: string): JwtToken => {
    return { token: 'Bearer: ' + token };
};

export const accessRefreshTokens = (
    token: string,
    refreshToken: string
): JwtToken => {
    return { token: 'Bearer: ' + token, refreshToken: refreshToken };
};

export const tokenFromRequest = (req: Request) => {
    const authHeader = req.headers['authorization']?.trim();
    const token = authHeader && authHeader.split(' ')[1];

    return token;
};

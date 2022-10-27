import { Role } from '../../models/Roles';

export interface JwtTokenPayload {
    username: string;
    role: Role;
}

interface JwtToken {
    token: string;
}

/**
 * Converts JWT token into bearer object.
 * @param token JWT token.
 * @returns Bearer token object.
 */
export const bearerToken = (token: string): JwtToken => {
    return { token: 'Bearer: ' + token };
};

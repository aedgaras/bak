import { Role } from '../../models/Roles';

export interface JwtTokenPayload {
    username: string;
    role: Role;
}

export interface JwtToken {
    token: string;
    refreshToken?: string;
}

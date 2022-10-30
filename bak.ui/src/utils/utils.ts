import jwtDecode from 'jwt-decode';
import { JWT_NAME } from '../services/Authentication';
import { Role } from './Models/Models';

export const sleep = async (milliseconds: number) => {
    await new Promise((resolve) => {
        return setTimeout(resolve, milliseconds);
    });
};

export type ToastInfo = {
    title: string;
    description: string;
};

export const getJwtFromStorage = localStorage.getItem(JWT_NAME);

export interface TokenPayload {
    token: string;
}

export interface Jwt {
    username: string;
    role: Role;
    iat: number;
    exp: number;
}

export const isJwtExpired = () => {
    const storedJwt = getJwtFromStorage;

    if (!storedJwt) {
        return undefined;
    }

    const decodedJwt: Jwt = jwtDecode(storedJwt);

    const expDate = Date.now() >= decodedJwt.exp * 1000;
    console.log(expDate);
    if (decodedJwt.exp < Date.now() / 1000) {
        return true;
    }

    return false;
};

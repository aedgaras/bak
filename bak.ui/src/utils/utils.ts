import jwtDecode from 'jwt-decode';
import ms from 'ms';
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

    const expDate = new Date(decodedJwt.exp * 1000);
    const curDate = new Date();

    if (curDate > expDate) {
        return true;
    }

    return false;
};

export const timeDifference = (expiryDate?: Date) => {
    if (expiryDate === undefined) {
        const storedJwt = getJwtFromStorage;

        if (!storedJwt) {
            return undefined;
        }

        const decodedJwt: Jwt = jwtDecode(storedJwt);

        const expDate = new Date(decodedJwt.exp * 1000);
        return Math.abs(new Date().getTime() - expDate.getTime());
    }

    return Math.abs(new Date().getTime() - expiryDate.getTime());
};

export const timeDifferenceInText = (time: number) => {
    return ms(time);
};

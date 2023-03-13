import jwtDecode from 'jwt-decode';
import {Classification, Role} from './Models';

export const sleep = async (milliseconds: number) => {
    await new Promise((resolve) => {
        return setTimeout(resolve, milliseconds);
    });
};

export const getJwtFromStorage = localStorage.getItem('token');
export const getRefreshTokenFromStorage = localStorage.getItem('refreshJWT');

export interface TokenPayload {
    accessToken: string;
    refreshToken: string;
}

interface Jwt {
    sub: string;
    role: Role;
    classification: Classification;
    exp: number;
    iss: string;
    aud: string;
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

export const isRefreshTokenExpired = () => {
    const storedJwt = getRefreshTokenFromStorage;

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

export function fileToBase64(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

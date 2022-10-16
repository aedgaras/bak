import { JWT_NAME } from '../services/Authentication';

export const sleep = async (milliseconds: number) => {
    await new Promise((resolve) => {
        return setTimeout(resolve, milliseconds);
    });
};

export type ToastInfo = {
    title: string;
    description: string;
};

export const getJwtFromStorage = () => {
    return localStorage.getItem(JWT_NAME);
};

export interface TokenPayload{
    token: string;
}
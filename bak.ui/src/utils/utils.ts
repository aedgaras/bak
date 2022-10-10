export const sleep = async (milliseconds: number) => {
    await new Promise((resolve) => {
        return setTimeout(resolve, milliseconds);
    });
};

export const API_URL = 'http://localhost:3030/api';

export type ToastInfo = {
    title: string;
    description: string;
}
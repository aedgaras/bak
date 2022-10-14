import { CreateToastFnReturn } from '@chakra-ui/react';
import axios, { AxiosError } from 'axios';
import { JWT_NAME } from '../services/Authentication';
import { API_URL, sleep, ToastInfo } from '../utils/utils';

export function validateUsername(value: string) {
    let error: string = '';

    if (!value) {
        error = 'Username is required!';
        return error;
    }
    if (value.length < 4) {
        error = 'Minimum length is 4.';
        return error;
    }
    return error;
}

export function validatePassword(value: string) {
    let error: string = '';

    if (!value) {
        error = 'Password is required!';
        return error;
    }
    if (value.length < 4) {
        error = 'Minimum length is 4.';
        return error;
    }

    return error;
}

export function validateEmail(value: string){
    let error: string = '';

    if (value.length < 4) {
        error = 'Minimum length is 4.';
        return error;
    }

    return error;
}

export const fetchThisUser = async (
    toast: CreateToastFnReturn,
    endpoint: string,
    payload: { username: string; password: string },
    sucessToast: ToastInfo
): Promise<void> => {
    await axios
        .post(API_URL + endpoint, {
            username: payload.username,
            password: payload.password,
        })
        .then((r) => {
            toast({
                title: sucessToast.title,
                description: sucessToast.description,
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            sleep(5000);
            localStorage.setItem(JWT_NAME, r.data);
            window.location.assign('/');
        })
        .catch((e: AxiosError) => {
            toast({
                title: e.code,
                description: (e.response?.data as string) ?? e.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        });
};
